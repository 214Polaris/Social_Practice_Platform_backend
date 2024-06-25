package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.RandomGenerateUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.dao.*;

import java.io.File;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Objects;

@RestController
@EnableAsync
@RequestMapping("/api")
public class UserController {

    @Value("${uploadPath}")
    private String uploadPath;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ImageUtils imageUtils;

    // jwt
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CommunityLeaderService communityLeaderService;

    @Autowired
    private RandomGenerateUtils randomGenerateUtils;

    // 处理登录请求
    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestParam("user_name") String name, @RequestParam("passwd") String password,@RequestParam("user_category") String user_category) {
        User loggedInUser = userMapper.login(name, password);
        if(!Objects.equals(loggedInUser.getUser_category(), user_category)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("用户类别不正确");
        }
        // 生成 token 并返回
        HttpHeaders headers = new HttpHeaders();
        loggedInUser.setPassword(null);
        headers.add("token", jwtUtils.generateToken(loggedInUser));
        return ResponseEntity.ok().headers(headers).body("登录成功");
    }

    @PostMapping(value="/register")
    public ResponseEntity<?> registerUser(@RequestBody User user,HttpServletRequest request){
        try {
            String category = user.getUser_category();
            // 处理社区负责人的注册情况
            if(Objects.equals(category, "community")){
                if(!communityLeaderService.checkIdentity(request)){
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("该用户不是校团委");
                }
            }
            if(!Objects.equals(category, "student")&&!Objects.equals(category, "teacher")&&!Objects.equals(category,"community")){
                return ResponseEntity.status(400).body("无效的注册类别");
            }
            if(userMapper.existUsername(user.getUser_name())>0){
                return ResponseEntity.status(400).body("用户名已存在");
            }
            // 正常注册
            userMapper.register(user);
            return ResponseEntity.ok().body("注册成功");
        } catch (DataIntegrityViolationException e) {
            if (e.getRootCause() instanceof SQLIntegrityConstraintViolationException sqlEx) {
                if (sqlEx.getMessage().contains("Duplicate")) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("用户名已存在");
                }
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("注册失败");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("注册失败");
        }
    }

    // 获取个人信息
    @GetMapping(value="/info")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request){
        String token = request.getHeader("token");
        int user_id = jwtUtils.getUserInfoFromToken(token,User.class).getUser_id();
        try{
            HashMap<String,String> user = userMapper.getUserById(user_id);
            String trueName = ImageUtils.getTrueName(user.get("image"));
            String suffix = ImageUtils.getSuffix(user.get("image"));
            String path = uploadPath + "avatar" + File.separator + trueName + "_origin" + suffix;
            user.put("image",imageUtils.getFileBytes(path));
            return ResponseEntity.ok(user);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询个人信息出错");
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

    @PostMapping(value = "/get/random/name")
    public ResponseEntity<?> getRandomName(@RequestParam("name") String name) {
        try {
            String randomName = randomGenerateUtils.generateRandomUserName(name, 4);
            return ResponseEntity.ok(randomName);
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            return ResponseEntity.status(400).body("请确保传入中文名");
        }
    }

}

