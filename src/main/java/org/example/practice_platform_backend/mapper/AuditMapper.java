package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.Audit;

import java.util.List;

@Mapper
public interface AuditMapper {

    /**
     * 获取社区的审核列表
     */
    @Select("SELECT * from audit_community where last_mod_time = NULL")
    List<Audit> getCommunityAudit();

    /**
     * 获取队伍的审核列表
     */
    @Select("SELECT * from audit_team where last_mod_time = NULL")
    List<Audit> getTeamAudit();

    /**
     * 获取需求的审核列表
     */
    @Select("SELECT * from audit_need where last_mod_time = NULL")
    List<Audit> getNeedAudit();

    /**
     * 获取成果
     */
    @Select("SELECT * from audit_fruit where last_mod_time = NULL")
    List<Audit> getFruitAudit();
    /**
     * 插入新的结对审核
     */
    @Insert("insert into audit_project (project_id,new_id,apply_user_id,apply_time,is_pass,is_notice)" +
            " values(#{project_id},#{new_id},#{apply_user_id}" +
            ",#{apply_time},#{is_pass},#{is_notice})")
    void newProjAudit(Audit audit);

}
