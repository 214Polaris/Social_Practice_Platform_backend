package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Param;
import org.example.practice_platform_backend.entity.CommunityNeed;
import org.example.practice_platform_backend.entity.SearchResult;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Mapper
public interface SearchResultMapper {
    // 搜索需求
    @Select("select need.title,need.need_id,need_media.path " +
            "from community_need as need " +
            "join need_media on need.need_id = need_media.need_id " +
            "where need.address like #{location} " +
            "and need.title like #{text} " +
            "and need_media.type='cover'")
    SearchResult searchNeed(@Param("location") String location, @Param("text") String text);

    // 搜索队伍
    @Select("select team_name,avatar_path,team_number from college_team where address like #{location} " +
            "and team_name like #{text}")
    SearchResult searchTeam(@Param("location") String location, @Param("text") String text);


    // 搜索已结对的需求
    @Select("select need.title,need.need_id,need_media.path " +
            "from community_need as need " +
            "join need_media on need.need_id = need_media.need_id " +
            "join succ_project on need.need_id = succ_project.need_id" +
            "where need.address like #{location} " +
            "and need.title like #{text} " +
            "and need_media.type='cover'")
    SearchResult searchSuccessNeed(@Param("location") String location,
                                    @Param("text") String text);

    // 搜索成果
    @Select("SELECT fruit.title,media.path,fruit.fruit_id " +
            "from fruit_info as fruit " +
            "join fruit_media as media on fruit.fruit_id = media.fruit_id" +
            "where fruit.position like #{location} " +
            "and fruit.title like #{text} " +
            "and media.type='cover'")
    SearchResult searchFruit(@Param("location") String location, @Param("text") String text);


}
