package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.Team;

@Mapper
public interface TeamMapper {
    @Select("select * from college_team where team_number = #{team_id}")
    Team getTeamById(int team_id);

    @Select("select user_id from college_team_teacher where team_number = #{team_number}")
    int  getTeacherIdByTeamNumber(int team_number);

    @Select("select avatar_path from college_team where team_number = #{team_number}")
    String getTeamAvatarPathByTeamNumber(int team_number);
}
