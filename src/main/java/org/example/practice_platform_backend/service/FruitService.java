package org.example.practice_platform_backend.service;

import org.example.practice_platform_backend.entity.Kudos;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FruitService {

    @Autowired
    private FruitMapper fruitMapper;

    /**
     * 完成点赞事务
     * @param kudos
     */
    @Transactional
    public void addKudos(Kudos kudos) {
        try {
            fruitMapper.insertKudos(kudos);
            fruitMapper.addFruitKudosCount(kudos.getFruit_id());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Transactional
    public void deleteKudos(Kudos kudos) {
        try{
            fruitMapper.deleteKudos(kudos);
            fruitMapper.subFruitKudosCount(kudos.getFruit_id());
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
}

