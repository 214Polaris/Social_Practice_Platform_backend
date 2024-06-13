package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.entity.Report;

@Mapper
public interface ProjectMapper {
    /**
     * 查询结对项目信息(5个）
     */
    @Select("select * from succ_project where team_number = #{team_number} limit 5")
    Project[]  getProjectsByTeamNumber(int team_number);

    /**
     * 查询结对项目信息
     */
    @Select("select * from succ_project where project_id = #{project_id}")
    Project  getProjectById(int project_id);
    /**
     * 查询需求信息
     */
    @Select("select * from community_need where need_id = #{need_id}")
    Project getNeedByNeedId(int need_id);

    /**
     * 查询近期4个成果
     */
    @Select("select * from fruit_info where project_id = #{project_id} order by fruit_id desc limit 4")
    Fruit[] getFruitByProjectId(int project_id);

    /**
     * 查询相关报道
     */

    @Select("select * from report where project_id = #{project_id}")
    Report[] getReportByProjectId(int project_id);
}
