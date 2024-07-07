package org.example.practice_platform_backend.mapper;
import com.alibaba.fastjson.JSONObject;
import org.example.practice_platform_backend.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Mapper
public interface UserMapper {
    //登录
    @Select("""
            select user_id, username as user_name, phone_number, name, user_category, avatar_path ,gender
            from user where username=#{user_name} and passwd=#{passwd}
            """)
    User login(@Param("user_name")String user_name,@Param("passwd") String passwd);

    //验证密码是否正确
    @Select("select COUNT(*) from user where user_id=#{user_id} AND passwd=#{passwd}")
    int checkUser(@Param("user_id")int user_id,@Param("passwd")String passwd);

    // 注册
    @Insert("insert into user(name, username, passwd, phone_number, user_category, avatar_path,gender) " +
            "values(#{name}, #{user_name}, #{password}, #{phone_number}, #{user_category}, " +
            "'avatar/default_avatar.jpg', #{gender})")
    @Options(useGeneratedKeys = true, keyProperty = "user_id")
    @Transactional
    void register(User user);

    //验证 userid 是否存在并返回个人信息
    @Select("select name,username,phone_number,avatar_path as image,gender from user where user_id=#{userId}")
    HashMap<String,String> getUserById(@Param("userId")int userId);

    // 根据net_id 判断用户是否存在
    @Select("select exists(select * from user where username = #{username})")
    boolean existUser(@Param("username")String username);

    //保存上传的头像图片路径
    @Async
    @Update("UPDATE user SET avatar_path = #{avatar_path} WHERE user_id = #{user_id}")
    void updateAvatar(@Param("user_id")int user_id,@Param("avatar_path") String avatar_path);

    //获取头像
    @Select("select avatar_path from user where user_id = #{user_id}")
    String getAvatar(@Param("user_id")int userId);

    //修改用户信息（mybatis动态修改）
    @Async
    @Update("<script>" +
            "UPDATE user" +
            "<set>" +
            "<if test='name != null'>name = #{name},</if>" +
            "<if test='user_name != null'>username = #{user_name},</if>" +
            "<if test='phone_number != null'>phone_number = #{phone_number},</if>" +
            "<if test='gender != null'>gender = #{gender}</if>" +
            "</set>" +
            "WHERE user_id = #{user_id}" +
            "</script>")
    @Transactional
    void modifyInfo(User user);

    //修改密码
    @Async
    @Update("UPDATE user set passwd=#{passwd} where user_id = #{user_id}")
    void modifyPasswd(String passwd, int user_id);

    /**
     * 根据id 查询姓名
     */
    @Select("select name from user where user_id = #{user_id}")
    String  getNameById(@Param("user_id")int user_id);

    /**
     * 根据id 查询电话号码
     */
    @Select("select phone_number from user where user_id = #{user_id}")
    String  getPhoneById(@Param("user_id")int user_id);

    /**
     * 查询是否已存在姓名
     */
    @Select("select COUNT(*) from user where username = #{user_name}")
    int existUsername(@Param("user_name")String user_name);

    /**
     * 根据学生id 查对应队伍id
     */
    @Select("select team_number from student where user_id = #{user_id}")
    int getTeamIdByStudentId(@Param("user_id")int user_id);

    /**
     * 根据老师id 查对应队伍id
     */
    @Select("select team_number from college_team_teacher where user_id = #{user_id}")
    int  getTeamIdByTeacherId(@Param("user_id")int user_id);

    /**
     * 根据username查询user_id
     */
    @Select("select user_id from user where username = #{username}")
    int getUserIdByUsername(@Param("username")String username);

    /**
     * 获取一些学生相关的信息
     */
    @Select("select name, academy from user where user_id = #{user_id}")
    HashMap<String,String> getStudentInfo(@Param("user_id")int user_id);

    /**
     * user_id 获取 User 信息
     */
    @Select("select user_id,name,username,phone_number,avatar_path,gender from user where user_id=#{user_id}")
    JSONObject getUserByUserId(@Param("user_id")int user_id);

}

