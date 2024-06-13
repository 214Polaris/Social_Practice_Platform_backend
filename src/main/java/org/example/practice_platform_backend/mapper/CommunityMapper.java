package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface CommunityMapper {
    @Select("select community_name from community where community_id = #{community_id}")
    String getCommunityName(int community_id);

    @Select("select avatar_path from community where community_id = #{community_id}")
    String getCommunityAvatarPath(int community_id);
}
