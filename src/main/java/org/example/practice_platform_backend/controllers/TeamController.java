package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.service.AuditService;
import org.example.practice_platform_backend.service.MapService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.example.practice_platform_backend.utils.TeamUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class TeamController {

    // 错误日志
    private static final Logger LOGGER = LoggerFactory.getLogger(CommitteeController.class);

    @Autowired
    TeamMapper teamMapper;

    @Autowired
    TeamUtils  teamUtils;

    @Autowired
    private  AuditService auditService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserMapper userMapper;

    // 注册新队伍 待审核
    @PostMapping(value = "/team/register")
    public ResponseEntity<?> registerTeam(@RequestBody Team team, HttpServletRequest request) {
        try {
            User user = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class);
            int user_id = user.getUser_id();
            if(!Objects.equals(user.getUser_category(), "student")){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是学生");
            }
            team.setTeam_manager(user_id);
            if(teamMapper.isHaveTeam(user_id)){
                return ResponseEntity.status(400).body("该学生已拥有通过审核的队伍");
            }
            if(!MapService.checkValidAddress(team.getAddress())){
                return ResponseEntity.status(400).body("地区不符合规范");
            }
            if(!userMapper.existUser(team.getTeacher_id())){
                return ResponseEntity.status(400).body("该老师不存在");
            }
            team.setCollege("中山大学");
            team.setAvatar_path("team_avatar/default_avatar.jpg");
            teamMapper.insertTeam(team);
            auditService.insertTeam(team,team.getTeam_number());
            return ResponseEntity.status(200).body("注册成功");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("注册失败");
        }
    }

    //突击队详情信息get
    @GetMapping("/team/detail")
    public ResponseEntity<?> getTeamInfo(@Param("team_id") String team_id) {
        Team team = teamMapper.getTeamById(Integer.parseInt(team_id));
        //处理team
        try {
            JSONObject result = teamUtils.getTeamInfo(team);
            return ResponseEntity.status(200).body(JSONObject.toJSONString(result));
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("查询错误");
        }
    }

    //加载队伍基本信息
    @GetMapping("/team")
    public ResponseEntity<?> getTeam(@Param("team_id") int team_id) throws IOException {
        JSONObject result = teamUtils.getTeam(team_id);
        if (result.isEmpty()) {
            return ResponseEntity.status(400).body("未找到队伍信息");
        }
        return ResponseEntity.status(200).body(result);
    }

    //修改队伍基本信息
    @PostMapping("/team/modify")
    @Transactional
    public ResponseEntity<?> modifyTeam(HttpServletRequest request, @RequestBody Team team) {
        // 获取之前的队伍
        int origin_id = team.getTeam_number();
        Team origin_team = teamMapper.getTeamById(origin_id);
        if (origin_team == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("队伍不存在");
        }
        if(!teamUtils.checkTeamUser(request,team.getTeam_number())){
            return ResponseEntity.status(400).body("该用户不是该队伍的负责人");
        }
        if(team.getAddress()!=null){
            if(!MapService.checkValidAddress(team.getAddress())) {
                return ResponseEntity.status(400).body("地区不符合规范");
            }
            origin_team.setAddress(team.getAddress());
        }
        if(team.getTeacher()!=null){
            if(!userMapper.existUser(team.getTeacher_id())){
                return ResponseEntity.status(400).body("该老师不存在");
            }
            origin_team.setTeacher(team.getTeacher());
        }
        // 看修改了哪里
        auditService.applyTeamChanges(origin_team,team);
        // 注册一个新的队伍
        try{
            teamMapper.insertTeam(origin_team);
            int new_id = origin_team.getTeam_number();
            origin_team.setTeam_number(origin_id);
            // 插入到审核列表
            auditService.insertTeam(origin_team,new_id);
            return ResponseEntity.status(200).body("修改成功");
        } catch (Exception e){
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("修改队伍出现错误");
        }
    }
}
