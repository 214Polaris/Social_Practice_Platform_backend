package org.example.practice_platform_backend.mapper;
import org.example.practice_platform_backend.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.transaction.annotation.Transactional;

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

    //保存上传的头像图片路径
    @Update("UPDATE user SET avatar_path = #{avatar_path} WHERE user_id = #{user_id}")
    void updateAvatar(@Param("user_id")int user_id,@Param("avatar_path") String avatar_path);

    //获取头像
    @Select("select avatar_path from user where user_id = #{user_id}")
    String getAvatar(@Param("user_id")int userId);

    //修改用户信息（mybatis动态修改）
    @Update("<script>" +
            "UPDATE user" +
            "<set>" +
            "<if test='name != null'>name = #{name},</if>" +
            "<if test='user_name != null'>username = #{user_name},</if>" +
            "<if test='password != null'>passwd = #{password},</if>" +
            "<if test='phone_number != null'>phone_number = #{phone_number},</if>" +
            "</set>" +
            "WHERE user_id = #{user_id}" +
            "</script>")
    @Transactional
    void modifyInfo(User user);

}
