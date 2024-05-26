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
    @Insert("insert into user(name,username,passwd,phone_number,user_category) " +
            "values(#{name}, #{user_name}, #{password}, #{phone_number}, #{user_category})")
    //设置主键自增长
    @Options(useGeneratedKeys = true, keyProperty = "user_id")
    @Transactional
    void register(User user);

    //验证 userid 是否存在
    @Select("select * from user where user_id=#{userId}")
    User getUserById(@Param("userId")int userId);
}
