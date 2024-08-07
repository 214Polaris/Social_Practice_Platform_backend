package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson.JSONObject;
import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.*;
import org.example.practice_platform_backend.mapper.*;
import org.example.practice_platform_backend.service.AuditService;
import org.example.practice_platform_backend.service.CommunityLeaderService;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    @Autowired
    private AuditMapper auditMapper;
    @Autowired
    private NeedMapper needMapper;
    @Autowired
    private TeamMapper teamMapper;
    @Autowired
    private CommunityMapper communityMapper;
    @Autowired
    private FruitMapper fruitMapper;
    @Autowired
    private TagsMapper tagsMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ImageUtils imageUtils;
    @Value("${uploadPath}")
    private String uploadPath;

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

    //获取详细的审核信息
    @GetMapping("/audit/detail")
    public ResponseEntity<?> getAuditDetailList(HttpServletRequest request,@RequestParam("type") Integer type,
                                                @RequestParam("audit_id") Integer auditId) {

        if(!isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        //需求
        if(type == 1){
            Integer need_id = auditMapper.getNeedByAuditId(auditId);
            CommunityNeed need = needMapper.getUnAuditNeedByNeedId(need_id);
            need.setTags(tagsMapper.searchTags(need_id));
            return ResponseEntity.ok(need);
        }
        //队伍
        if(type == 2){
            Integer team_number = auditMapper.getTeamIdByAuditId(auditId);
            Team team = teamMapper.getTeamById(team_number);
            team.setAvatar_path(null);
            team.setTags(tagsMapper.searchTeamTags(team_number));
            return ResponseEntity.ok(team);
        }
        //社区
        if(type == 3){
            Integer community_id = auditMapper.getCommunityNewIdByAuditId(auditId);
            Community community = communityMapper.getCommunityById(community_id);
            community.setAvatar_path(null);
            return ResponseEntity.ok(community);
        }
        //成果
        if(type == 4){
            Integer fruit_id = auditMapper.getFruitNewIdByAuditId(auditId);
            Fruit fruit = fruitMapper.getFruit(fruit_id);
            return ResponseEntity.ok(fruit);
        }
        return ResponseEntity.status(400).body("类别不正确");
    }

    //审核结果
    @PostMapping("/audit/result")
    @Transactional
    public ResponseEntity<?> auditResult(HttpServletRequest request, @RequestBody JSONObject result) {
        if(!isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        Integer type = result.getInteger("type");
        if(type>4||type<1){
            return ResponseEntity.status(400).body("type不正确");
        }
        Integer audit_id = result.getInteger("audit_id");
        String reason = result.getString("reason");
        Boolean is_pass = result.getBoolean("is_pass");
        Integer id = result.getInteger("id");
        if(id==null||audit_id==null){
            return ResponseEntity.status(400).body("请输入 id");
        }
        if(reason==null&&!is_pass){
            return ResponseEntity.status(400).body("请输入不过审的理由");
        }
        String msg = auditService.updateAudit(audit_id,type,reason,is_pass,id);
        if(msg==null){
            return ResponseEntity.status(400).body("数据库错误");
        }
        return ResponseEntity.status(200).body(msg);
    }

    //根据 user_id 获取用户信息
    @GetMapping("/get/leader/detail")
    public ResponseEntity<?> getLeaderDetail(HttpServletRequest request,@RequestParam("user_id") int user_id) throws IOException {
        if(!isValid(request)){
            return ResponseEntity.status(400).body("该用户不是校团委");
        }
        JSONObject user = userMapper.getUserByUserId(user_id);
        if(user==null){
            return ResponseEntity.status(400).body("用户不存在");
        }
        String path = user.getString("avatar_path");
        user.remove("avatar_path");
        user.put("avatar", imageUtils.getFileBytes(uploadPath+path));
        return ResponseEntity.ok(user);
    }

}

