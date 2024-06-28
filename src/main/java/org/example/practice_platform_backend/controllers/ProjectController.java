package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.AuditMapper;
import org.example.practice_platform_backend.mapper.ProjectMapper;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.service.ProjectService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class ProjectController {

    @Autowired
    private ProjectMapper  projectMapper;

    @Autowired
    private ProjectService  projectService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private TeamMapper teamMapper;

    @Autowired
    private AuditMapper auditMapper;
    //结对详情信息get,只实现了传图片
    @GetMapping("/project/detail")
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

    //需求详情查询get
    @GetMapping("/need/detail")
    public ResponseEntity<?>  getNeedDetail(@Param("need_id") String need_id) throws IOException {
        try{
            JSONObject result = projectService.getNeed_info(Integer.parseInt(need_id));
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    /**
     * 获取未配对的需求
     */
    @GetMapping("/need/unpaired")
    public ResponseEntity<?>  getUnpairedNeed(@RequestParam(value = "need_no",required = false) String need_no) throws IOException {
        int  offset = (Objects.equals(need_no, ""))?0:Integer.parseInt(need_no);
        try{
            JSONObject result = projectService.getUnpairedNeed(offset);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    /**
     * 配对申请
     */
    @PostMapping("/need/pair")
    public ResponseEntity<?>  pairNeed(@RequestParam(value = "demand_id") String need_id,
                                       HttpServletRequest request) throws IOException {

        try{
            String token = request.getHeader("token");
            int manager_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
            int team_id = teamMapper.getTeamIdByUser(manager_id);
            if(auditMapper.getIsAudit_team(Integer.parseInt(need_id), team_id)){
                return ResponseEntity.status(400).body("你已经申请过这个结对了");
            }
            projectService.pairNeed(Integer.parseInt(need_id), manager_id);
            return ResponseEntity.status(200).body("配对成功,待审核");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("配对失败");
        }
    }

    //获取当前队伍所有已结队的需求
    @GetMapping("/get/team/needs")
    public ResponseEntity<?> getTeamNeeds(@RequestParam("team_id") int team_id) {
        List<Integer> NeedIdList = projectMapper.getNeedIdByTeamNumber(team_id);
        if(NeedIdList.isEmpty()){
            return ResponseEntity.ok("暂无已结队需求");
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("Needs", NeedIdList);
        return ResponseEntity.ok(jsonObject);
    }
}

