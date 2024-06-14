package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface KudosMapper {
    /**
     * 删除指定用户的所有点赞
     * @param user_id 用户的 id
     */
    @Delete("DELETE from kudos where user_id = #{user_id}")
    void deleteKudosByUserId(@Param("user_id") int user_id);
}
