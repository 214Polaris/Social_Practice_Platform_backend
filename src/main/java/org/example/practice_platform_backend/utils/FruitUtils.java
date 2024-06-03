package org.example.practice_platform_backend.utils;

import com.alibaba.fastjson.JSON;
import lombok.Setter;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.mapper.CommentMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Setter
@Component
public class FruitUtils {
    @Autowired
    private ImageUtils imageUtils;

    @Autowired
    private CommentMapper commentMapper;

    /**
     * 返回结果
     * @param fruit
     * @param Comments
     * @param fruitMedias
     * @param unlikeflag
     * @return
     * @throws IOException
     */
    public JSONObject getFruitInfo(Fruit fruit, Comment[] Comments,
                                   FruitMedia[] fruitMedias, boolean unlikeflag) throws IOException {
        JSONObject result =  new JSONObject();
        JSONArray mediaList = new JSONArray();
        JSONArray commentList = new JSONArray();
        result.put("address", fruit.getPosition());
        result.put("date", fruit.getDate());
        result.put("res_info", fruit.getIntroduction());
        result.put("like", fruit.getKudos_num());
        result.put("comment", fruit.getComment_num());
        for(FruitMedia fruitMedia : fruitMedias){
            JSONObject media = new JSONObject();
            if(fruitMedia.getType().equals("图片") ||  fruitMedia.getType().equals("封面")){
                media.put("img_flag", 0);
                media.put("src", imageUtils.getFileBytes(fruitMedia.getPath()));
            }
            else{
                media.put("img_flag", 1);
                media.put("src", imageUtils.getFileBytes(fruitMedia.getPath()));
            }
            mediaList.add(media);
        }
        result.put("imgList", mediaList);
        for(int i=0;i<2;i++){
            JSONObject comment = new JSONObject();
            Map<String, String> user_info = commentMapper.getAvatarPathByUserId(Comments[i].getUser_id());
            comment.put("avatar", imageUtils.getFileBytes(user_info.get("avatar_path")));
            comment.put("date", Comments[i].getComment_time());
            comment.put("user_name", user_info.get("username"));
            comment.put("content", Comments[i].getContent());
            commentList.add(comment);
        }
        result.put("comment_list", commentList);
        result.put("unlike_flag", unlikeflag);
        return result;
    }
}
