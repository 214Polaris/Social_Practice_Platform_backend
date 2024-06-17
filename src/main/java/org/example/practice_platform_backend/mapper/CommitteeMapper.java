package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.practice_platform_backend.entity.CommunityLeader;

import java.util.List;

@Mapper
public interface CommitteeMapper {
    // 查询 user_id 对应的 user_category
    @Select("select user_category from user where user_id = #{user_id}")
    String getUserCategory(Integer user_id);
    // 查询所有社区负责人的信息
    @Select("SELECT user.user_id as id,user.name,user.phone_number as phone," +
            "user.avatar_path as img,community.community_name as community from user " +
            "left join community on user.user_id = community.user_id " +
            "where user.user_category = 'community'")
    List<CommunityLeader> getCommunityLeader();
    // 修改社区负责人
    @Update("UPDATE community SET user_id = #{new_id} where user_id = #{origin_id}")
    Boolean updateCommunityLeader(int origin_id, int new_id);
    // 删除空的社区负责人
    @Delete("DELETE from user where user_id = #{user_id}")
    Boolean deleteCommunityLeader(int user_id);
}
