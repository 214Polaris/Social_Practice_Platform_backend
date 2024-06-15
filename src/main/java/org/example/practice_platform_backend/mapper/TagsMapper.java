package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface TagsMapper {

    //查询所有tags信息
    @Select("select * from need_category")
    List<Map<String, String>> searchAllTags();

    // 添加 tags
    @Insert("insert into need_category(category_name) values(#{category_name})")
    void addTags(@Param("category_name") String category_name);

    // 删除 tags
    @Insert("delete from need_category where id = #{id}")
    void deleteTags(int id);

    // 更新 tags
    @Update("update need_category set category_name = #{category_name} where id = #{id}")
    void updateTags(@Param("category_name") String category_name, @Param("id") int id);

    // 通过需求 id 搜索 tags
    @Select("select category_name " +
            "from need_category " +
            "join need_match on need_match.category_id = need_category.id " +
            "where need_match.need_id = #{need_id} " )
    List<String> searchTags(@Param("need_id") int need_id);

    //通过队伍 id 搜索 tags
    @Select("select category_name " +
            "from need_category " +
            "join team_category on team_category.category_id = need_category.id " +
            "where team_category.team_number = #{team_number} " )
    List<String> searchTeamTags(@Param("team_number") int team_number);

    // 根据 fruit_id 搜索 tags
    @Select("SELECT need_category.category_name " +
            "from fruit_info " +
            "join succ_project on succ_project.project_id = fruit_info.project_id " +
            "join community_need on succ_project.need_id = community_need.need_id " +
            "join need_match on community_need.need_id = need_match.need_id " +
            "join need_category on need_match.category_id = need_category.id " +
            "where fruit_info.fruit_id = #{fruit_id} " )
    List<String> searchFruitTags(@Param("fruit_id") int fruit_id);
}
