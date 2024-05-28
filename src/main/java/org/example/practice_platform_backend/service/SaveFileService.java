package org.example.practice_platform_backend.service;

import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.concurrent.CompletableFuture;

@Service
public class SaveFileService {
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
    public void savePhoto(String originalFilename, File file, int user_id) throws IOException {
        //获取图片名称
        String suffix = ImageUtils.getSuffix(originalFilename);
        //头像图片名称
        String fileName = "/" + user_id + "_avatar" + suffix ;
        //创建缩略图的临时文件
        File smallerPhoto = File.createTempFile(originalFilename,suffix);
        imageUtils.photoSmaller(file, smallerPhoto);
        Boolean result = upLoadPhoto(fileName,smallerPhoto,user_id);
        //删除临时文件
        file.delete();
        smallerPhoto.delete();
        CompletableFuture.completedFuture(result);
    }

    // 保存到本地
    public Boolean upLoadPhoto(String fileName, File photo, int user_id) {
        //图片路径(本地运行请改为自己的)
        String fileDir = "/www/wwwroot/user/uploadfiles/avatar";
        //String fileDir = "/Users/a214/Documents/IntelliJ/practice_platform_backend/uploadfiles/avatar";
        File saveFile = new File(fileDir + fileName);
        try {
            // 确保目录存在
            saveFile.getParentFile().mkdirs();
            // 将文件写入目标路径
            Files.copy(photo.toPath(), saveFile.toPath());
            //将头像路径保存到数据库中
            String filePath = fileDir + fileName;
            userMapper.updateAvatar(user_id, filePath);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
