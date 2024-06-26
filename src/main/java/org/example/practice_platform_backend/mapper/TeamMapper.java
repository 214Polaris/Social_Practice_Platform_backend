package org.example.practice_platform_backend.mapper;

import net.minidev.json.JSONObject;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
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

    // 根据项目id 查团队id
    @Select("select team_number from succ_project where project_id = #{project_id}")
    Integer getTeamIdByProjectId(int project_id);

    // 根据用户id获取团队id
    @Select("select team_number from student where user_id = #{user_id}")
    Integer getTeamIdByUser(@Param("user_id")int user_id);

    // 获取团队队长 id
    @Select("select team_manager from college_team where team_number = #{team_number}")
    Integer getLeaderIdByTeamNumber(int team_number);

    //获取队伍指导老师的 id
    @Select("""
            select c.user_id, u.name from college_team_teacher as c
            join user as u on u.user_id = c.user_id
            where c.team_number= #{team_number}
            """)
    JSONObject getTeacherInfoByTeamNumber(int team_number);

    /**
     * 插入新队伍 未审核
     */
    @Insert("insert into college_team(team_name, team_manager, introduction, avatar_path, academy, college, address)" +
            " values(#{team_name}, #{team_manager}, #{introduction}, #{avatar_path}, #{academy}, #{college}, #{address})")
    @Options(useGeneratedKeys = true, keyProperty = "team_number")
    void insertTeam(Team team);

    /**
     * 判断该人是否有队伍
     */
    @Select("select exists(select * from student where user_id = #{user_id})")
    boolean isHaveTeam(int user_id);
}
