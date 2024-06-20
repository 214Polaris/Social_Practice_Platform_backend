package org.example.practice_platform_backend.service;

import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class MapService {

    @Autowired
    CommunityMapper communityMapper;

    public List<HashMap<String, Integer>> getCommunityCountsByCity(){
        return communityMapper.getCommunityCountsByAddress();
    }

}
