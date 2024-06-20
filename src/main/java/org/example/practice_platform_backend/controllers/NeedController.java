package org.example.practice_platform_backend.controllers;

import org.apache.ibatis.annotations.Param;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.mapper.NeedMapper;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class NeedController {

    @Autowired
    private NeedMapper needMapper;

    // 获取单个需求
    @GetMapping("/get/need")
    public ResponseEntity<?> getNeed(@RequestParam("id") int need_id){
        CommunityNeed communityNeed = needMapper.getNeedByNeedId(need_id);
        if(communityNeed == null){
            return ResponseEntity.status(400).body("未找到社区");
        }
        List<HashMap<String,String>> mediaList = needMapper.getMediaByNeedId(need_id);
        if(mediaList==null){
            return ResponseEntity.status(400).body("未找到社区的图片和视频");
        }
        //返回图片名称
        mediaList.forEach(media->{
            if(!Objects.equals(media.get("type"), "video")){
                String path = media.get("path");
                path = ImageUtils.getRealName(path);
                media.put("path",path);
            }
        });
        communityNeed.setMediaList(mediaList);
        return ResponseEntity.status(200).body(communityNeed);
    }

}
