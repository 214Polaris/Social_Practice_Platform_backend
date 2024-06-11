package org.example.practice_platform_backend.controllers;

import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.TeamMapper;
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
    @RequestMapping("/get_team_info")
    public ResponseEntity<?> getTeamInfo(@Param("team_id") String team_id) {
        Team team = teamMapper.getTeamById(Integer.parseInt(team_id));
        //处理team
        try {

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询错误");
        }
        return null;
    }
}
