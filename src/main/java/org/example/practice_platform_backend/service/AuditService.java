package org.example.practice_platform_backend.service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Audit;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.*;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AuditService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SaveFileService.class);
    @Autowired
    AuditMapper auditMapper;

    @Autowired
    CommunityMapper communityMapper;
    @Autowired
    private SendFileService sendFileService;
    @Autowired
    private TeamMapper teamMapper;
    @Autowired
    private NeedMapper needMapper;
    @Autowired
    private ImageUtils imageUtils;
    @Autowired
    private FruitMapper fruitMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ProjectMapper projectMapper;

    @Value("${uploadPath}")
    private String uploadPath;

    private final String[] address_match = {"广东省广州市海珠区", "广东省广州市番禺区", "广东省广州市越秀区", "广东省珠海市香洲区", "广东省深圳市光明区"};

    // 获取社区的审核列表
    public List<Audit.CommunityAudit> getCommunityAudits() {
        List<Audit> auditList = auditMapper.getCommunityAudit();
        List<Audit.CommunityAudit> communityAuditList = new ArrayList<>();
        auditList.forEach(audit -> {
            Community community = communityMapper.getCommunityById(audit.getCommunity_id());
            Audit.CommunityAudit communityAudit = new Audit.CommunityAudit();
            communityAudit.setId(audit.getCommunity_id());
            communityAudit.setName(community.getCommunity_name());
            communityAudit.setAudit_id(audit.getAudit_id());
            try {
                String image = sendFileService.sendAvatar(community.getAvatar_path());
                communityAudit.setImg(image);
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
            communityAuditList.add(communityAudit);
        });
        return communityAuditList;
    }

    //获取高校队伍的审核列表
    public List<Audit.TeamAudit> getTeamAudits() {
        List<Audit> auditList = auditMapper.getTeamAudit();
        List<Audit.TeamAudit> teamAuditList = new ArrayList<>();
        auditList.forEach(audit -> {
            Team team = teamMapper.getTeamById(audit.getTeam_id());
            Audit.TeamAudit teamAudit = new Audit.TeamAudit();
            teamAudit.setId(audit.getTeam_id());
            teamAudit.setTeam_name(team.getTeam_name());
            teamAudit.setAudit_id(audit.getAudit_id());
            teamAudit.setAcademy_name(team.getAcademy());
            try {
                String image = sendFileService.sendAvatar(team.getAvatar_path());
                teamAudit.setImg(image);
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
            teamAuditList.add(teamAudit);
        });
        return teamAuditList;
    }

    //获取需求的审核列表
    public List<Audit.NeedAudit>  getNeedAudits() {
        List<Audit> auditList = auditMapper.getNeedAudit();
        List<Audit.NeedAudit> needAuditList = new ArrayList<>();
        auditList.forEach(audit -> {
            CommunityNeed need = needMapper.getUnAuditNeedByNeedId(audit.getNeed_id());
            if(need==null){
                return;
            }
            Audit.NeedAudit needAudit = new Audit.NeedAudit();
            needAudit.setId(audit.getNeed_id());
            needAudit.setCommunity_id(need.getCommunity_id());
            String community_name = communityMapper.getCommunityName(need.getCommunity_id());
            needAudit.setTitle(need.getTitle());
            needAudit.setCommunity_name(community_name);
            needAudit.setAudit_id(audit.getAudit_id());
            try {
                String coverPath = needMapper.getCoverPathByNeedId(need.getNeed_id());
                coverPath = ImageUtils.getRealName(coverPath);
                String image = sendFileService.sendImage(coverPath,1,need.getNeed_id());
                needAudit.setImg(image);
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
            needAuditList.add(needAudit);
        });
        return needAuditList;
    }

    //获取成果的审核列表
    public List<Audit.FruitAudit> getFruitAudits() {
        List<Audit> auditList = auditMapper.getFruitAudit();
        List<Audit.FruitAudit> fruitAuditList = new ArrayList<>();
        auditList.forEach(audit -> {
            Audit.FruitAudit fruitAudit = new Audit.FruitAudit();
            fruitAudit.setId(audit.getFruit_id());
            fruitAudit.setAudit_id(audit.getAudit_id());
            fruitAudit.setTitle(fruitMapper.getFruitTitleByFruitId(audit.getFruit_id()));
            try {
                String coverPath = fruitMapper.getFruitCover(audit.getFruit_id());
                coverPath = ImageUtils.getRealName(coverPath);
                String image = sendFileService.sendImage(coverPath,2, fruitAudit.getId());
                fruitAudit.setImg(image);
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
            fruitAuditList.add(fruitAudit);
        });
        return fruitAuditList;
    }

    public JSONObject getAuditList_com(int user_id) throws IOException {
        List<Audit> communityAuditList = community_audit_notice(user_id);
        List<Audit> needAuditList = need_audit_notice(user_id);
        int community_id = communityMapper.findCommunityIdByUserId(user_id);
        List<Audit> pairAuditList = auditMapper.getProjAuditByCommunityId(community_id);
        JSONObject result = new JSONObject();
        JSONArray list = new JSONArray();
        List<Audit> auditList =  new ArrayList<>();
        auditList.addAll(communityAuditList);
        auditList.addAll(needAuditList);
        auditList.addAll(pairAuditList);
        Collections.sort(auditList);
        for(Audit audit:auditList){
            JSONObject jsonObject = new JSONObject();
            if(audit.getCommunity_id() != 0){ // 说明是社区相关
                if(audit.getIs_pass() == 1){  // 审核通过
                     jsonObject.put("type", 1);
                     jsonObject.put("Name",  communityMapper.getCommunityName(audit.getNew_id()));
                     jsonObject.put("id", audit.getNew_id());
                }else{
                     jsonObject.put("type", 2);
                     jsonObject.put("reason", audit.getFail_interpretation());
                     jsonObject.put("Name",  communityMapper.getCommunityName(audit.getCommunity_id()));
                     jsonObject.put("id", audit.getCommunity_id());
                }
                jsonObject.put("time", audit.getLast_mod_time());
                String img_path = communityMapper.getCommunityAvatarPath(audit.getCommunity_id());
                jsonObject.put("img", imageUtils.getThumbnail(uploadPath + img_path));
            }
            else if(audit.getNeed_id() != 0){ // 说明是需求相关
                if(audit.getNeed_id() == audit.getNew_id()){ // 新需求
                    if(audit.getIs_pass() == 1) { // 审核通过
                        jsonObject.put("type", 3);
                    }else{
                        jsonObject.put("type", 4);
                        jsonObject.put("id", audit.getNeed_id());
                    }
                    jsonObject.put("Name",  projectMapper.getNeedByNeedId(audit.getNeed_id()).getTitle());
                    jsonObject.put("id", audit.getNeed_id());
                    jsonObject.put("time", audit.getLast_mod_time());
                }else { // 修改需求
                    if(audit.getIs_pass() == 1) { // 审核通过
                        jsonObject.put("type", 5);
                        jsonObject.put("Name",  projectMapper.getNeedByNeedId(audit.getNew_id()).getTitle());
                        jsonObject.put("id", audit.getNew_id());
                    }else{
                        jsonObject.put("type", 6);
                        jsonObject.put("reason", audit.getFail_interpretation());
                        jsonObject.put("Name",  projectMapper.getNeedByNeedId(audit.getNeed_id()).getTitle());
                        jsonObject.put("id", audit.getNeed_id());
                    }
                    jsonObject.put("time", audit.getLast_mod_time());
                }
                String img_path = needMapper.getCoverPathByNeedId(audit.getNeed_id());
                jsonObject.put("img", imageUtils.getThumbnail(uploadPath + img_path));
            }
            else if(audit.getProject_id() != 0){ // 说明是结对相关
                jsonObject.put("type", 7);
                 jsonObject.put("Name",  projectMapper.getNeedByProjectId(audit.getProject_id()).getTitle());
                 jsonObject.put("id", projectMapper.getNeedByProjectId(audit.getProject_id()).getNeed_id());
                 jsonObject.put("time", audit.getApply_time());
                 jsonObject.put("TeamName", teamMapper.getTeamNameByProjectId(audit.getProject_id()));
                 jsonObject.put("TeamID", teamMapper.getTeamIdByProjectId(audit.getProject_id()));
                 String img_path = teamMapper.getTeamAvatarPathByTeamNumber(teamMapper.getTeamIdByProjectId(audit.getProject_id()));
                 jsonObject.put("img", imageUtils.getThumbnail(uploadPath + img_path));
            }
            else
                continue;
            list.add(jsonObject);
        }
        result.put("message", list);
        return result;
    }

    /**
     * 获取社区审核变更列表 申请人
     */
    @Transactional
    public List<Audit> community_audit_notice(int user_id){
        List<Audit> communityAuditList = auditMapper.getCommunityAuditByUserId(user_id);
        auditMapper.updateCommunityAuditAsRead(user_id);
        return communityAuditList;
    }

    /**
     * 获取需求审核变更列表 申请人
     */
    @Transactional
    public List<Audit> need_audit_notice(int user_id){
        List<Audit> needAuditList = auditMapper.getNeedAuditByUserId(user_id);
        auditMapper.updateNeedAuditAsRead(user_id);
        return needAuditList;
    }

//    /**
//     * 高校队伍注册申请
//     */
//    @Transactional
//    public boolean registerTeam(Team team){
//        team.setCollege("中山大学");
//        team.setAvatar_path("team_avatar/default_avatar.jpg");
//        try{
//            teamMapper.insertTeam(team);
//            insertTeam(team,team.getTeam_number());
//        } catch  (Exception e){
//            LOGGER.error(e.getMessage());
//            return false;
//        }
//        return true;
//    }

    /**
     * 插入队伍信息 创建审核列表
     */
    @Transactional
    public void insertTeam(Team team,int newId) {
        Audit audit = new Audit();
        audit.setApply_time(LocalDateTime.now());
        audit.setTeam_id(team.getTeam_number());
        audit.setNew_id(newId);
        audit.setApply_user_id(team.getTeam_manager());
        audit.setTeacher_netid(team.getTeacher_id());
        auditMapper.newTeamAudit(audit);
  }

    /**
     * 确认队伍修改信息
     */
    @Transactional
    public void applyTeamChanges(Team origin_team, Team team){
        if(team.getTeam_name()!=null){
            origin_team.setTeam_name(team.getTeam_name());
        }
        if(team.getIntroduction()!=null){
            origin_team.setIntroduction(team.getIntroduction());
        }
        if(team.getAcademy()!=null){
            origin_team.setAcademy(team.getAcademy());
        }
    }

    /**
     * 插入社区的审核信息，创建社区审核列表
     */
    @Transactional
    public void insertCommunity(Community community,Integer new_id){
        Audit audit = new Audit();
        audit.setCommunity_id(community.getCommunity_id());
        audit.setApply_time(LocalDateTime.now());
        audit.setNew_id(new_id);
        audit.setApply_user_id(community.getUser_id());
        auditMapper.insertCommunityAudit(audit);
    }

    /**
     * 确认社区修改信息
     */
    @Transactional
    public void applyCommunityChanges(Community origin_community, Community community){
        if(community.getCommunity_name()!=null){
            origin_community.setCommunity_name(community.getCommunity_name());
        }
        if(community.getIntroduction()!=null){
            origin_community.setIntroduction(community.getIntroduction());
        }
    }

    /**
     * 插入需求审核信息，创建需求审核列表
     */
    @Transactional
    public void insertNeed(CommunityNeed communityNeed,Integer new_id){
        Audit audit = new Audit();
        audit.setNeed_id(communityNeed.getNeed_id());
        audit.setApply_time(LocalDateTime.now());
        audit.setNew_id(new_id);
        audit.setApply_user_id(communityMapper.getCommunityUserIdByCommunityId(communityNeed.getCommunity_id()));
        auditMapper.insertNeedAudit(audit);
    }

    /**
     * 确认需求修改信息
     */
    @Transactional
    public void applyNeedChanges(CommunityNeed origin_need,CommunityNeed need){
        if(need.getResource()!=null){
            origin_need.setResource(need.getResource());
        }
        if(need.getIntroduction()!=null){
            origin_need.setIntroduction(need.getIntroduction());
        }
        if(need.getTitle()!=null){
            origin_need.setTitle(need.getTitle());
        }
    }

}
