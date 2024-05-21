package org.example.practice_platform_backend.mapper;
import org.example.practice_platform_backend.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.transaction.annotation.Transactional;
import java.beans.Transient;

@Mapper
public interface UserMapper {
    //登录
    @Select("select * from user where username=#{user_name} and passwd=#{passwd}")
    User login(@Param("user_name")String user_name,@Param("passwd") String passwd);

    //注册
    @Update("insert into user values(default,#{user_name},#{passwd})")
    @Transactional
    void register(User user);
}
