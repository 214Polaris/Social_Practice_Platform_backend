package org.example.practice_platform_backend.mapper;

import net.minidev.json.JSONObject;
import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.Team;
import org.example.practice_platform_backend.entity.User;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.List;
import java.util.Map;

@Mapper
public interface TeamMapper {
    // 根据团队id获取团队信息,包括指导老师
    @Select("""
           select t.team_number,t.introduction,t.academy, t.team_name,
           t.college,t.team_manager,t.member_cnt,t.address,user.name,t.avatar_path
           from college_team as t
           join college_team_teacher as c on t.team_number = c.team_number
           join user on c.user_id = user.user_id
           where t.team_number = 1
           """)
    Team getTeamById(int team_id);

    @Select("select team_name from college_team where team_number = #{team_number}")
    String getTeamNameByTeamNumber(int team_number);

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

    // 查询用户是否有队伍 id
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

    /**
     * 判断该人是否有队伍 学号版
     */
    @Select("select exists(select * from student where user_id =" +
            " (select user_id from user where username = #{username}))")
    boolean isHaveTeamByusername(String username);

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

    // 获取队员信息
    @Select("select name, username, academy, stu.user_id, stu.privilege_level from user " +
            "join student as stu on user.user_id = stu.user_id " +
            "where stu.team_number = #{team_number}")
    List<Map<String, String>> getAllMembers(@Param("team_number")int team_number);

    // 判断队伍是否存在
    @Select("Select exists ( select * from college_team where team_number = #{team_number})")
    boolean isTeamExist(int team_number);
    
    // 添加队员
    @Insert("insert into student(user_id, team_number) values " +
            " (#{user_id}, #{team_number})")
    boolean addMember(@Param("user_id")int user_id, @Param("team_number")int team_number);

    // 判断某人是否在队伍中
    @Select("select exists(select * from student where user_id = #{user_id} and team_number = #{team_number})")
    boolean isTeamMember(@Param("user_id")int user_id, @Param("team_number")int team_number);

    // 删除队员
    @Delete("delete from student where user_id = #{user_id}")
    boolean deleteMember(@Param("user_id")int user_id);

    // 删除多出来的队伍
    @Delete("delete from college_team where team_number = #{team_number}")
    void deleteExtraTeam(@Param("team_number")int team_number);
}
