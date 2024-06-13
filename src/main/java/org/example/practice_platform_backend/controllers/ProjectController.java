package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson2.JSON;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.mapper.ProjectMapper;
import org.example.practice_platform_backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ProjectController {

    @Autowired
    ProjectMapper  projectMapper;

    @Autowired
    ProjectService  projectService;
    //结对详情信息get,只实现了传图片
    @GetMapping("/project_detail")
    public ResponseEntity<?>  getProjectDetail(@Param("proj_id") String proj_id) throws IOException {
        Project project = projectMapper.getProjectById(Integer.parseInt(proj_id));
        try{
            JSONObject result = projectService.getProject_info(project);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    //需求详情查询get,只实现了传图片
    @GetMapping("/need_detail")
    public ResponseEntity<?>  getNeedDetail(@Param("need_id") String need_id) throws IOException {
        try{
            JSONObject result = projectService.getNeed_info(Integer.parseInt(need_id));
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }


}

