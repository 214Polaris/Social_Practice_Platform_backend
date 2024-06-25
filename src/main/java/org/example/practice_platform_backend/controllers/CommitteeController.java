package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.Audit;
import org.example.practice_platform_backend.service.AuditService;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.entity.CommunityLeader;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/committee")
public class CommitteeController {

    // 错误日志
    private static final Logger LOGGER = LoggerFactory.getLogger(CommitteeController.class);

    @Autowired
    private CommunityLeaderService communityLeaderService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuditService auditService;

    // 解析 token 判断是否是校团委
    private Boolean isValid(HttpServletRequest request){
        String user_category = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_category();
        return Objects.equals(user_category, "committee");
    }

    // 获取所有负责人
    @GetMapping(value="/community/leaders")
    public ResponseEntity<?> getCommunityLeaders(HttpServletRequest request) {
        try {
            if(!isValid(request)){
                return ResponseEntity.status(400).body("该用户不是校团委");
            }
            List<CommunityLeader> communityLeaders = communityLeaderService.getCommunityLeaders();
            return ResponseEntity.ok(communityLeaders);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.internalServerError().body("获取负责人失败");
        }
    }

    // 更改负责人
    @PostMapping("/modify/community/leader")
    public ResponseEntity<?> deleteCommunityLeader(HttpServletRequest request, @RequestBody Map<String,String> requestBody) {
        try {
            if(!isValid(request)){
                return ResponseEntity.status(400).body("该用户不是校团委");
            }
            Map<String, String> result = communityLeaderService.modifyCommunityLeader(requestBody);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("修改错误");
        }
    }

    //获取社区的审核列表
    @GetMapping("/audit/community")
    public ResponseEntity<?> getAuditCommunityList(HttpServletRequest request) {
        if(!isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        List<Audit.CommunityAudit> communityAuditList = auditService.getCommunityAudits();
        if(communityAuditList.isEmpty()){
            return ResponseEntity.status(200).body("审核列表为空");
        }
        return ResponseEntity.ok(communityAuditList);
    }

    //获取队伍的审核列表
    @GetMapping("/audit/team")
    public ResponseEntity<?> getAuditTeamList(HttpServletRequest request) {
        if(!isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        List<Audit.TeamAudit> teamAuditList = auditService.getTeamAudits();
        if(teamAuditList.isEmpty()){
            return ResponseEntity.status(200).body("审核列表为空");
        }
        return ResponseEntity.ok(teamAuditList);
    }

    //获取社区需求的审核列表
    @GetMapping("/audit/need")
    public ResponseEntity<?> getAduitNeedList(HttpServletRequest request) {
        if(!isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        List<Audit.NeedAudit> needAuditList = auditService.getNeedAudits();
        if(needAuditList.isEmpty()){
            return ResponseEntity.status(200).body("审核列表为空");
        }
        return ResponseEntity.ok(needAuditList);
    }

    //获取成果的审核列表
    @GetMapping("/audit/fruit")
    public ResponseEntity<?> getAuditFruitList(HttpServletRequest request) {
        if(!isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        List<Audit.FruitAudit> fruitAuditList = auditService.getFruitAudits();
        if(fruitAuditList.isEmpty()){
            return ResponseEntity.status(200).body("审核列表为空");
        }
        return ResponseEntity.ok(fruitAuditList);
    }


}

