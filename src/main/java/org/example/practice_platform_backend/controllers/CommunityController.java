package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson2.JSON;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.service.CommunityService;
import org.example.practice_platform_backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private CommunityService  communityService;
    //需求清单get
    @GetMapping("/need_list")
    public ResponseEntity<?> getNeedList(@Param("gov_id") String gov_id) throws IOException {
        try{
            JSONArray result = projectService.getNeed_list(Integer.parseInt(gov_id));
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    //结对动态（成果）
    @GetMapping("/moment")
    public ResponseEntity<?>  getMoment(@RequestParam("gov_id") String gov_id,
                                        @RequestParam(name = "res_no" ,required = false) String res_no) throws IOException {
        try{
            int offset = res_no.equals("")?0:Integer.parseInt(res_no);
            JSONArray result = communityService.getMoment(Integer.parseInt(gov_id),offset);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    @GetMapping("/project_list")
    public ResponseEntity<?> getProjectList(@RequestParam("gov_id") String gov_id) throws IOException {
        try{
            JSONObject result = projectService.getProject_list(Integer.parseInt(gov_id));
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }
}
