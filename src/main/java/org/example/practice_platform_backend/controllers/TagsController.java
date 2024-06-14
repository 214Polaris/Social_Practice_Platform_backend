package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson.JSON;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.service.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tags")
public class TagsController {
    @Autowired
    private TagsService tagsService;
    @GetMapping("/all")
    public ResponseEntity<?> getAllTags() {
        try{
            JSONObject result = tagsService.getAllTags();
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }


}
