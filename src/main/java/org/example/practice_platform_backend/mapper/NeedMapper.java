package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;

@Mapper
public interface NeedMapper {

    //返回封面 id
    @Select("SELECT media_id FROM need_media WHERE need_id = #{needId} AND type = 'cover'")
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
    int selectNeedByUserId(@Param("user_id") int user_id);
}
