package org.example.practice_platform_backend.controllers;
import com.nimbusds.oauth2.sdk.Request;
import com.nimbusds.oauth2.sdk.Response;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.practice_platform_backend.utils.JwtUtils;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserMapper userMapper;

    // jwt
    @Autowired
    private JwtUtils jwtUtils;

    // 处理登录请求
    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestParam("user_name") String name, @RequestParam("passwd") String password) {
        User loggedInUser = userMapper.login(name, password);
        if (loggedInUser != null) {
            // 生成 token 并返回
            HttpHeaders headers = new HttpHeaders();
            headers.add("token", jwtUtils.generateToken(loggedInUser));
            return ResponseEntity.ok().headers(headers).body("登录成功");
        } else {
            return ResponseEntity.status(400).body("用户名或密码错误");
        }
    }

    // 处理注册请求
    @PostMapping(value="/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try{
            userMapper.register(user);
            return ResponseEntity.ok().body("注册成功");
        } catch (Exception e){
            return ResponseEntity.status(400).body("注册失败");
        }
    }

    // 修改用户信息
    @PostMapping(value="/modify_info")
    public ResponseEntity<?> modifyUser(@RequestBody User newInfo, HttpServletRequest request){
        String token = request.getHeader("token");
        int user_id = jwtUtils.getUserInfoFromToken(token,User.class).getUser_id();
        newInfo.setUser_id(user_id);
        User user = userMapper.login(newInfo.getUser_name(),newInfo.getPassword());
        if(user != null){
            return ResponseEntity.status(400).body("账号密码不能与之前一样");
        }
        try{
            userMapper.modifyInfo(newInfo);
            return ResponseEntity.status(200).body("修改成功");
        } catch (Exception e){
            return ResponseEntity.status(400).body("修改失败");
        }
    }

}

