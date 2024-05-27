package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface CommentMapper {
    // 获取10条评论
    @Select("select content, comment_time from comment " +
            "where comment_id >= #{comment_id}" +
            "ORDER BY comment_time DESC LIMIT 10")
    Comment[] getCommentByCommentId(@Param("comment_id")Long comment_id);
}
