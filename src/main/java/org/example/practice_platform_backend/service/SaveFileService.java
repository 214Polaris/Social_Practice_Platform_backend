package org.example.practice_platform_backend.service;

import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.StandardCopyOption;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.concurrent.CompletableFuture;

@Service
public class SaveFileService {
    // 上传的路径
    @Value("${uploadPath}")
    private String uploadPath;
    @Autowired
    private UserMapper userMapper;
    // jwt
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private ImageUtils imageUtils;

    private int user_id;

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
            e.printStackTrace();
        }
    }

    // 低损保存图片 /www/wwwroot/user/uploadfiles/need_images/need_1/1919114514.jpeg
}
