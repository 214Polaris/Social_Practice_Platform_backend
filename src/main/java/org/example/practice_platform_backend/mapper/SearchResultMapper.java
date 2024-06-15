package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Param;
import org.example.practice_platform_backend.entity.SearchResult;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SearchResultMapper {
    // 搜索需求
    @Select("select need.title as name, need.need_id as id, need_media.path as image " +
            "from community_need as need " +
            "join need_media on need.need_id = need_media.need_id " +
            "where need.address like CONCAT('%', #{location}, '%') " +
            "and (#{text} is null or need.title like CONCAT('%', #{text}, '%')) " +
            "and need_media.type = 'cover'")
    List<SearchResult> searchNeed(@Param("location") String location, @Param("text") String text);

    // 搜索队伍
    @Select("select team_name as name, avatar_path as image, team_number as id " +
            "from college_team " +
            "where address like CONCAT('%', #{location}, '%') " +
            "and (#{text} is null or team_name like CONCAT('%', #{text}, '%'))")
    List<SearchResult> searchTeam(@Param("location") String location, @Param("text") String text);



    // 搜索已结对的需求
    @Select("select need.title as name, need.need_id as id, need_media.path as image " +
            "from community_need as need " +
            "join need_media on need.need_id = need_media.need_id " +
            "join succ_project on need.need_id = succ_project.need_id " +
            "where need.address like CONCAT('%', #{location}, '%') " +
            "and (#{text} is null or need.title like CONCAT('%', #{text}, '%')) " +
            "and need_media.type='cover'")
    List<SearchResult> searchSuccessNeed(@Param("location") String location, @Param("text") String text);


    // 搜索成果
    @Select("SELECT fruit.title as name, media.path as image, fruit.fruit_id as id " +
            "FROM fruit_info AS fruit " +
            "JOIN fruit_media AS media ON fruit.fruit_id = media.fruit_id " +
            "WHERE fruit.position LIKE CONCAT('%', #{location}, '%') " +
            "AND fruit.title LIKE CONCAT('%', #{text}, '%') " +
            "AND media.type = 'cover'")
    List<SearchResult> searchFruit(@Param("location") String location, @Param("text") String text);


}
