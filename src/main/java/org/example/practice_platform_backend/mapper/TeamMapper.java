package org.example.practice_platform_backend.mapper;

import net.minidev.json.JSONObject;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.entity.User;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    //查询队长的 user_id 是否对应队伍
    @Select("select team_number from college_team where team_manager=#{team_manager}")
    List<Integer> getTeamNumberByTeamManager(int team_manager);

    //修改队伍基本信息
    @Async
    @Update("<script>" +
            "UPDATE college_team" +
            "<set>" +
            "<if test='team_name != null'> team_name = #{team_name},</if>" +
            "<if test='introduction != null'> introduction = #{introduction},</if>" +
            "<if test='academy != null'>academy = #{academy},</if>" +
            "</set>" +
            "WHERE team_number = #{team_number}" +
            "</script>")
    void modifyTeam(Team team);

    //修改队伍指导老师
    @Async
    @Update("<script>" +
            "UPDATE college_team_teacher" +
            "<set>" +
            "<if test='teacher != null'> user_id = #{teacher},</if>" +
            "</set>" +
            "WHERE team_number = #{team_number}" +
            "</script>")
    @Transactional
    void modifyTeamTeacher(Team team);

}
