package org.example.practice_platform_backend.service;

import com.google.gson.JsonArray;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Component
public class TeamService {

    @Autowired
    private TeamMapper  teamMapper;

    @Autowired
    private UserMapper userMapper;

    /**
     * 获取队伍成员
     */
    public JSONArray getTeamMembers(int team_number){
        List<Map<String, String>> members = teamMapper.getAllMembers(team_number);
        JSONArray result = new JSONArray();
        for(Map<String, String> member : members){
            JSONObject  jsonObject = new JSONObject();
            jsonObject.put("Name", member.get("name"));
            jsonObject.put("userName", member.get("username"));
            jsonObject.put("college", member.get("academy"));
            jsonObject.put("is_leader", member.get("privilege_level"));
            jsonObject.put("user_id", member.get("user_id"));
            result.add(jsonObject);
        }
        return result;
    }

    /**
     * 添加队员
     */
    public boolean addTeamMember(int team_number,String username){
        int user_id = userMapper.getUserIdByUsername(username);
        return teamMapper.addMember(user_id,team_number);
    }

    public  boolean deleteTeamMember(int user_id){
        return teamMapper.deleteMember(user_id);
    }
}
