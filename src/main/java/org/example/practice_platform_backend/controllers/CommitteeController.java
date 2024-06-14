package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.entity.CommunityLeader;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.service.SaveFileService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    private JwtUtils jwtUtils;
    @Autowired
    private CommunityMapper communityMapper;

    // 解析 token 判断是否是校团委
    private boolean isValid(HttpServletRequest request){
        int userId = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_id();
        return !communityLeaderService.checkIdentity(userId);
    }

    // 获取所有负责人
    @GetMapping(value="/community/leaders")
    public ResponseEntity<?> getCommunityLeaders(HttpServletRequest request) {
        try {
            if(isValid(request)){
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
            if(isValid(request)){
                return ResponseEntity.status(400).body("该用户不是校团委");
            }
            Map<String, String> result = communityLeaderService.modifyCommunityLeader(requestBody);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("修改错误");
        }
    }

    // 注册社区信息，返回注册后的社区 id
    @PostMapping("/register/community")
    public ResponseEntity<?> registerCommunity(HttpServletRequest request, @RequestBody Community requestBody) {
        if(isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        if(communityMapper.findCommunityIdByName(requestBody.getCommunity_name())>0){
            return ResponseEntity.status(400).body("社区名重复");
        }
        communityMapper.registerCommunity(requestBody);
        return ResponseEntity.status(200).header("id",requestBody.getCommunity_id()).body("注册成功");
    }

}

