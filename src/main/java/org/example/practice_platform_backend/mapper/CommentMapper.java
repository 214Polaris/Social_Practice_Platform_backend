package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.scheduling.annotation.Async;

import java.util.Map;

@Mapper
public interface CommentMapper {
    //获取 10 条评论，如果没传入 comment_id 就传入最晚评论的十条，记得要转义小于号
    @Select("<script>" +
            "SELECT comment_id, content, comment_time,user_id FROM comment " +
            "<where> " +
            "fruit_id = #{fruit_id} " +
            "<if test='comment_id != null'>" +
            "AND comment_id &lt; #{comment_id} " +
            "</if>" +
            "</where> " +
            "ORDER BY comment_id DESC " +
            "LIMIT 5" +
            "</script>")
    Comment[] getCommentByCommentId(@Param("fruit_id") int fruit_id, @Param("comment_id") Integer comment_id);

    //获取评论人的头像
    @Select("select avatar_path,username from user where user_id = #{user_id}")
    Map<String,String> getAvatarPathByUserId(@Param("user_id") int user_id);

    /**
     * 插入评论
     * @param comment
     */
    @Insert("insert into comment(fruit_id,content,comment_time,user_id) values(#{fruit_id},#{content},#{comment_time},#{user_id})")
    @Options(useGeneratedKeys = true, keyProperty = "comment_id")
    void insertComment(Comment comment);

    /**
     * 删除指定用户的所有评论
     * @param user_id 用户的 id
     */
    @Delete("DELETE from comment where user_id = #{user_id}")
    void deleteCommentByUserId(@Param("user_id") int user_id);

}
