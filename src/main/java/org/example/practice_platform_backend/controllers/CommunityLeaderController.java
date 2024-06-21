package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.mapper.NeedMapper;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.service.MapService;
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
    @Autowired
    private NeedMapper needMapper;

    // 注册社区信息，返回注册后的社区 id
    @PostMapping("/register/community")
    public ResponseEntity<?> registerCommunity(HttpServletRequest request, @RequestBody Community requestBody) {
        int user_id = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_id();
        if(!communityLeaderService.checkLeader(request)){
            return ResponseEntity.status(400).body("该用户不是社区负责人");
        }
        if(communityMapper.findCommunityIdByName(requestBody.getCommunity_name())>0){
            return ResponseEntity.status(400).body("社区名重复");
        }
        if(communityMapper.existsCommunityUser(user_id)>0){
            return ResponseEntity.status(400).body("该社区负责人已有社区");
        }
        if(!MapService.checkValidAddress(requestBody.getAddress())){
            return ResponseEntity.status(400).body("地址格式不合法");
        }
        requestBody.setUser_id(user_id);
        communityMapper.registerCommunity(requestBody);
        return ResponseEntity.status(200).header("id", String.valueOf(requestBody.getCommunity_id())).body("注册成功");
    }

    // 注册社区需求
    @PostMapping("/register/need")
    public ResponseEntity<?> registerNeed(HttpServletRequest request, @RequestBody CommunityNeed communityNeed){
        if(!communityLeaderService.checkLeader(request)){
            return ResponseEntity.status(400).body("该用户不是社区负责人");
        }
        int user_id = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_id();
        Integer community_id = communityMapper.findCommunityIdByUserId(user_id);
        if(community_id==null){
            return ResponseEntity.status(400).body("该用户不存在社区");
        }
        communityNeed.setIs_pair(0);
        communityNeed.setIs_pass(0);
        communityNeed.setCommunity_id(community_id);
        Boolean result = needMapper.registerNeed(communityNeed);
        if(!result){
            return ResponseEntity.status(400).body("注册社区失败");
        }
        return ResponseEntity.status(200).body("注册社区成功");
    }
}
