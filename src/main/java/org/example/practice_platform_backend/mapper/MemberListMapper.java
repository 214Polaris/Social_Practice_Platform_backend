package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.Map;

@Mapper
public interface MemberListMapper {
    //通过需求 id 搜索社区名字
    @Select("SELECT community.community_name as first_name " +
            "from community_need as need " +
            "JOIN community ON need.community_id = community.community_id " +
            "where need.need_id = #{id} LIMIT 1" )
    Map<String,String> getCommunityNamesByNeedId(@Param("id") int id);

    //通过已经结对 id 搜索社区名字和队伍名字
    @Select("Select team.team_name as first_name, community.community_name as second_name from succ_project " +
            "join community_need as need on need.need_id = succ_project.need_id " +
            "join community on community.community_id = need.community_id " +
            "join college_team as team on team.team_number = succ_project.team_number " +
            "where succ_project.need_id = #{id} LIMIT 1" )
    Map<String,String> getCommunityAndTeamNameByNeedId(@Param("id") int id);

    // 通过 fruit_id 搜索社区名字和队伍名字
    @Select("Select team.team_name as first_name, community.community_name as second_name from fruit_info as fruit " +
            "join succ_project on succ_project.project_id = fruit.project_id " +
            "join community_need as need on need.need_id = succ_project.need_id " +
            "join community on community.community_id = need.community_id " +
            "join college_team as team on team.team_number = succ_project.team_number " +
            "where fruit.fruit_id = #{id} LIMIT 1" )
    Map<String,String> getCommunityAndTeamNameByFruitId(@Param("id") int id);

    //通过高校队伍 id 搜索
    @Select("Select college as first_name from college_team where team_number = #{id} LIMIT 1")
    Map<String,String> getCollegeByTeamNumber(@Param("id") int id);
}
