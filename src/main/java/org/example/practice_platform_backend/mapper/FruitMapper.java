package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Kudos;
import org.springframework.data.repository.query.Param;

@Mapper
public interface FruitMapper {
    // 获取成果详细信息
    @Select("select * from fruit_info where fruit_id=#{fruit_id}")
    Fruit getFruit(int fruit_id);

    /**
     * 获取成果媒体信息
     *
     * @param fruit_id
     * @return
     */
    @Select("select * from fruit_media where fruit_id=#{fruit_id}")
    FruitMedia[] getFruitMedia(int fruit_id);

    /**
     * 新增点赞信息
     */
    @Insert("insert into kudos(fruit_id, user_id, kudos_time) values(#{fruit_id}, #{user_id}, #{kudos_time})")
    int insertKudos(Kudos kudos);

    /**
     * 删除点赞信息
     */
    @Delete("delete from kudos where fruit_id=#{fruit_id} and user_id=#{user_id}")
    int deleteKudos(Kudos kudos);

    /**
     * 增加点赞数
     */
    @Update("update fruit_info set kudos_num=kudos_num+1 where fruit_id=#{fruit_id}")
    int addFruitKudosCount(@Param("fruit_id") int fruit_id);

    /**
     * 减少点赞数
     */
    @Update("update fruit_info set kudos_num=kudos_num-1 where fruit_id=#{fruit_id}")
    int subFruitKudosCount(@Param("fruit_id") int fruit_id);

    /**
     * 新增评论
     */
    @Insert("insert into comment(fruit_id, user_id, comment_time, content) values(#{fruit_id}, #{user_id}, #{comment_time}, #{content})")
    int insertComment(Comment comment);

    /**
     * 新增评论数
     */
    @Update("update fruit_info set comment_num=comment_num+1 where fruit_id=#{fruit_id}")
    int addFruitCommentCount(@Param("fruit_id") int fruit_id);

    /**
     * 删除评论
     */
    @Delete("delete from comment where comment_id=#{comment_id}")
    int deleteComment(Comment comment);

    /**
     * 减少评论数
     */
    @Update("update fruit_info set comment_num=comment_num-1 where fruit_id=#{fruit_id}")
    int subFruitCommentCount(@Param("fruit_id") int fruit_id);

}
