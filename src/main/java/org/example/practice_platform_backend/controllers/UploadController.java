package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.service.SaveFileService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// 处理上传文件的请求
@RestController
@RequestMapping("/api")
@EnableAsync
public class UploadController {
    // jwt
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private SaveFileService saveFileService;

    // 处理上传头像的请求
    @PostMapping(value = "/upload/avatar")
    public String upload(@RequestParam(value = "img") MultipartFile file, HttpServletRequest request) throws IOException {

        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }

        // 从 token 中获取 user_id
        String token = request.getHeader("token");
        int user_id = jwtUtils.getUserInfoFromToken(token,User.class).getUser_id();
        // 异步调用保存文件的方法
        saveFileService.saveAvatar(file,user_id);
        //返回到 userInfo 路由
        // return "redirect:/userInfo";
        return "ok!";
    }

    // 处理上传图片的请求
    @PostMapping(value = "/upload/image")
    public ResponseEntity<String> uploadImage(@RequestParam(value="img") MultipartFile file,
                              @RequestParam("type") Integer type,
                              @RequestParam("id") Integer id,
                              @RequestParam("isCover") boolean isCover,
                              HttpServletRequest request){
        ResponseEntity<String> res = saveFileService.privilegeCheck(type,id,false,request);
        if(res.getStatusCode()== HttpStatus.FORBIDDEN){
            return res;
        }
        return saveFileService.saveImage(file,id,type,isCover);
    }
}
