package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leader")
public class CommunityLeaderController {

    @Autowired
    private CommunityLeaderService communityLeaderService;
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CommunityMapper communityMapper;

    // 注册社区信息，返回注册后的社区 id
    @PostMapping("/register/community")
    public ResponseEntity<?> registerCommunity(HttpServletRequest request, @RequestBody Community requestBody) {
        int user_id = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_id();
        if(!communityLeaderService.checkLeader(user_id)){
            return ResponseEntity.status(400).body("该用户不是社区负责人");
        }
        if(communityMapper.findCommunityIdByName(requestBody.getCommunity_name())>0){
            return ResponseEntity.status(400).body("社区名重复");
        }
        if(communityMapper.existsCommunityUser(user_id)>0){
            return ResponseEntity.status(400).body("该社区负责人已有社区");
        }
        requestBody.setUser_id(user_id);
        communityMapper.registerCommunity(requestBody);
        return ResponseEntity.status(200).header("id",requestBody.getCommunity_id()).body("注册成功");
    }
}
