package org.example.practice_platform_backend.mapper;

import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.SearchResult;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper
public interface NeedMapper {

    // 根据需求 id 获取详细需求
    @Select("select * from community_need " +
            "where is_pass = 1 and need_id = #{need_id} ")
    CommunityNeed getNeedByNeedId(@Param("need_id") int need_id);

    // 根据需求 id 获取详细需求(未审核)
    @Select("select need_id,title, post_time, introduction, resource, community_id, address,longitude,latitude from community_need " +
            "where is_pass = 0 and need_id = #{need_id}")
    CommunityNeed getUnAuditNeedByNeedId(@Param("need_id") int need_id);

    // 根据需求 id 获取图片和视频的 list
    @Select("select media_id, path,type from need_media where need_id = #{need_id}")
    List<JSONObject> getMediaByNeedId(@Param("need_id") int need_id);

    // 获取指定 user_id 发布的所有需求
    @Select("""
            select n.need_id,n.title,n.is_pass, n.post_time, SUBSTRING_INDEX(m.path, '/', -1) AS img from community_need as n
             join community as c on c.community_id = n.community_id
             join need_media as m on m.need_id = n.need_id
             where c.user_id=#{user_id} AND m.type='cover'
            """)
    List<JSONObject> getNeedByUserId(@Param("user_id") int user_id);

    //注册新的需求
    @Insert("INSERT into community_need(title, post_time, introduction, resource, is_pass, is_pair, address, community_id,longitude,latitude) " +
            "value(#{title},#{post_time},#{introduction},#{resource},#{is_pass},#{is_pair},#{address},#{community_id},#{longitude},#{latitude})")
    @Options(useGeneratedKeys = true, keyProperty = "need_id")
    void registerNeed(CommunityNeed communityNeed);

    //返回封面个数
    @Select("SELECT COUNT(*) FROM need_media WHERE need_id = #{needId} AND type = 'cover'")
    int existsNeedCover(@Param("needId") int needId);

    //返回封面的 path
    @Select("SELECT path FROM need_media WHERE need_id = #{needId} AND type = 'cover'")
    String getCoverPathByNeedId(@Param("needId") int needId);

    //检查有多少需求图片
    @Select("SELECT COUNT(*) FROM need_media WHERE need_id = #{needId} AND type != 'video'")
    int existsNeedImage(@Param("needId") int needId);

    // 添加需求视频(非封面)
    @Insert("insert into need_media(path,need_id,type) " +
            "values(#{path},#{need_id},'image')")
    @Options(useGeneratedKeys = true, keyProperty = "media_id")
    void addNeedImage(CommunityNeed.media m);

    // 添加需求视频(封面)
    @Insert("insert into need_media(path,need_id,type) " +
            "values(#{path},#{need_id},'cover'); ")
    @Options(useGeneratedKeys = true, keyProperty = "media_id")
    void addNeedCover(CommunityNeed.media m);

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
            "<if test='post_time != null'>post_time = #{post_time},</if>" +
            "<if test='address!=null'> address= #{address},</if>" +
            "<if test='is_pass!=null'> is_pass= #{is_pass},</if>" +
            "<if test='longitude!=null'> longitude=#{longitude},</if>" +
            "<if test='latitude!=null'> latitude=#{latitude},</if>" +
            "</set>" +
            "WHERE need_id = #{need_id}" +
            "</script>")
    @Transactional
    void modifyNeed(CommunityNeed communityNeed);

    //删除临时需求
    @Delete("DELETE from community_need " +
            "where need_id = #{need_id} ")
    void deleteTempNeed(@Param("need_id") int need_id);

    //删除需求绑定的所有 tags
    @Delete("DELETE FROM need_match WHERE need_id = #{needId}")
    void deleteTagsByNeedId(@Param("needId") int needId);

    //媒体 id 查媒体名字
    @Select("SELECT path from need_media where media_id = #{media_id}")
    String getNeedMediaPathByMediaId(int media_id);

    //删除需求图片
    @Delete("DELETE from need_media where media_id = #{media_id}")
    boolean deleteNeedImage(@Param("media_id") int media_id);

    void batchInsertNeedMatches(@Param("needId") int needId, @Param("tags") List<Integer> tags);

    //查询经纬度
    @Select("select address, longitude,latitude from community_need where address like CONCAT('%', #{address}, '%')")
    List<JSONObject> getNeedLongitudeAndLatitude(@Param("address") String address);

    //获取所有需求
    @Select("""
            SELECT n.need_id as id, n.title as name from community_need as n
            join need_match as m on m.need_id = n.need_id
            join need_category as c on c.id = m.category_id
            where c.id = #{id}
            """)
    List<SearchResult> getNeedByTagId(@Param("id") int id);
}
