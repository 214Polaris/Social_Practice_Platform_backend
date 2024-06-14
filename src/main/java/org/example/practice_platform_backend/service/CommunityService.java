package org.example.practice_platform_backend.service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Objects;

@Service
public class CommunityService {
    @Autowired
    private CommunityMapper  communityMapper;

    @Autowired
    private FruitMapper  fruitMapper;

    @Autowired
    private ImageUtils  imageUtils;

    @Autowired
    private TeamMapper  teamMapper;

    @Value("${uploadPath}")
    private String uploadPath;

    //根据社区id获取成果
    public JSONArray getMoment(int gov_id, int res_no) throws IOException {
        JSONArray result = new JSONArray();
        Fruit[]  fruits = communityMapper.getCommunityFruits(gov_id, res_no);
        for (Fruit fruit : fruits){
            JSONObject fruitJSON = new JSONObject();
            fruitJSON.put("post_id", String.valueOf(fruit.getFruit_id()));
            fruitJSON.put("post_title", fruit.getTitle());
            fruitJSON.put("post_time", fruit.getDate());
            fruitJSON.put("post_content", fruit.getIntroduction());
            fruitJSON.put("post_location", fruit.getPosition());
            FruitMedia[]  fruitMedia = fruitMapper.getFruitImg(fruit.getFruit_id());
            JSONArray fruit_img = new JSONArray();
            for (FruitMedia fruitMedia1 : fruitMedia){
                fruit_img.add(imageUtils.getThumbnail(uploadPath + fruitMedia1.getPath()));
            }
            fruitJSON.put("post_img", fruit_img);
            Team team = teamMapper.getTeamByFruitId(fruit.getFruit_id());
            fruitJSON.put("team_name",  team.getTeam_name());
            String team_avatar = imageUtils.getThumbnail(uploadPath + team.getAvatar_path());
            fruitJSON.put("team_avatar",team_avatar);
            result.add(fruitJSON);
        }
        return result;
    }
}
