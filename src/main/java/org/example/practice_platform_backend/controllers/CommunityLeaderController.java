package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.AuditMapper;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.mapper.NeedMapper;
import org.example.practice_platform_backend.service.AuditService;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.service.MapService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(CommunityLeaderService.class);

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

    //获取该负责人发布的所有需求


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

    //修改社区基本信息，同时同步到审核列表当中
    @PostMapping("/community/modify")
    @Transactional
    public ResponseEntity<?> modifyCommunity(HttpServletRequest request, @RequestBody Community community){
        User user = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class);
        if(!Objects.equals(user.getUser_category(), "community")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是社区负责人");
        }
        Community origin_community = communityMapper.getCommunityById(community.getCommunity_id());
        if(origin_community==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("找不到该社区");
        }
        if(origin_community.getUser_id()!=user.getUser_id()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是该社区的负责人");
        }
        if(community.getAddress()!=null){
            if(!MapService.checkValidAddress(community.getAddress())) {
                return ResponseEntity.status(400).body("地址格式不合法");
            }
            origin_community.setAddress(community.getAddress());
        }
        try {
            community.setUser_id(user.getUser_id());
            communityLeaderService.modifyCommunity(origin_community,community);
        }catch (DataAccessException e){
            LOGGER.error(e.getMessage());
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
        if(communityNeed.getAddress()==null||!MapService.checkValidAddress(communityNeed.getAddress())){
            return ResponseEntity.status(400).body("地址未填写或地址格式错误");
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
        auditService.insertNeed(communityNeed,need_id);
        return ResponseEntity.status(200).header("media_id", String.valueOf(media_id)).
                header("need_id", String.valueOf(need_id)).body("注册社区需求成功");
    }

    // 修改需求，同时同步到审核列表当中
    @PostMapping("/modify/need")
    public ResponseEntity<?> modifyNeed(HttpServletRequest request, @RequestBody CommunityNeed communityNeed){
        //鉴权，确定是当前用户发布的需求
        User user = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class);
        if(!Objects.equals(user.getUser_category(), "community")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是社区负责人");
        }
        CommunityNeed origin_need = needMapper.getNeedByNeedId(communityNeed.getNeed_id());
        if(origin_need==null){
            return ResponseEntity.status(400).body("未找到待修改需求");
        }
        if(communityNeed.getAddress()!=null){
            if(!MapService.checkValidAddress(communityNeed.getAddress())) {
                return ResponseEntity.status(400).body("地址不符合格式");
            }
            origin_need.setAddress(communityNeed.getAddress());
        }
        if(!needMapper.selectNeedByUserId(user.getUser_id()).contains(communityNeed.getNeed_id())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户并未发布过该需求");
        }
        auditService.applyNeedChanges(origin_need,communityNeed);
        needMapper.registerNeed(origin_need);
        int new_id = origin_need.getNeed_id();
        origin_need.setNeed_id(communityNeed.getNeed_id());
        auditService.insertNeed(origin_need,new_id);
        return ResponseEntity.ok().body("修改成功");
    }
}
