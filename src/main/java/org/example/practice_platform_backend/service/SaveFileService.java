package org.example.practice_platform_backend.service;

import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.mapper.VideoMapper;
import org.example.practice_platform_backend.utils.FFmpegUtils;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.util.Arrays.asList;

@Service
public class SaveFileService {

    // 上传的路径
    @Value("${uploadPath}")
    private String uploadPath;

    @Autowired
    private VideoMapper videoMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ImageUtils imageUtils;

    private final List<String> typeMap = asList("community","need","fruit");

    private final Map<String, Function<Integer, String>> existsMap;
    private final Map<String, BiFunction<String, Integer, Boolean>> addVideoMap;
    private final Map<String, BiFunction<String, Integer, Boolean>> ModifyVideoMap;


    public SaveFileService(VideoMapper videoMapper) {
        // 初始化映射，这部分依赖注入或在构造函数中设置
        existsMap = Map.of(
                "community", videoMapper::existsCommunityVideo,
                "need", videoMapper::existsNeedVideo,
                "fruit", videoMapper::existsFruitVideo
        );
        addVideoMap = Map.of(
                "community", videoMapper::addCommunityVideo,
                "need", videoMapper::addNeedVideo,
                "fruit", videoMapper::addFruitVideo
        );
        ModifyVideoMap = Map.of(
                "community", (m3u8Path, id) -> videoMapper.addCommunityVideo(m3u8Path, id) && videoMapper.deleteCommunityVideo(id),
                "need", (m3u8Path, id) -> videoMapper.addNeedVideo(m3u8Path, id) && videoMapper.deleteNeedVideo(id),
                "fruit", (m3u8Path, id) -> videoMapper.addFruitVideo(m3u8Path, id) && videoMapper.deleteFruitVideo(id)
        );
    }


    // 处理保存操作
    @Async
    public void savePhoto(MultipartFile file, int user_id) throws IOException {
        // 把传进来的 MultipartFile 文件转换成 File 并创建临时文件
        String originalFilename = file.getOriginalFilename();
        String suffix = ".jpg";
        String thumbnailFileName = "avatar/" + user_id + "_avatar" + suffix ;
        String fileName ="avatar/" + user_id + "_avatar" + "_origin" + suffix ;
        String fileDir = uploadPath;
        //保存原图
        assert originalFilename != null;
        File tempFile = File.createTempFile(fileName,suffix);
        file.transferTo(tempFile);
        saveFile(tempFile,fileDir,fileName,user_id);
        //保存缩略图
        File smallerPhoto = File.createTempFile(originalFilename,suffix);  //创建缩略图的临时文件
        imageUtils.photoSmaller(tempFile,smallerPhoto);
        saveFile(smallerPhoto,fileDir,thumbnailFileName,user_id);
        //删除临时文件
        tempFile.delete();
        smallerPhoto.delete();
        //将头像名称保存到数据库中
        userMapper.updateAvatar(user_id, thumbnailFileName);
        CompletableFuture.completedFuture(true);
    }

    // 保存头像（缩略图）
    public void saveFile(File sourceFile, String fileDir, String fileName, int user_id) {
        try {
            File saveFile = new File(fileDir + fileName);
            // 确保目录存在
            sourceFile.getParentFile().mkdirs();
            // 将文件写入目标路径，确保能够覆盖文件
            Files.copy(sourceFile.toPath(), saveFile.toPath(),StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.fillInStackTrace();
        }
    }

    /**
     * 保存临时视频
     * @param inputStream 视频的输入流
     * @param filepath 视频的路径
     * @param filename 视频的名字
     * @return 是否执行成功
     */
    public boolean saveTempVideo(InputStream inputStream, String filepath, String filename) throws IOException {
        File file = new File(filepath, filename);

        if (!file.getParentFile().exists() && !file.getParentFile().mkdirs()) {
            return false;
        }

        OutputStream outputStream = new FileOutputStream(file);
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        outputStream.close();
        inputStream.close();
        return true;
    }

    /**
     * 保存m3u8视频的完整操作
     */
    public String handleVideo(InputStream inputStream, String filename, int id, String type) throws IOException {
        // 相对路径（需要返回这个，避免暴露服务器的文件结构）
        String absolutePath = type + "_video/" + type + "_" + id + "/";
        // 视频文件保存的绝对路径
        String originPath = uploadPath + absolutePath;
        // 生成的随机名字
        String videoName = ImageUtils.getUUIDName(filename);
        //获取到原视频名字的后缀
        int index = videoName.lastIndexOf(".");
        // m3u8的文件名字，更改后缀
        String m3u8Name =  videoName.substring(0,index) + ".m3u8";
        // m3u8的完整文件路径
        String m3u8Path = originPath  + "m3u8/" + m3u8Name;
        // 如果不存在该路径就创建一个
        Path path = Paths.get(m3u8Path);
        Path directoryPath = path.getParent();
        if (Files.notExists(directoryPath)){
            try{
                // 用 createDirectories 而非是 createDirectory 创建所有目录
                Files.createDirectories(directoryPath);
            }catch (IOException e){
                e.fillInStackTrace();
            }
        }
        // 视频文件的路径
        String videoPath = originPath  + "video/";
        boolean isSave = saveTempVideo(inputStream,videoPath,videoName);
        if(!isSave){
            return null;
        }
        // 转换成m3u8
        boolean isConvert = FFmpegUtils.convert(videoPath+videoName,m3u8Path);
        if(!isConvert){
            return null;
        }
        return absolutePath + "m3u8/" + m3u8Name;
    }

    /**
     * 保存视频
     * m3u8只是一个处理格式，原视频还是要保存的，保存路径（成果为例）:fruit_video/fruit_{id}/video; fruit_video/fruit_{id}/m3u8
     * @param inputStream 视频的输入流
     * @param filename 视频的名字
     * @param id 需求/成果的 id
     * @param index 说明是社区、需求还是成果
     * @return boolean 的事务执行结果
     */
    public boolean saveVideo(InputStream inputStream, String filename, int id, Integer index) throws IOException {
        String type = typeMap.get(index);

        // Check if video exists
        if (existsMap.get(type).apply(id)!=null) {
            return false;
        }
        // Handle video processing
        String m3u8Path = handleVideo(inputStream, filename, id, type);
        if (m3u8Path == null || m3u8Path.isEmpty()) {
            return false;
        }
        // Add video
        return addVideoMap.get(type).apply(m3u8Path, id);
    }

    /**
     * 修改视频
     * @param inputStream 视频的输入流
     * @param filename 视频的名字
     * @param id 需求/成果的 id
     * @param index 说明是社区、需求还是成果
     * @return boolean 事务执行结果
     */
    @Transactional
    public boolean modifyVideo(InputStream inputStream, String filename, int id, Integer index) throws IOException {
        String type = typeMap.get(index);
        // 删掉视频的 m3u8 目录
        String origin_path = uploadPath + existsMap.get(type).apply(id);
        Path fullPath = Paths.get(origin_path);
        Path directoryPath = fullPath.getParent(); // 获取文件所在目录
        String parentDirectory = directoryPath.getParent().toString(); // 获取上级目录
        Path siblingDirectory = Paths.get(parentDirectory, "video"); // 假设另一个目录是
        cleanDirectoryContents(directoryPath);
        cleanDirectoryContents(siblingDirectory);
        // 处理视频并获取新的m3u8路径
        String m3u8Path = handleVideo(inputStream, filename, id, type);
        if (m3u8Path == null || m3u8Path.isEmpty()) {
            return false;
        }
        return ModifyVideoMap.getOrDefault(type, (p, i) -> false).apply(m3u8Path, id);
    }

    /**
     * 清空指定目录下的所有内容，但不删除该目录本身。
     * @param dirPath 需要被清空的目录路径。
     */
    private void cleanDirectoryContents(Path dirPath) throws IOException {
        try (var paths = Files.walk(dirPath)) {
            paths
                    .sorted(Comparator.reverseOrder())  // 先删除子目录和文件
                    .filter(p -> !p.equals(dirPath))    // 跳过根目录本身
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                            e.fillInStackTrace();
                            throw new RuntimeException(e);
                        }
                    });
        }
    }
}
