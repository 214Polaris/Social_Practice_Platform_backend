package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.Team;
import org.springframework.data.repository.query.Param;

@Mapper
public interface TeamMapper {
    // 根据团队id获取团队信息
    @Select("select * from college_team where team_number = #{team_id}")
    Team getTeamById(int team_id);

    // 根据团队id获取团队教师id
    @Select("select user_id from college_team_teacher where team_number = #{team_number}")
    int  getTeacherIdByTeamNumber(int team_number);

    // 根据团队id获取团队头像路径
    @Select("select avatar_path from college_team where team_number = #{team_number}")
    String getTeamAvatarPathByTeamNumber(int team_number);

    // 根据成果id获取团队名称
    @Select("select * from college_team where team_number = " +
            " (select team_number from succ_project where project_id = " +
            " (select project_id from fruit_info where fruit_id = #{fruit_id}))")
    Team getTeamByFruitId(int fruit_id);

    // 根据项目id获取团队名称
    @Select("select team_name from college_team where team_number = " +
            "(select team_number from succ_project where project_id = #{project_id})")
    String getTeamNameByProjectId(int project_id);

    // 根据用户id获取团队id
    @Select("select team_number from student where user_id = #{user_id}")
    int getTeamIdByUser(@Param("user_id")int user_id);
}
