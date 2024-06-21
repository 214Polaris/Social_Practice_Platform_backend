package org.example.practice_platform_backend.controllers;

import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping(value="/get/community/count")
    public ResponseEntity<?> getCommunityCount() {
        List<HashMap<String, Integer>> result = mapService.getCommunityCountsByCity();
        if (result.isEmpty()) {
            return ResponseEntity.status(200).body("未发现社区");
        }
        return ResponseEntity.status(200).body(result);
    }
}
