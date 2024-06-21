package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.service.CommunityService;
import org.example.practice_platform_backend.service.MapService;
import org.example.practice_platform_backend.service.ProjectService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    // 错误日志
    private static final Logger LOGGER = LoggerFactory.getLogger(CommitteeController.class);

    @Autowired
    private ProjectService projectService;

    @Autowired
    private CommunityService  communityService;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CommunityMapper communityMapper;

    //加载社区
    @GetMapping("")
    public ResponseEntity<?> getCommunity(@RequestParam("id") int community_id){
        Community community = communityService.getCommunity(community_id);
        if(community==null){
            return ResponseEntity.status(400).body("未找到社区");
        }
        return ResponseEntity.ok().body(community);
    }

    //修改社区基本信息
    @PostMapping("/modify")
    public ResponseEntity<?> modifyCommunity(HttpServletRequest request, @RequestBody Community community){
        User user = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class);
        if(!Objects.equals(user.getUser_category(), "community")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是社区负责人");
        }
        if(communityMapper.findCommunityIdByUserId(user.getUser_id())!=community.getCommunity_id()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是该社区的负责人");
        }
        if(community.getAddress()!=null&&!MapService.checkValidAddress(community.getAddress())){
            return ResponseEntity.status(400).body("地址格式不合法");
        }
        communityMapper.modifyCommunity(community);
        return ResponseEntity.ok().body("修改社区成功");
    }

    //需求清单get
    @GetMapping("/need_list")
    public ResponseEntity<?> getNeedList(@Param("gov_id") String gov_id) throws IOException {
        try{
            JSONArray result = projectService.getNeed_list(Integer.parseInt(gov_id));
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    //结对动态（成果）
    @GetMapping("/moment")
    public ResponseEntity<?>  getMoment(@RequestParam("gov_id") String gov_id,
                                        @RequestParam(name = "res_no" ,required = false) String res_no) throws IOException {
        try{
            int offset = res_no.isEmpty() ?0:Integer.parseInt(res_no);
            JSONArray result = communityService.getMoment(Integer.parseInt(gov_id),offset);
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        } catch (Exception e){
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("查询失败");
        }
    }

    @GetMapping("/project_list")
    public ResponseEntity<?> getProjectList(@RequestParam("gov_id") String gov_id) throws IOException {
        try{
            JSONObject result = projectService.getProject_list(Integer.parseInt(gov_id));
            return ResponseEntity.status(200).body(JSON.toJSONString(result));
        }catch (Exception e){
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(400).body("查询失败");
        }
    }
}
