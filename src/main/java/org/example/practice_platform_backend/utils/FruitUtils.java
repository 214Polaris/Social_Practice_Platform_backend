package org.example.practice_platform_backend.utils;

import com.alibaba.fastjson.JSON;
import com.google.gson.JsonArray;
import lombok.Setter;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Kudos;
import org.example.practice_platform_backend.mapper.CommentMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.MediaMapper;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Setter
@Component
public class FruitUtils {
    @Autowired
    private ImageUtils imageUtils;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private FruitMapper fruitMapper;

    @Autowired
    private UserMapper  userMapper;

    @Autowired
    private MediaMapper  mediaMapper;

    @Value("${uploadPath}")
//    private String uploadPath = "D:/Desktop/Processing/终极实训/Social_Practice_Platform_backend/uploadfiles";
     private String uploadPath;

    /**
     * 返回成果查询结果
     */
    public JSONObject getFruitInfo(Fruit fruit, Comment[] Comments,
                                   FruitMedia[] fruitMedias, boolean unlikeflag) throws IOException {
        JSONObject result =  new JSONObject();
        JSONArray mediaList = new JSONArray();
        JSONArray commentList = new JSONArray();
        result.put("address", fruit.getPosition());
        result.put("date", fruit.getDate());
        System.out.println(fruit.getDate());
        result.put("res_intro", fruit.getIntroduction());
        result.put("like", String.valueOf(fruit.getKudos_num()));
        result.put("comment", String.valueOf(fruit.getComment_num()));
        for(FruitMedia fruitMedia : fruitMedias){
            JSONObject media = new JSONObject();
            if(fruitMedia.getType().equals("image") ||  fruitMedia.getType().equals("cover")){
                media.put("img_flag", 0);
                String Path = ImageUtils.getRealName(fruitMedia.getPath());
                media.put("src", Path);
            }
            else{
                media.put("img_flag", 1);
                media.put("src",  fruitMedia.getPath());
            }
            mediaList.add(media);
        }
        result.put("imgList", mediaList);
        if(Comments.length == 0){  // 没有相关评论，直接传空list
            result.put("comment_list", null);
            result.put("unlike_flag", unlikeflag);
            return result;
        }
        for(int i=0;i<2;i++){
            JSONObject comment = new JSONObject();
            Map<String, String> user_info = commentMapper.getAvatarPathByUserId(Comments[i].getUser_id());
            comment.put("avatar", imageUtils.getFileBytes(uploadPath + "/" + user_info.get("avatar_path")));
            comment.put("date", Comments[i].getComment_time());
            comment.put("user_name", user_info.get("username"));
            comment.put("content", Comments[i].getContent());
            commentList.add(comment);
        }
        result.put("comment_list", commentList);
        result.put("unlike_flag", unlikeflag);
        return result;
    }

    /**
     * 返回社区相关点赞评论
     */
    public JSONArray getGAndC_com(int user_id, Timestamp timestamp, int offset_cm, int offset_kudos) throws IOException {
        JSONArray result;
        List<Integer> fruitIds = fruitMapper.getFruitIds_com(user_id);
        if(fruitIds.size() == 0){
            return null;
        }
        result = getGAndC(fruitIds, timestamp, offset_cm, offset_kudos);
        return  result;
    }

    /**
     * 返回团队相关点赞评论
     */
    public JSONArray getGAndC_team(int team_id, Timestamp timestamp, int offset_cm, int offset_kudos) throws IOException {
        JSONArray result;
        List<Integer> fruitIds = fruitMapper.getFruitIds_team(team_id);
        if(fruitIds.size() == 0){
            return null;
        }
        result =  getGAndC(fruitIds, timestamp, offset_cm, offset_kudos);
        return result;
    }

    /**
     * 返回点赞评论
     */
    public JSONArray getGAndC(List<Integer> fruitIds, Timestamp timestamp, int offset_cm, int offset_kudos) throws IOException {
        JSONArray result = new JSONArray();
        List<Comment.Activity>  comments = fruitMapper.getCommentsByFruitIds(fruitIds,timestamp, offset_cm);
        List<Comment.Activity>  kudos = fruitMapper.getKudosByFruitIds(fruitIds, timestamp, offset_kudos);
        comments.addAll(kudos);
        Collections.sort(comments);
        for(Comment.Activity activity : comments){
            JSONObject activity_json = new JSONObject();
            int comment_user_id = Integer.parseInt(activity.getUser_id());
            int fruit_id = activity.getFruit_id();
            String user_avatar = uploadPath + userMapper.getAvatar(comment_user_id);
            activity_json.put("avatar", imageUtils.getFileBytes(user_avatar));
            activity_json.put("user_name", userMapper.getNameById(comment_user_id));
            activity_json.put("time", activity.getTime());
            activity_json.put("comment_like", activity.getContent());
            activity_json.put("fruit_id", String.valueOf(fruit_id));
            activity_json.put("fruit_name", fruitMapper.getFruitTitleByFruitId(fruit_id));
            String cover_path = mediaMapper.getFruitCoverPath(fruit_id);
            if(cover_path == null){
                continue;
            }
            activity_json.put("fruit_cover",  cover_path);
            result.add(activity_json);
        }
        return  result;
    }
}
