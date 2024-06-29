package org.example.practice_platform_backend.mapper;

import net.minidev.json.JSONObject;
import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.Fruit;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface CommunityMapper {

    //注册社区
    @Insert("INSERT into community(community_name,introduction,address,is_pass,user_id,avatar_path) " +
            "values(#{community_name},#{introduction},#{address},0,#{user_id},'community_avatar/default_avatar.jpg')")
    @Options(useGeneratedKeys = true, keyProperty = "community_id")
    @Transactional
    void registerCommunity(Community community);

    //修改社区基本信息（mybatis动态修改）
    @Async
    @Update("<script>" +
            "UPDATE community" +
            "<set>" +
            "<if test='community_name != null'>community_name = #{community_name},</if>" +
            "<if test='introduction != null'>introduction = #{introduction},</if>" +
            "<if test='address != null'>address = #{address},</if>" +
            "</set>" +
            "WHERE community_id = #{community_id}" +
            "</script>")
    @Transactional
    void modifyCommunity(Community community);

    //判断社区是否已经存在，不能重名
    @Select("SELECT count(*) from community where community_name = #{community_name}")
    int findCommunityIdByName(String community_name);

    //社区 id 获取社区基本信息
    @Select("select * from community where community_id=#{community_id}")
    Community getCommunityById(int community_id);

    //获取社区的所有媒体列表
    @Select("select media_id, path,type from community_media where community_id = #{community_id}")
    List<Community.media> getCommunityMedia(int community_id);

    //社区id 查社区名
    @Select("select community_name from community where community_id = #{community_id}")
    String getCommunityName(int community_id);

    //社区id 查社区头像
    @Select("select avatar_path from community where community_id = #{community_id}")
    String getCommunityAvatarPath(int community_id);

    //社区id 查相关成果 审核通过
    @Select("Select * from fruit_info where is_pass = 1 and project_id in " +
            "(select project_id from succ_project where need_id in " +
            "(select need_id from community_need where community_id = #{community_id}))" +
            "LIMIT 2 OFFSET #{offset}")
    Fruit[] getCommunityFruits(int community_id, int offset);

    //负责人 id 查找社区
    @Select("select community_id from community where user_id = #{user_id} AND is_pass = 1")
    Integer findCommunityIdByUserId(@Param("user_id") int user_id);

    // 获取封面 id
    @Select("SELECT COUNT(*) FROM community_media WHERE community_id = #{communityId} AND type = 'cover'")
    int existsCommunityCover(@Param("communityId") int communityId);

    // 检查社区图片是否超过限制
    @Select("SELECT COUNT(*) FROM community_media WHERE community_id = #{communityId} AND type != 'video'")
    int existsCommunityImage(@Param("communityId") int communityId);

    // 添加社区图片（非封面）
    @Insert("insert into community_media(path,community_id,type) " +
            "values(#{path},#{community_id},'image')")
    @Options(useGeneratedKeys = true, keyProperty = "media_id")
    void addCommunityImage(Community.media m);

    // 添加社区图片（封面）
    @Insert("insert into community_media(path,community_id,type) " +
            "values(#{path},#{community_id},'image')")
    @Options(useGeneratedKeys = true, keyProperty = "media_id")
    void addCommunityCover(Community.media m);


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

    //查询是否有相应 user_id 的社区
    @Select("select COUNT(*) from community where user_id = #{user_id}")
    int existsCommunityUser(@Param("user_id") int user_id);

    //统计各个市的社区
    @Select("""
            SELECT
                CONCAT(SUBSTRING_INDEX(address, '市', 1), '市') as city,
                COUNT(*) AS sum
            FROM
                community_need
            JOIN
                succ_project ON community_need.need_id = succ_project.need_id
            GROUP BY
                SUBSTRING_INDEX(address, '市', 1);
            """)
    List<HashMap<String,Integer>> getCommunityCountsByAddress();

    //媒体 id 查媒体名字
    @Select("SELECT path from community_media where media_id = #{media_id}")
    String getCommunityMediaPathByMediaId(int media_id);

    //删除图片
    @Delete("DELETE from community_media where media_id = #{media_id}")
    boolean deleteCommunityImage(@Param("media_id") int media_id);

    //社区 id 查负责人
    @Select("select user_id from community where community_id=#{community_id}")
    Integer getCommunityUserIdByCommunityId(int community_id);

    //查询经纬度
    @Select("select address, longitude,latitude from community where address like CONCAT('%', #{address}, '%')")
    List<JSONObject> getCommunityLongitudeAndLatitude(@Param("address") String address);
}
