package org.example.practice_platform_backend.utils;

import lombok.Setter;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.ProjectMapper;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Setter
@Component
public class TeamUtils {

    @Autowired
    private UserMapper  userMapper;
    
    @Autowired
    private TeamMapper teamMapper;
    
    @Autowired
    private ProjectMapper  projectMapper;
    public JSONObject getTeamInfo(Team team){
        JSONObject result = new JSONObject();
        JSONArray teamList = new JSONArray();
        Map<String, String> manager = userMapper.getNameAndPhone(team.getTeam_manager());
        Map<String, String> teacher = userMapper.getNameAndPhone(teamMapper.getTeacherIdByTeamNumber(team.getTeam_number()));
        Project[] projects = projectMapper.getProjectsByTeamNumber(team.getTeam_number()); // 结对项目
        for(Project project : projects){
            JSONObject projectJson = new JSONObject();
            Project need = projectMapper.getProjectByNeedId(project.getNeed_id());
            
        }
        return null;

    }
}
