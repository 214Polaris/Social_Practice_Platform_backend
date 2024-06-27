package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.mapper.NeedMapper;
import org.example.practice_platform_backend.service.AuditService;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.service.MapService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

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
    @Autowired
    private AuditService auditService;

    // 注册社区信息，返回注册后的社区 id，同时同步到审核列表当中
    @PostMapping("/register/community")
    @Transactional
    public ResponseEntity<?> registerCommunity(HttpServletRequest request, @RequestBody Community community) {
        int user_id = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class).getUser_id();
        if(!communityLeaderService.checkLeader(request)){
            return ResponseEntity.status(400).body("该用户不是社区负责人");
        }
        if(communityMapper.findCommunityIdByName(community.getCommunity_name())>0){
            return ResponseEntity.status(400).body("社区名重复");
        }
        if(communityMapper.existsCommunityUser(user_id)>0){
            return ResponseEntity.status(400).body("该社区负责人已有社区");
        }
        if(!MapService.checkValidAddress(community.getAddress())){
            return ResponseEntity.status(400).body("地址格式不合法");
        }
        community.setUser_id(user_id);
        // 插入社区
        communityMapper.registerCommunity(community);
        // 插入审核列表
        auditService.insertCommunity(community,community.getCommunity_id());
        return ResponseEntity.status(200).header("id", String.valueOf(community.getCommunity_id())).body("注册成功");
    }

    //修改社区基本信息
    @PostMapping("/modify")
    @Transactional
    public ResponseEntity<?> modifyCommunity(HttpServletRequest request, @RequestBody Community community){
        User user = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class);
        if(!Objects.equals(user.getUser_category(), "community")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是社区负责人");
        }
        if(communityMapper.findCommunityIdByUserId(user.getUser_id())!=community.getCommunity_id()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是该社区的负责人");
        }
        if(community.getAddress()!=null&&!MapService.checkValidAddress(community.getAddress())){
            return ResponseEntity.status(400).body("地址格式不合法");
        }
        // 获取之前的 id
        try {
            int origin_id = community.getCommunity_id();
            communityMapper.registerCommunity(community);
            int new_id = community.getCommunity_id();
            community.setCommunity_id(origin_id);
            auditService.insertCommunity(community, new_id);
        }catch (DataAccessException e){
            e.fillInStackTrace();
            return ResponseEntity.status(400).body("数据库错误");
        }
        return ResponseEntity.ok().body("修改社区成功");
    }

    // 注册社区需求，同时同步到审核列表当中
    @PostMapping("/register/need")
    @Transactional
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
        needMapper.registerNeed(communityNeed);
        CommunityNeed.media media = new CommunityNeed.media();
        media.setNeed_id(communityNeed.getNeed_id());
        media.setPath("need_images/default.jpg");
        needMapper.addNeedCover(media);
        Integer media_id = media.getMedia_id();
        Integer need_id = communityNeed.getNeed_id();
        if(media_id==0){
            return ResponseEntity.status(400).body("注册社区需求失败");
        }
        return ResponseEntity.status(200).header("media_id", String.valueOf(media_id)).
                header("need_id", String.valueOf(need_id)).body("注册社区需求成功");
    }
}
