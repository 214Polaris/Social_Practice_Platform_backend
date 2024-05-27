package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.UserMapper;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// 处理上传文件的请求
@RestController
@RequestMapping("/api")
public class UploadController {
    @Autowired
    private UserMapper userMapper;
    // jwt
    @Autowired
    private JwtUtils jwtUtils;

    // 处理上传头像的请求
    @PostMapping(value = "/upload/avatar")
    public String upload(@RequestParam(value = "img") MultipartFile file, HttpServletRequest request) throws IOException {

        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }

        // 从 token 中获取 user_id
        String token = request.getHeader("token");
        int user_id = jwtUtils.getUserInfoFromToken(token,User.class).getUser_id();

        //获取文件的内容
        InputStream is = file.getInputStream();

        //获取原始文件名
        String originalFilename = file.getOriginalFilename();

        //获取后缀
        String suffix = ImageUtils.getSuffix(originalFilename);

        //头像图片名称
        String fileName = user_id + "_avatar" + suffix ;

        //图片路径(本地运行请改为自己的)
        //File fileDir = new File("/www/wwwroot/user/uploadfiles/avatar/");
        File fileDir = new File("/Users/a214/Documents/IntelliJ/practice_platform_backend/uploadfiles/avatar/");

        if(!fileDir.exists()){
            boolean success = fileDir.mkdirs();
            if(!success){
                return "没能成功创建文件夹";
            }
        }

        //保存文件
        File uploadFile = new File(fileDir, fileName);
        file.transferTo(uploadFile);

        //将头像路径保存到数据库中
        String filePath = fileDir + fileName;
        userMapper.updateAvatar(user_id,filePath);

        //返回到 userInfo 路由
        // return "redirect:/userInfo";
        return "ok!";
    }
}
