package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.entity.Report;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.AuditMapper;
import org.example.practice_platform_backend.mapper.CommunityMapper;
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

    @Autowired
    private CommunityMapper  communityMapper;
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
     * 根据关键词 查未配对需求
     */
    @GetMapping("/search/unpaired")
    public ResponseEntity<?>  searchUnpairedNeed(@RequestParam(value = "keyword") String keyword) throws IOException {
        try{
            JSONObject result = projectService.searchUnpairedNeed(keyword);
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

    /**
     * 获取已结对项目的数量
     */
    @GetMapping("/need/paired_number")
    public ResponseEntity<?> getPairedNumber() {
        int paired_number = projectMapper.getPairedNeedCount();
        JSONObject result = new JSONObject();
        result.put("number", paired_number);
        return ResponseEntity.ok(JSON.toJSONString(result));
    }

    /**
     * 获取已结对的需求 根据队伍
     */
    @GetMapping("/need/team_paired")
    public ResponseEntity<?> getTeamPairedNeed(HttpServletRequest request) throws IOException {
        String token = request.getHeader("token");
        int user_id = jwtUtils.getUserInfoFromToken(token, User.class).getUser_id();
        int team_number = teamMapper.getTeamIdByUser(user_id);
        JSONArray result = projectService.getPairedNeedByTeam(team_number);
        return ResponseEntity.status(200).body(JSON.toJSONString(result));
    }

    /**
     * 根据需求 获取对应社区
     */
    @GetMapping("/need/get/community")
    public  ResponseEntity<?> getCommunityByNeed(@RequestParam("NeedID") int need_id){
        JSONObject result = new JSONObject();
        Community community = communityMapper.getCommunityByNeedId(need_id);
        result.put("ComID", community.getCommunity_id());
        result.put("ComName", community.getCommunity_name());
        return ResponseEntity.status(200).body(JSON.toJSONString(result));
    }
}

