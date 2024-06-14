package org.example.practice_platform_backend.controllers;

import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.utils.TeamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TeamController {

    @Autowired
    TeamMapper teamMapper;

    @Autowired
    TeamUtils  teamUtils;

    //突击队详情信息get
    @RequestMapping("/team/detail")
    public ResponseEntity<?> getTeamInfo(@Param("team_id") String team_id) {
        Team team = teamMapper.getTeamById(Integer.parseInt(team_id));
        //处理team
        try {
            JSONObject result = teamUtils.getTeamInfo(team);
            return ResponseEntity.status(200).body(JSONObject.toJSONString(result));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询错误");
        }
    }
}
