package org.example.practice_platform_backend.controllers;

import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.utils.TeamUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TeamController {

    // 错误日志
    private static final Logger LOGGER = LoggerFactory.getLogger(CommitteeController.class);

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
}
