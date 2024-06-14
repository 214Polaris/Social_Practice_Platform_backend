package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;

@Mapper
public interface VideoMapper {

    // 检查是否存在社区视频
    @Select("SELECT path FROM community_media WHERE community_id = #{communityId} AND type = 'video'")
    String existsCommunityVideo(@Param("communityId") int communityId);

    // 添加社区视频
    @Insert("insert into community_media(path,community_id,type) " +
            "values(#{path},#{community_id},'video')")
    boolean addCommunityVideo(@Param("path") String path, @Param("community_id") int community_id);

    // 删除社区视频
    @Delete("DELETE from community_media where community_id = #{id} and type = 'video'")
    boolean deleteCommunityVideo(@Param("id") int id);

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

    //检查是否存在成果视频
    @Select("SELECT path FROM fruit_media WHERE fruit_id = #{fruitId} AND type = 'video'")
    String existsFruitVideo(@Param("fruitId") int fruitId);

    // 添加成果视频
    @Insert("insert into fruit_media(path,fruit_id,type) " +
            "values(#{path},#{fruit_id},'video')")
    boolean addFruitVideo(@Param("path") String path, @Param("fruit_id") int fruit_id);

    // 删除成果视频
    @Delete("DELETE from fruit_media where fruit_id = #{id} and type = 'video'")
    boolean deleteFruitVideo(@Param("id") int id);


}
