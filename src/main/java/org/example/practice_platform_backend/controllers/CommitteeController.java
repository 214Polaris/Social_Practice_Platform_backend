package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONArray;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.entity.CommunityLeader;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.service.ProjectService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/committee")
public class CommitteeController {

    // 错误日志
    private static final Logger LOGGER = LoggerFactory.getLogger(CommitteeController.class);

    @Autowired
    private CommunityLeaderService communityLeaderService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping(value="/community/leaders")
    public ResponseEntity<?> getCommunityLeaders(HttpServletRequest request) {
        try {
            int userId = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_id();
            if (!communityLeaderService.checkIdentity(userId)) {
                return ResponseEntity.status(400).body("该用户不是校团委");
            }
            List<CommunityLeader> communityLeaders = communityLeaderService.getCommunityLeaders();
            return ResponseEntity.ok(communityLeaders);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.internalServerError().body("获取负责人失败");
        }
    }

    @PostMapping("/modify/community/leader")
    public ResponseEntity<?> deleteCommunityLeader(HttpServletRequest request, @RequestBody Map<String,String> requestBody) {
        try {
            int userId = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_id();
            if (!communityLeaderService.checkIdentity(userId)) {
                return ResponseEntity.status(400).body("该用户不是校团委");
            }
            Map<String, String> result = communityLeaderService.modifyCommunityLeader(requestBody);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}

