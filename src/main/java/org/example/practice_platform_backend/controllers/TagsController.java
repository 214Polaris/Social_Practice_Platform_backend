package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson.JSON;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.service.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<?> addTags(@RequestParam(value = "name")String tag) {
        try{
            tagsService.addTags(tag);
            return ResponseEntity.status(200).body("添加成功");
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("添加失败");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTags(@RequestParam(value = "id")int id) {
        try{
            tagsService.deleteTags(id);
            return ResponseEntity.status(200).body("删除成功");
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("删除失败");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateTags(@RequestParam(value = "id")int id
                                        ,@RequestParam(value = "newName")String name) {
        try{
            tagsService.updateTags(id, name);
            return ResponseEntity.status(200).body("修改成功");
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("修改失败");
        }
    }


}
