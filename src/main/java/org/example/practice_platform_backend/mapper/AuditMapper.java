package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.example.practice_platform_backend.entity.Audit;

@Mapper
public interface AuditMapper {
    /**
     * 插入新的结对审核
     */
    @Insert("insert into audit_project (project_id,new_id,apply_user_id,apply_time,is_pass,is_notice)" +
            " values(#{project_id},#{new_id},#{apply_user_id}" +
            ",#{apply_time},#{is_pass},#{is_notice})")
    void newProjAudit(Audit audit);

}
