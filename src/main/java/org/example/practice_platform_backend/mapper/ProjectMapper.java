package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.Project;

@Mapper
public interface ProjectMapper {
    /**
     * 查询结对项目信息
     */
    @Select("select * from succ_project where team_number = #{team_number} limit 5")
    Project[]  getProjectsByTeamNumber(int team_number);

    /**
     * 查询需求信息
     */
    @Select("select * from community_need where need_id = #{need_id}")
    Project getProjectByNeedId(int need_id);
}
