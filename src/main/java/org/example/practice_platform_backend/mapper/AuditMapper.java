package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.practice_platform_backend.entity.Audit;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface AuditMapper {

    /**
     * 获取社区的审核列表
     */
    @Select("SELECT * from audit_community where last_mod_time is NULL")
    List<Audit> getCommunityAudit();

    /**
     * 获取社区审核列表 相关申请人
     */
    @Select("SELECT * from audit_community where last_mod_time is not NULL and apply_user_id = #{user_id} and is_notice = 0")
    List<Audit> getCommunityAuditByUserId(int user_id);

    /**
     * 更新读取信息
     */
    @Update("update audit_community set is_notice = 1 where last_mod_time is not NULL and apply_user_id = #{user_id} and is_notice = 0")
    void updateCommunityAuditAsRead(int user_id);

    /**
     * 获取队伍的审核列表
     */
    @Select("SELECT * from audit_team where last_mod_time is NULL")
    List<Audit> getTeamAudit();

    /**
     * 获取需求的审核列表
     */
    @Select("SELECT * from audit_need where last_mod_time is NULL")
    List<Audit> getNeedAudit();

    /**
     * 获取需求审核列表 申请人
     */
    @Select("SELECT * from audit_need where last_mod_time is not NULL and apply_user_id = #{user_id} and is_notice = 0")
    List<Audit> getNeedAuditByUserId(int user_id);

    /**
     * 更新读取信息
     */
    @Update("update audit_need set is_notice = 1 where last_mod_time is not NULL and apply_user_id = #{user_id} and is_notice = 0")
    void updateNeedAuditAsRead(int user_id);

    @Insert("insert audit_fruit (fruit_id, new_id, apply_user_id, apply_time) " +
            "values(#{fruit_id}, #{new_id}, #{apply_user_id}, #{apply_time})")
    void newFruitAudit(Audit audit);

    /**
     * 获取成果
     */
    @Select("SELECT * from audit_fruit where last_mod_time is NULL")
    List<Audit> getFruitAudit();



    /**
     * 插入新的结对审核
     */
    @Insert("insert into audit_project (project_id,new_id,apply_user_id,apply_time,is_pass,is_notice)" +
            " values(#{project_id},#{new_id},#{apply_user_id}" +
            ",#{apply_time},#{is_pass},#{is_notice})")
    void newProjAudit(Audit audit);

    /**
     * 获取结对未审核列表 社区
     */
    @Select("select * from audit_project where last_mod_time is NULL and project_id in " +
            "(select project_id from succ_project where need_id in " +
            "(select need_id from community_need where community_id = #{community_id}))")
    List<Audit> getProjAuditByCommunityId(int community_id);

    /**
     * 插入新的队伍审核
     */
    @Insert("insert into audit_team (team_id,apply_user_id,apply_time, new_id, teacher_netid)" +
            " values(#{team_id},#{apply_user_id}" +
            ",#{apply_time}, #{new_id}, #{teacher_netid})")
    void newTeamAudit(Audit audit);

    /**
     * 插入社区审核
     */
    @Insert("insert into audit_community(community_id,new_id,apply_user_id,apply_time) " +
            "values(#{community_id},#{new_id},#{apply_user_id},#{apply_time})")
    void insertCommunityAudit(Audit audit);

    /**
     * 插入社区需求审核
     */
    @Insert("insert into audit_need(need_id,new_id,apply_user_id,apply_time) " +
            "values(#{need_id},#{new_id},#{apply_user_id},#{apply_time})")
    void insertNeedAudit(Audit audit);

    /**
     * 获取社区审核的两个id
     */
    @Select("select community_id,new_id from audit_community where audit_id = #{audit_id}")
    Map<String,Integer> getCommunityIdByAuditId(int audit_id);

    /**
     * 社区审核通过，设置 modify_time 和 is_pass
     */
    @Update("update audit_community set last_mod_time=#{last_mod_time}, is_pass=1,new_id=#{new_id} " +
            "where audit_id = #{audit_id}")
    void auditCommunityPass(LocalDateTime last_mod_time, int audit_id, int new_id);

    /**
     * 社区审核未通过，设置审核原因,modify_time和 is_pass
     */
    @Update("update audit_community set last_mod_time=#{last_mod_time}," +
            "fail_interpretation=#{fail_interpretation},is_pass=1,new_id=#{new_id}")
    void auditCommunityFail(LocalDateTime last_mod_time,String fail_interpretation, int audit_id, int new_id);

    /**
     * 获取成果审核的两个id
     */
    @Select("select fruit_id,new_id from audit_fruit where audit_id = #{audit_id}")
    Map<String,Integer> getFruitIdByAuditId(int audit_id);

    /**
     * 成果审核通过，设置 modify_time 和 is_pass，覆盖原来的 new_id
     */
    @Update("update audit_fruit set last_mod_time=#{last_mod_time}, is_pass=1, new_id=#{new_id} " +
            "where audit_id = #{audit_id}")
    void auditFruitPass(LocalDateTime last_mod_time, int audit_id, int new_id);

    /**
     * 成果审核未通过，设置审核原因,modify_time和 is_pass
     */
    @Update("update audit_fruit set last_mod_time=#{last_mod_time}," +
            "fail_interpretation=#{fail_interpretation},is_pass=1,new_id=#{new_id}")
    void auditFruitFail(LocalDateTime last_mod_time,String fail_interpretation, int audit_id, int new_id);

    /**
     * 需求审核通过，设置 modify_time 和 is_pass,覆盖原来的 new_id
     */
    @Update("update audit_need set last_mod_time=#{last_mod_time}, is_pass=1,new_id=#{new_id} " +
            "where audit_id = #{audit_id}")
    void auditNeedPass(LocalDateTime last_mod_time, int audit_id,int new_id);
    /**
     * 需求审核未通过，设置审核原因,modify_time和 is_pass
     */
    @Update("update audit_need set last_mod_time=#{last_mod_time}," +
            "fail_interpretation=#{fail_interpretation},is_pass=1,new_id=#{new_id}")
    void auditNeedFail(LocalDateTime last_mod_time,String fail_interpretation, int audit_id, int new_id);
    /**
     * 结队审核通过，设置 modify_time 和 is_pass,覆盖原来的 new_id
     */
    @Update("update audit_project set last_mod_time=#{last_mod_time}, is_pass=1,new_id=#{new_id} " +
            "where audit_id = #{audit_id}")
    void auditProjectPass(LocalDateTime last_mod_time, int audit_id,int new_id);
    /**
     * 结队审核未通过，设置审核原因,modify_time和 is_pass
     */
    @Update("update audit_project set last_mod_time=#{last_mod_time}," +
            "fail_interpretation=#{fail_interpretation},is_pass=1,new_id=#{new_id}")
    void auditProjectFail(LocalDateTime last_mod_time,String fail_interpretation, int audit_id, int new_id);
    /**
     * 队伍审核通过，设置 modify_time 和 is_pass,覆盖原来的 new_id
     */
    @Update("update audit_team set last_mod_time=#{last_mod_time}, is_pass=1,new_id=#{new_id} " +
            "where audit_id = #{audit_id}")
    void auditTeamPass(LocalDateTime last_mod_time, int audit_id,int new_id);
    /**
     * 队伍审核未通过，设置审核原因,modify_time和 is_pass
     */
    @Update("update audit_team set last_mod_time=#{last_mod_time}," +
            "fail_interpretation=#{fail_interpretation},is_pass=1,new_id=#{new_id}")
    void auditTeamFail(LocalDateTime last_mod_time,String fail_interpretation, int audit_id, int new_id);
}
