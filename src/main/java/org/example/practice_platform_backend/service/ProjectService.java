package org.example.practice_platform_backend.service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.*;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.ProjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {

    @Autowired
    private ProjectMapper  projectMapper;
    
    @Autowired
    private CommunityMapper communityMapper;

    @Autowired
    private TeamMapper  teamMapper;

    @Autowired
    private UserMapper  userMapper;
    @Autowired
    private ImageUtils  imageUtils;
    
    @Autowired
    private ProjectUtils  projectUtils;

    @Autowired
    private  TagsMapper tagsMapper;

    @Value("${uploadPath}")
    String uploadPath;
    public JSONObject getProject_info(Project project) throws IOException {
        JSONObject result = new JSONObject();
        Project need = projectMapper.getNeedByNeedId(project.getNeed_id());
        Team team = teamMapper.getTeamById(project.getTeam_number());
        result.put("address",need.getAddress());
        result.put("team_cnt", String.valueOf(team.getMember_cnt()));
        result.put("gov",communityMapper.getCommunityName(need.getCommunity_id()));
        String community_avatar = imageUtils.getFileBytes(uploadPath + communityMapper.getCommunityAvatarPath(need.getCommunity_id()));
        result.put("gov_head",community_avatar);
        String team_avatar = imageUtils.getFileBytes(uploadPath + teamMapper.getTeamAvatarPathByTeamNumber(project.getTeam_number()));
        result.put("team_head",team_avatar);
        result.put("team_stu", userMapper.getNameById(team.getTeam_manager()));
        result.put("team_tea", userMapper.getNameById(teamMapper.getTeacherIdByTeamNumber(team.getTeam_number())));
        result.put("proj_intro", need.getIntroduction());
        JSONArray fruitList = projectUtils.getFruitList(project.getProject_id());
        result.put("activity_list",  fruitList);
        JSONArray img_list = projectUtils.getImgList(need.getNeed_id());
        result.put("img_list", img_list);
        JSONArray report_list = projectUtils.getReportList(project.getProject_id());
        result.put("report_list", report_list);
        List<String> tags = tagsMapper.searchTags(need.getNeed_id());
        JSONArray tags_list = new JSONArray();
        tags_list.addAll(tags_list);
        result.put("tag_list", tags_list);
        return result;
    }

    public JSONObject getNeed_info(int need_id) throws IOException {
        Project need = projectMapper.getNeedByNeedId(need_id);
        JSONObject result = new JSONObject();
        result.put("address",need.getAddress());
        result.put("gov", communityMapper.getCommunityName(need.getCommunity_id()));
        Map<String, String> manager_info = projectMapper.getManagerByNeed(need.getNeed_id());
        result.put("gov_manager", manager_info.get("name"));
        result.put("gov_phone", manager_info.get("phone_number"));
        String community_avatar = imageUtils.getFileBytes(uploadPath + communityMapper.getCommunityAvatarPath(need.getCommunity_id()));
        result.put("gov_avatar",community_avatar);
        result.put("demand_intro", need.getIntroduction());
        JSONArray img_list = projectUtils.getImgList(need.getNeed_id());
        result.put("imgList", img_list);
        result.put("teamed_flag", projectMapper.isTeamed(need.getNeed_id()));
        return result;
    }

    // 根据社区id 查需求清单
    public JSONArray getNeed_list(int gov_id) throws IOException {
        return projectUtils.getNeedList(gov_id);
    }

    // 根据社区id 查询结对项目列表
    public JSONObject getProject_list(int gov_id) throws IOException {
        JSONObject result =  new JSONObject();
        JSONArray proj_list =  projectUtils.getProjectList(gov_id);
        result.put("proj_list", proj_list);
        return result;
    }

    public JSONObject getUnpairedNeed(){
        return null;
    }
}
