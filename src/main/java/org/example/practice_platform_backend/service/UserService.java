package org.example.practice_platform_backend.service;

import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Objects;

@Service
public class UserService {

    @Value("${uploadPath}")
    private String uploadPath;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ImageUtils imageUtils;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CommunityMapper communityMapper;
    @Autowired
    private TeamMapper teamMapper;

    // 获取 User 信息
    public HashMap<String, String> getUserByUser_id(int user_id) throws IOException {
        HashMap<String,String> user = userMapper.getUserById(user_id);
        String trueName = ImageUtils.getTrueName(user.get("image"));
        String suffix = ImageUtils.getSuffix(user.get("image"));
        String path = uploadPath + "avatar" + File.separator + trueName + "_origin" + suffix;
        user.put("image",imageUtils.getFileBytes(path));
        return user;
    }

    // 获取附加信息
    public Integer getExtraInfo(User user) {
        int user_id = user.getUser_id();
        if(Objects.equals(user.getUser_category(), "community")){
            return communityMapper.findCommunityIdByUserId(user_id);
        }
        if(Objects.equals(user.getUser_category(), "student")){
            return teamMapper.getTeamIdByUser(user_id);
        }
        else{
            return null;
        }
    }

    public JSONObject getStuInfo(int user_id){
        JSONObject jsonObject = new JSONObject();
        HashMap<String,String> user = userMapper.getStudentInfo(user_id);
        jsonObject.put("Name",user.get("name"));
        jsonObject.put("college",user.get("academy"));
        int hasJoinOther = teamMapper.isHaveTeam(user_id)?1:0;
        jsonObject.put("hasJoinOther",hasJoinOther);
        return jsonObject;
    }



}
