package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.User;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface NeedMapper {

    // 根据需求 id 获取详细需求
    @Select("select title, post_time, introduction, resource from community_need " +
            "where is_pass = 1 and need_id = #{need_id}")
    CommunityNeed getNeedByNeedId(@Param("need_id") int need_id);

    // 根据需求 id 获取图片和视频的 list
    @Select("select media_id, path,type from need_media where need_id = #{need_id}")
    List<HashMap<String,String>> getMediaByNeedId(@Param("need_id") int need_id);

    //注册新的需求
    @Insert("INSERT into community_need(title, post_time, introduction, resource, is_pass, is_pair, address, community_id)\n" +
            "value(#{title},#{post_time},#{introduction},#{resource},#{is_pass},#{is_pair},#{address},#{community_id})")
    Boolean registerNeed(CommunityNeed communityNeed);

    //返回封面 id
    @Select("SELECT COUNT(*) FROM need_media WHERE need_id = #{needId} AND type = 'cover'")
    int existsNeedCover(@Param("needId") int needId);

    //检查有多少需求图片
    @Select("SELECT COUNT(*) FROM need_media WHERE need_id = #{needId} AND type != 'video'")
    int existsNeedImage(@Param("needId") int needId);

    // 添加需求视频(非封面)
    @Insert("insert into need_media(path,need_id,type) " +
            "values(#{path},#{need_id},'image')")
    boolean addNeedImage(@Param("path") String path, @Param("need_id") int need_id);

    // 添加需求视频(封面)
    @Insert("insert into need_media(path,need_id,type) " +
            "values(#{path},#{need_id},'cover')")
    boolean addNeedCover(@Param("path") String path, @Param("need_id") int need_id);

    //检查是否存在需求视频
    @Select("SELECT path FROM need_media WHERE need_id = #{needId} AND type = 'video'")
    String existsNeedVideo(@Param("needId") int needId);

    // 添加需求视频
    @Insert("insert into need_media(path,need_id,type) " +
            "values(#{path},#{need_id},'video')")
    boolean addNeedVideo(@Param("path") String path, @Param("need_id") int need_id);

    // 删除需求视频
    @Delete("DELETE from need_media where need_id = #{id} and type = 'video'")
    boolean deleteNeedVideo(@Param("id") int id);

    // 根据 user_id 查发布的需求
    @Select("select n.need_id from community_need as n " +
            "join community as c on n.community_id = c.community_id " +
            "where c.user_id = #{user_id}")
    List<Integer> selectNeedByUserId(@Param("user_id") int user_id);

    //修改社区需求基本信息（mybatis动态修改）
    @Async
    @Update("<script>" +
            "UPDATE community_need" +
            "<set>" +
            "<if test='title != null'>title = #{title},</if>" +
            "<if test='introduction != null'>introduction = #{introduction},</if>" +
            "<if test='resource != null'>resource = #{resource},</if>" +
            "</set>" +
            "WHERE need_id = #{need_id}" +
            "</script>")
    @Transactional
    void modifyNeed(CommunityNeed communityNeed);

    //媒体 id 查媒体名字
    @Select("SELECT path from need_media where media_id = #{media_id}")
    String getNeedMediaPathByMediaId(int media_id);

    //删除需求图片
    @Delete("DELETE from need_media where media_id = #{media_id}")
    boolean deleteNeedImage(@Param("media_id") int media_id);
}
