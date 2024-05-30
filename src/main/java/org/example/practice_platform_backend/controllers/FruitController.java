package org.example.practice_platform_backend.controllers;


import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// 成果相关
@RestController
@RequestMapping("/api")
public class FruitController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FruitMapper  fruitMapper;

    // jwt
    @Autowired
    private JwtUtils jwtUtils;
    @GetMapping(value = "/res_detail")
    public ResponseEntity<?> getResDetail(@RequestParam(value = "demand_id") String fruit_id,
                                          HttpServletRequest request){
        String token = request.getHeader("token");
        int user_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
        Fruit fruit  = fruitMapper.getFruit(Integer.parseInt(fruit_id));

        return ResponseEntity.ok().body("获取成果详细成功");
    }
}
