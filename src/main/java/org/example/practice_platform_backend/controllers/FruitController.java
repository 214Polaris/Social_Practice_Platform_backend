package org.example.practice_platform_backend.controllers;


import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.*;
import org.example.practice_platform_backend.mapper.CommentMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.ProjectMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.service.FruitService;
import org.example.practice_platform_backend.service.ProjectService;
import org.example.practice_platform_backend.utils.FruitUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Objects;

// 成果相关
@RestController
@RequestMapping("/api")
public class FruitController {

    private static final Logger LOGGER = LoggerFactory.getLogger(FruitController.class);

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

    @Autowired
    private ProjectMapper  projectMapper;

    @Autowired
    private ProjectService projectService;

    @GetMapping(value = "/res/detail")
    public ResponseEntity<?> getResDetail(@RequestParam(value = "demand_id") String fruit_id,
                                          HttpServletRequest request) throws IOException {
        try {
            String token = request.getHeader("token");
            int user_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
            Fruit fruit = fruitMapper.getFruit(Integer.parseInt(fruit_id));
            FruitMedia[] fruitMedias = fruitMapper.getFruitMedia(Integer.parseInt(fruit_id));
            Comment[] comments = commentMapper.getCommentByCommentId(Integer.parseInt(fruit_id), Date.from(Instant.now()));
            Kudos kudos = new Kudos();
            kudos.setFruit_id(Integer.parseInt(fruit_id));
            kudos.setUser_id(user_id);
            boolean is_like = !fruitMapper.getKudos(kudos);
            JSONObject result = fruitUtils.getFruitInfo(fruit, comments, fruitMedias, is_like);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询错误");
        }
    }

    @PostMapping(value = "/res/update_like")
    public ResponseEntity<?> updateResLike(@RequestBody Kudos kudos, HttpServletRequest request) {
        String token = request.getHeader("token");
        int user_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
        kudos.setUser_id(user_id);
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

    @GetMapping(value = "/res/interaction")
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
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    @PostMapping("/res/post")
    public ResponseEntity<?> postFruit(@RequestBody Fruit fruit, HttpServletRequest request) {
        try {
            String token = request.getHeader("token");
            User user = jwtUtils.getUserInfoFromToken(token, User.class);
            if(!Objects.equals(user.getUser_category(), "student") && !Objects.equals(user.getUser_category(), "community")){
                return ResponseEntity.status(400).body("发布成果请用学生或社区身份操作");
            }
            int user_id = user.getUser_id();
            fruit.setDate(LocalDateTime.now());
            Map<String,Integer> info = fruitService.postFruit(fruit, user_id);
            int fruit_id = info.get("fruit_id");
            int media_id = info.get("media_id");
            JSONObject result = new JSONObject();
            result.put("id", fruit_id);
            result.put("media_id", media_id);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("发布失败");
        }
    }

    @PostMapping("/res/report")
    public ResponseEntity<?> uploadReport(@RequestBody Report report){
        report.setProject_id(projectMapper.getProjectIdByNeedId(Integer.parseInt(report.getNeed_id())));
        int report_id = projectService.insertReport(report);
        JSONObject result = new JSONObject();
        result.put("report_id", report_id);
        return ResponseEntity.ok(JSON.toJSONString(result));
    }


    @GetMapping("/res/getNeed")
    public ResponseEntity<?> getNeed(@RequestParam("Fid") int fruit_id){
        try {
            JSONObject result = new JSONObject();
            Project need = fruitMapper.getNeedByFruitId(fruit_id);
            result.put("NeedID", need.getNeed_id());
            result.put("NeedName", need.getTitle());
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("获取成果对应需求失败");
        }
    }
}
