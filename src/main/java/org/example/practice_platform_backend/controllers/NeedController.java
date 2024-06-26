package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.NeedMapper;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class NeedController {

    @Autowired
    private NeedMapper needMapper;
    @Autowired
    private JwtUtils jwtUtils;

    // 获取单个需求
    @GetMapping("/get/need")
    public ResponseEntity<?> getNeed(@RequestParam("id") int need_id){
        CommunityNeed communityNeed = needMapper.getNeedByNeedId(need_id);
        if(communityNeed == null){
            return ResponseEntity.status(400).body("未找到社区需求");
        }
        List<JSONObject> mediaList = needMapper.getMediaByNeedId(need_id);
        if(mediaList==null){
            return ResponseEntity.status(400).body("未找到社区的图片和视频");
        }
        //返回图片名称
        mediaList.forEach(media->{
            if(!Objects.equals(media.get("type"), "video")){
                String path = media.getAsString("path");
                path = ImageUtils.getRealName(path);
                media.put("path",path);
            }
        });
        communityNeed.setMediaList(mediaList);
        return ResponseEntity.status(200).body(communityNeed);
    }

    // 修改需求
    @PostMapping("/modify/need")
    public ResponseEntity<?> modifyNeed(HttpServletRequest request, @RequestBody CommunityNeed communityNeed){
        //鉴权，确定是当前用户发布的需求
        User user = jwtUtils.getUserInfoFromToken(request.getHeader("token"), User.class);
        if(!Objects.equals(user.getUser_category(), "community")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户不是社区负责人");
        }
        if(!needMapper.selectNeedByUserId(user.getUser_id()).contains(communityNeed.getNeed_id())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("当前用户并未发布过该需求");
        }
        needMapper.modifyNeed(communityNeed);
        return ResponseEntity.ok().body("修改成功");
    }

}
