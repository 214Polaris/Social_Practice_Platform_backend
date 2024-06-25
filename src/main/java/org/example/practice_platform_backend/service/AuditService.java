package org.example.practice_platform_backend.service;

import org.example.practice_platform_backend.entity.Audit;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.*;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
    public List<Audit.NeedAudit> getNeedAudits() {
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
}
