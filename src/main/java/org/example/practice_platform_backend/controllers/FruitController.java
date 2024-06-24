package org.example.practice_platform_backend.controllers;


import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.*;
import org.example.practice_platform_backend.mapper.CommentMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.service.FruitService;
import org.example.practice_platform_backend.utils.FruitUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// 成果相关
@RestController
@RequestMapping("/api")
public class FruitController {

    private static final Logger LOGGER = LoggerFactory.getLogger(FruitController.class);
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FruitMapper fruitMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private FruitUtils fruitUtils;

    @Autowired
    private FruitService fruitService;

    // jwt
    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping(value = "/res/detail")
    public ResponseEntity<?> getResDetail(@RequestParam(value = "demand_id") String fruit_id,
                                          HttpServletRequest request) throws IOException {
        try {
            String token = request.getHeader("token");
            int user_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
            Fruit fruit = fruitMapper.getFruit(Integer.parseInt(fruit_id));
            FruitMedia[] fruitMedias = fruitMapper.getFruitMedia(Integer.parseInt(fruit_id));
            Comment[] comments = commentMapper.getCommentByCommentId(Integer.parseInt(fruit_id), null);
            Kudos kudos = new Kudos();
            kudos.setFruit_id(Integer.parseInt(fruit_id));
            kudos.setUser_id(user_id);
            boolean is_like = fruitMapper.getKudos(kudos);
            JSONObject result = fruitUtils.getFruitInfo(fruit, comments, fruitMedias, is_like);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询错误");
        }
    }

    @PostMapping(value = "/res/update_like")
    public ResponseEntity<?> updateResLike(@RequestBody Kudos kudos) {
        try {
            if (kudos.isLike()) {
                fruitService.addKudos(kudos);
            } else {
                fruitService.deleteKudos(kudos);
            }
            return ResponseEntity.status(200).body("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("更新失败");
        }
    }

    @PostMapping(value = "/res/update_comment")
    public ResponseEntity<?> updateComment(@RequestBody Comment comment) {
        try {
            fruitService.addComment(comment);
            return ResponseEntity.status(200).body("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("更新失败");
        }
    }

    @DeleteMapping(value = "/res/delete_comment")
    public ResponseEntity<?> deleteComment(@RequestBody Comment comment) {
        try {
            fruitService.deleteComment(comment);
            return ResponseEntity.status(200).body("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("更新失败");
        }
    }

    @GetMapping(value = "res/interaction")
    public ResponseEntity<?> getInteraction(HttpServletRequest request,@RequestParam(value = "time") String time,
                                            @RequestParam(value = "offset_cm", required = false) String offset_cm,
                                            @RequestParam(value = "offset_kudos", required = false) String offset_kudos) {
        try{
            String token = request.getHeader("token");
            int user_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime localDateTime = LocalDateTime.parse(time, formatter);
            Timestamp timestamp = Timestamp.valueOf(localDateTime);
            String user_category = jwtUtils.getUserInfoFromToken(token, User.class).getUser_category();
            int offset_cm_int = offset_cm == null ? 0 : Integer.parseInt(offset_cm);
            int offset_kudos_int = offset_kudos == null ? 0 : Integer.parseInt(offset_kudos);
            JSONObject result = fruitService.getInteraction(user_id, user_category, timestamp, offset_cm_int, offset_kudos_int);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("查询失败");
        }
    }
}
