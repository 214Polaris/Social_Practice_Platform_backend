package org.example.practice_platform_backend.controllers;

import org.example.practice_platform_backend.mapper.CommentMapper;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.utils.CommentUtils;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.alibaba.fastjson2.*;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Map;

@Controller
@EnableAsync
@RequestMapping("/api")
public class CommentController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    CommentMapper commentMapper;
    @Autowired
    ImageUtils imageUtils;
    @Autowired
    CommentUtils commentUtils;

    // 获取成果的评论
    @GetMapping(value="/load_comment")
    public ResponseEntity<?> loadComment(@RequestParam("demand_id") int fruit_id, @RequestParam(value = "comment_no",required = false) Integer comment_id) {
        try{
            JSONArray results = new JSONArray();
            Comment[] comments = commentMapper.getCommentByCommentId(fruit_id,comment_id);
            //获取头像
            for(Comment comment : comments) {
                // 获取头像的路径和用户名
                Map<String, String> userInfo = commentMapper.getAvatarPathByUserId(comment.getUser_id());
                // 获取当前评论的处理结果
                JSONObject result = commentUtils.getComment(comment,userInfo);
                // 整合到数组里
                results.add(result);
            }
            return ResponseEntity.status(200).body(JSON.toJSONString(results));
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("查询错误");
        }
    }
}
