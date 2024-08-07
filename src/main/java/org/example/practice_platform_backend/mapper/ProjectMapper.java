package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;


// 与需求，结对项目相关
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
     * 查询结对对应需求信息
     */
    @Select("select * from community_need where need_id = " +
            "(select need_id from succ_project where project_id = #{project_id})")
    Project getNeedByProjectId(int project_id);

    /**
     * 查询是否已经结对
     */
    @Select("Select Exists (select 1 from succ_project where need_id = #{need_id})")
    boolean isTeamed(@Param("need_id") int need_id);

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

    /**
     * 新增报道
     */
    @Insert("insert into report (project_id, title, link) values" +
            "(#{project_id}, #{title}, #{link})")
    @Options(useGeneratedKeys = true, keyProperty = "report_id")
    void addReport(Report report);

    /**
     * 查询需求列表
     */
    @Select("select * from community_need where community_id = #{community_id}")
    Project[] getNeedListByCommunityId(int community_id);

    /**
     * 根据需求id 查询对应负责人
     */
    @Select("SELECT u.name, u.phone_number " +
            "FROM user u " +
            "JOIN community c ON u.user_id = c.user_id " +
            "JOIN community_need cn ON c.community_id = cn.community_id " +
            "WHERE cn.need_id = #{need_id}")
    Map<String, String> getManagerByNeed(@Param("need_id")int need_id);

    /**
     * 根据社区id 查询对应的结对项目
     */
    @Select("select * from succ_project where is_pass = 1 and need_id in " +
            "(select need_id from  community_need where community_id = #{community_id})")
    Project[] getProjectListByCommunityId(int community_id);

    /**
     * 根据队伍id 查相关结对需求
     */
    @Select("select * from community_need where need_id in " +
            " (select need_id from succ_project where is_pass = 1 and team_number = #{team_number})")
    List<Project> getPairedNeedByTeam(int team_number);

    /**
     * 根据项目id 查询对应的需求名
     */
    @Select("select title from community_need where need_id = " +
            "(select need_id from succ_project where project_id = #{project_id})")
    String getNeedTitleByProjectId(int project_id);

    /**
     * 查询未结对的需求 offset
     */
    @Select("select * from community_need where is_pair = 0 and is_pass = 1 " +
            " LIMIT 8 OFFSET #{offset}")
    List<Project> getUnpairedNeed(@Param("offset") int offset);

    /**
     * 根据标题 模糊查未结对需求
     */
    @Select("select * from community_need where is_pair = 0 and is_pass = 1 and title like CONCAT('%', #{title}, '%')")
    List<Project> getUnpairedNeedByTitle(@Param("title") String title);

    /**
     * 根据社区名 模糊查未结对需求
     */
    @Select("select * from community_need where is_pair = 0 and is_pass = 1 and community_id in " +
            "(select community_id from community where community_name like CONCAT('%', #{community_name}, '%'))")
    List<Project> getUnpairedNeedByCommunityName(@Param("community_name") String community_name);

    /**
     * 根据标签 模糊查未结对需求
     */
    @Select("select * from community_need where is_pair = 0 and is_pass = 1 and need_id in " +
            "(select need_id from need_match where category_id  in " +
            "(select category_id from need_category where category_name like CONCAT('%', #{tag}, '%')))")
    List<Project> getUnpairedNeedByTag(@Param("tag") String tag);

    /**
     * 新增结对项目，等待审核
     */
    @Insert("insert into succ_project (need_id, tutor, team_number, is_pass) values" +
            "(#{need_id}, #{tutor}, #{team_number}, #{is_pass})")
    @Options(useGeneratedKeys = true, keyProperty = "project_id")
    void addProject(Project project);

    /**
     * 根据队伍 id 查询所有已结队的需求
     */
    @Select("select need_id from succ_project where team_number=#{team_number}")
    List<Integer> getNeedIdByTeamNumber(@Param("team_number") int team_number);

    /**
     * 根据结对id 查封面路径
     */
    @Select("select path from need_media where type = 'cover' and need_id = " +
            " (select need_id from succ_project where project_id = #{project_id})")
    String getCoverPathByProjectId(int project_id);

    /**
     * 获取已结对需求数目
     */
    @Select("select count(*) from succ_project where is_pass = 1")
    int getPairedNeedCount();

    /**
     * 更新结对状态
     */
    @Update("update succ_project set is_pass = #{is_pass} where project_id = #{project_id}")
    void updateProjectStatus(@Param("is_pass")  int is_pass, @Param("project_id") int project_id);

    /**
     * 更新需求结对状态
     */
    @Update("update community_need set is_pair = #{is_pair} where need_id = " +
            "(select need_id from  succ_project where project_id = #{project_id})")
    void updateNeedStatus(@Param("is_pair") int is_pair, @Param("project_id") int project_id);

    /**
     * 根据need_id 查对应的project_id
     */
    @Select("select project_id from succ_project where is_pass = 1 and need_id = #{need_id}")
    int getProjectIdByNeedId(@Param("need_id") int need_id);

    @Select("""
            SELECT n.need_id as id,n.title as name
            from succ_project as p
            join community_need as n on n.need_id = p.need_id
            join need_match as m on m.need_id = n.need_id
            join need_category as c on c.id = m.category_id
            where c.id = #{tag_id}
            """)
    List<SearchResult> getProjectByProjectId(int tag_id);

}
