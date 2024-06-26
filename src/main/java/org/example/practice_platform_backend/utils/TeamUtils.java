package org.example.practice_platform_backend.utils;

import lombok.Setter;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Setter
@Component
public class TeamUtils {

    @Autowired
    private UserMapper  userMapper;
    
    @Autowired
    private TeamMapper teamMapper;

    @Autowired
    private TagsMapper  tagsMapper;
    
    @Autowired
    private ProjectMapper  projectMapper;

    @Autowired
    private CommunityMapper  communityMapper;

    @Autowired
    private MediaMapper  mediaMapper;

    @Autowired
    private ImageUtils  imageUtils;

    @Value("${uploadPath}")
//    private String uploadPath = "D:/Desktop/Processing/终极实训/Social_Practice_Platform_backend/uploadfiles";
    private String uploadPath;
    public JSONObject getTeamInfo(Team team) throws IOException {
        JSONObject result = new JSONObject();
        JSONArray teamList = new JSONArray();
        Project[] projects = projectMapper.getProjectsByTeamNumber(team.getTeam_number()); // 结对项目
        for(Project project : projects){
            JSONObject projectJson = new JSONObject();
            Project need = projectMapper.getNeedByNeedId(project.getNeed_id());
            List<String> tags = tagsMapper.searchTags(need.getNeed_id());
            JSONArray  tagArray = new JSONArray();
            tagArray.addAll(tags);
            projectJson.put("proj_title", need.getTitle());
            projectJson.put("tags", tagArray);
            projectJson.put("proj_gov", communityMapper.getCommunityName(need.getCommunity_id()));
            String img_path = mediaMapper.getNeedCoverPath(need.getNeed_id());
            if(img_path == null){
                continue;
            }
            String img = imageUtils.getThumbnail(uploadPath + img_path);
            projectJson.put("proj_img", img);
            projectJson.put("proj_id", String.valueOf(project.getProject_id()));
            teamList.add(projectJson);
        }
        result.put("member_cnt", String.valueOf(team.getMember_cnt()));
        result.put("team_intro", team.getIntroduction());
        String team_avatar = imageUtils.getFileBytes(uploadPath + team.getAvatar_path());
        result.put("team_avatar",team_avatar);
        result.put("team_name", team.getTeam_name());
        result.put("team_manager", userMapper.getNameById(team.getTeam_manager()));
        result.put("team_teacher", userMapper.getNameById(teamMapper.getTeacherIdByTeamNumber(team.getTeam_number())));
        result.put("team_phone", userMapper.getPhoneById(teamMapper.getTeacherIdByTeamNumber(team.getTeam_number())));
        result.put("teamedList", teamList);
        return result;

    }

    public JSONObject getTeam(int team_id) throws IOException {
        JSONObject result = new JSONObject();
        Team team = teamMapper.getTeamById(team_id);
        JSONObject teacher = teamMapper.getTeacherInfoByTeamNumber(team_id);
        result.put("name", team.getTeam_name());
        result.put("introduction", team.getIntroduction());
        result.put("academy", team.getAcademy());
        result.put("teacher", teacher.get("name"));
        result.put("teacherID", teacher.get("user_id"));
        return result;
    }
}
