package org.example.practice_platform_backend.service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.*;
import org.example.practice_platform_backend.mapper.AuditMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.FruitUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.Timestamp;

@Service
public class FruitService {

    @Autowired
    private FruitMapper fruitMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private FruitUtils  fruitUtils;

    @Autowired
    private AuditMapper  auditMapper;

    private final String default_fruit_cover_path = "fruit_images/default.png";

    /**
     * 完成点赞事务
     */
    @Transactional
    public void addKudos(Kudos kudos) {
        boolean flag = fruitMapper.getKudos(kudos);
        try {
            if(!flag){
                fruitMapper.insertKudos(kudos);
                fruitMapper.addFruitKudosCount(kudos.getFruit_id());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Transactional
    public void deleteKudos(Kudos kudos) {
        boolean flag = fruitMapper.getKudos(kudos);
        try{
            if(flag) {
                fruitMapper.deleteKudos(kudos);
                fruitMapper.subFruitKudosCount(kudos.getFruit_id());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void addComment(Comment comment){
        try{
            fruitMapper.insertComment(comment);
            fruitMapper.addFruitCommentCount(comment.getFruit_id());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void deleteComment(Comment comment){
        try{
            fruitMapper.deleteComment(comment);
            fruitMapper.subFruitCommentCount(comment.getFruit_id());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取互动消息
     */
    public JSONObject getInteraction(int user_id, String user_category, Timestamp timestamp, int offset_cm, int offset_kudos) throws IOException {
        JSONObject result = new JSONObject();
        JSONArray list = new JSONArray();
        // 判断用户类型
        // 社区负责人，返回该社区发布的需求成果相关的评论和点赞；
        if(user_category.equals("community")){
            list = fruitUtils.getGAndC_com(user_id, timestamp, offset_cm, offset_kudos);
        } else if (user_category.equals("student") || user_category.equals("teacher")){
            int team_id;
            if(user_category.equals("student")){
                team_id = userMapper.getTeamIdByStudentId(user_id);
            }else {
                team_id = userMapper.getTeamIdByTeacherId(user_id);
            }
            list = fruitUtils.getGAndC_team(team_id, timestamp, offset_cm, offset_kudos);
        }
        result.put("interaction_list",list);
        return result;
    }

    /**
     * 插入 成果
     */
    public int postFruit(Fruit fruit, int user_id){
        insertFruit(fruit, user_id);
        return fruit.getFruit_id();
    }

    @Transactional
    public void insertFruit(Fruit fruit, int user_id){
        fruitMapper.insertFruit(fruit);
        FruitMedia  fruitMedia = new FruitMedia();
        fruitMedia.setFruit_id(fruit.getFruit_id());
        fruitMedia.setPath(default_fruit_cover_path);
        fruitMedia.setType("cover");
        fruitMapper.addFruitCover(fruitMedia);
        Audit audit = new Audit();
        audit.setFruit_id(fruit.getFruit_id());
        audit.setNew_id(fruit.getFruit_id());
        audit.setApply_user_id(user_id);
        audit.setApply_time(fruit.getDate());
        auditMapper.newFruitAudit(audit);
    }
}

