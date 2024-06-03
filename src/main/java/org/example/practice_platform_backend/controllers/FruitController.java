package org.example.practice_platform_backend.controllers;


import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.CommentMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.FruitUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

// 成果相关
@RestController
@RequestMapping("/api")
public class FruitController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FruitMapper  fruitMapper;

    @Autowired
    private CommentMapper CommentMapper;

    @Autowired
    private FruitUtils  fruitUtils;

    // jwt
    @Autowired
    private JwtUtils jwtUtils;
    @GetMapping(value = "/res_detail")
    public ResponseEntity<?> getResDetail(@RequestParam(value = "demand_id") String fruit_id,
                                          HttpServletRequest request) throws IOException {
        try {
//        String token = request.getHeader("token");
//        int user_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
            Fruit fruit = fruitMapper.getFruit(Integer.parseInt(fruit_id));
            FruitMedia[] fruitMedias = fruitMapper.getFruitMedia(Integer.parseInt(fruit_id));
            Comment[] comments = CommentMapper.getCommentByCommentId(Integer.parseInt(fruit_id), null);
            boolean is_like = false; //未完成，等后续登录后再补充逻辑
            JSONObject result = fruitUtils.getFruitInfo(fruit, comments, fruitMedias, is_like);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询错误");
        }
    }
}
