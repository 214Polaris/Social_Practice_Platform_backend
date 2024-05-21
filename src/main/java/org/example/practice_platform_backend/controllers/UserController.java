package org.example.practice_platform_backend.controllers;
import org.springframework.http.ResponseEntity;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserMapper userMapper;

    @PostMapping(value = "/login", consumes = "multipart/form-data")
    public ResponseEntity<?> loginUser(@RequestParam("user_name") String name, @RequestParam("passwd") String password) {
        User loggedInUser = userMapper.login(name, password);
        if (loggedInUser != null) {
            return ResponseEntity.ok().body("操作成功");
        } else {
            return ResponseEntity.status(401).body("用户名或密码错误");
        }
    }
}

