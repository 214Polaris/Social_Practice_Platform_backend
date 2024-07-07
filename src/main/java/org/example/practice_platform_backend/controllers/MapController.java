package org.example.practice_platform_backend.controllers;

import com.alibaba.fastjson.JSONObject;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.mapper.NeedMapper;
import org.example.practice_platform_backend.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MapController {

    @Autowired
    CommunityMapper communityMapper;
    @Autowired
    private MapService mapService;
    @Autowired
    private NeedMapper needMapper;

    //获取按市统计的社区数量
    @GetMapping(value="/get/community/count")
    public ResponseEntity<?> getCommunityCount() {
        List<HashMap<String, Integer>> result = mapService.getCommunityCountsByCity();
        if (result.isEmpty()) {
            return ResponseEntity.status(200).body("未发现社区");
        }
        return ResponseEntity.status(200).body(result);
    }

    //获取某个市的全部详细的打点的经纬度
    @GetMapping(value = "/get/coordinate")
    public ResponseEntity<?> getCoordinate(@RequestParam("city") String city) {
        List<JSONObject> result = needMapper.getNeedLongitudeAndLatitude(city);
        if (result.isEmpty()) {
            return ResponseEntity.status(200).body("空");
        }
        return ResponseEntity.status(200).body(result);
    }

}
