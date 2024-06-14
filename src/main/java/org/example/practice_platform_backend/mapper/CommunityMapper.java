package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.Fruit;

@Mapper
public interface CommunityMapper {
    //社区id 查社区名
    @Select("select community_name from community where community_id = #{community_id}")
    String getCommunityName(int community_id);

    //社区id 查社区头像
    @Select("select avatar_path from community where community_id = #{community_id}")
    String getCommunityAvatarPath(int community_id);

    //社区id 查相关成果
    @Select("Select * from fruit_info where project_id = " +
            "(select project_id from succ_project where need_id = " +
            "(select need_id from community_need where community_id = #{community_id}))" +
            "LIMIT 2 OFFSET #{offset}")
    Fruit[] getCommunityFruits(int community_id, int offset);
}
