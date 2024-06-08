package org.example.practice_platform_backend.controllers;


import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.entity.Kudos;
import org.example.practice_platform_backend.mapper.CommentMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.service.FruitService;
import org.example.practice_platform_backend.utils.FruitUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private CommentMapper commentMapper;

    @Autowired
    private FruitUtils  fruitUtils;

    @Autowired
    private FruitService fruitService;

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
            Comment[] comments = commentMapper.getCommentByCommentId(Integer.parseInt(fruit_id), null);
            boolean is_like = false; //未完成，等后续登录后再补充逻辑
            JSONObject result = fruitUtils.getFruitInfo(fruit, comments, fruitMedias, is_like);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询错误");
        }
    }

    @PostMapping(value = "/update_res_like")
    public ResponseEntity<?> updateResLike(@RequestBody Kudos kudos){
        System.out.println(kudos.isLike());
        System.out.println(kudos.getFruit_id());
        try {
            if(kudos.isLike()){
                    fruitService.addKudos(kudos);
            }else{
                    fruitService.deleteKudos(kudos);
            }
            return ResponseEntity.status(200).body("更新成功");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("更新失败");
        }
    }
    @PostMapping(value = "/update_comment")
    public ResponseEntity<?> updateComment(@RequestBody Comment comment){
        try {
            fruitService.addComment(comment);
            return ResponseEntity.status(200).body("更新成功");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("更新失败");
        }
    }
    @DeleteMapping(value = "/delete_comment")
    public ResponseEntity<?> deleteComment(@RequestBody Comment comment){
        try {
            fruitService.deleteComment(comment);
            return ResponseEntity.status(200).body("更新成功");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("更新失败");
        }
    }
//    public ResponseEntity<?> updateFruitLC(@RequestBody Map<String, Object> bodyMap){
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            // 获取newcom_list字段的值
//            String newcomListJson = (String) bodyMap.get("newcom_list");
//            // 将newcom_list字段的值解析为List<Map<String, Object>>结构
//            List<Map<String, Object>> newcomList = objectMapper.readValue(newcomListJson, new TypeReference<List<Map<String, Object>>>() {});
//            Comment comment = new Comment();
//            comment.setFruit_id(Integer.parseInt(bodyMap.get("result_id").toString()));
//            comment.setContent(newcomList.get(0).get("content").toString());
//            comment.setComment_time(Date.valueOf((String) newcomList.get(0).get("date")));
//            comment.setUser_id(Integer.parseInt(bodyMap.get("user_id").toString()));
//            commentMapper.insertComment(comment);
//            Kudo kudo = new Kudo();
//            kudo.setFruit_id(Integer.parseInt(bodyMap.get("result_id").toString()));
//            kudo.setUser_id(Integer.parseInt(bodyMap.get("user_id").toString()));
//            kudo.setKudos_time(Date.valueOf((String) newcomList.get(0).get("date")));
//            fruitMapper.insertKudo(kudo);
//            return ResponseEntity.status(200).body("更新成功");
//        }catch (Exception e){
//            e.printStackTrace();
//            return ResponseEntity.status(400).body("更新失败");
//        }
//    }
}
