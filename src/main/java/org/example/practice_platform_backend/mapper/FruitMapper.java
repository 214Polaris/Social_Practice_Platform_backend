package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.*;
import org.example.practice_platform_backend.entity.Comment;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Kudos;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Mapper
public interface FruitMapper {
    // 获取成果详细信息
    @Select("select * from fruit_info where fruit_id=#{fruit_id}")
    Fruit getFruit(int fruit_id);

    /**
     * 获取成果媒体信息
     */
    @Select("select * from fruit_media where fruit_id=#{fruit_id}")
    FruitMedia[] getFruitMedia(int fruit_id);


    /**
     * 获取成果媒体信息,限图片
     */
    @Select("select * from fruit_media where fruit_id=#{fruit_id} and (type='image' or type='cover')")
    FruitMedia[] getFruitImg(int fruit_id);

    /**
     * 判断是否存在该条点赞信息
     */
    @Select("SELECT EXISTS (SELECT 1 FROM kudos WHERE fruit_id = #{fruit_id} AND user_id = #{user_id})")
    boolean getKudos(Kudos kudos);

    /**
     * 新增点赞信息
     */
    @Insert("insert into kudos(fruit_id, user_id, kudos_time) values(#{fruit_id}, #{user_id}, #{kudos_time})")
    int insertKudos(Kudos kudos);

    /**
     * 删除点赞信息
     */
    @Delete("delete from kudos where fruit_id=#{fruit_id} and user_id=#{user_id}")
    int deleteKudos(Kudos kudos);

    /**
     * 增加点赞数
     */
    @Update("update fruit_info set kudos_num=kudos_num+1 where fruit_id=#{fruit_id}")
    int addFruitKudosCount(@Param("fruit_id") int fruit_id);

    /**
     * 减少点赞数
     */
    @Update("update fruit_info set kudos_num=kudos_num-1 where fruit_id=#{fruit_id}")
    int subFruitKudosCount(@Param("fruit_id") int fruit_id);

    /**
     * 新增评论
     */
    @Insert("insert into comment(fruit_id, user_id, comment_time, content) values(#{fruit_id}, #{user_id}, #{comment_time}, #{content})")
    int insertComment(Comment comment);

    /**
     * 新增评论数
     */
    @Update("update fruit_info set comment_num=comment_num+1 where fruit_id=#{fruit_id}")
    int addFruitCommentCount(@Param("fruit_id") int fruit_id);

    /**
     * 删除评论
     */
    @Delete("delete from comment where comment_id=#{comment_id}")
    int deleteComment(Comment comment);

    /**
     * 减少评论数
     */
    @Update("update fruit_info set comment_num=comment_num-1 where fruit_id=#{fruit_id}")
    int subFruitCommentCount(@Param("fruit_id") int fruit_id);

    /**
     * 查询学生发布的成果，返回 id
     */
    @Select("SELECT f.fruit_id from fruit_info as f " +
            "join succ_project as s on f.project_id=s.project_id " +
            "join student as stu on stu.team_number=s.team_number " +
            "where stu.user_id=#{user_id}")
    List<Integer> getFruitIdByUserId(@Param("user_id") int user_id);

    //获取封面 id
    @Select("SELECT COUNT(*) FROM fruit_media WHERE fruit_id = #{fruitId} AND type = 'cover'")
    int existsFruitCover(@Param("fruitId") int fruitId);

    //检查存在有多少张成果图片
    @Select("SELECT COUNT(*) FROM fruit_media WHERE fruit_id = #{fruitId} AND type != 'video'")
    int existsFruitImage(@org.apache.ibatis.annotations.Param("fruitId") int fruitId);

    // 添加成果图片(非封面)
    @Insert("insert into fruit_media(path,fruit_id,type) " +
            "values(#{path},#{fruit_id},'image')")
    boolean addFruitImage(@org.apache.ibatis.annotations.Param("path") String path, @org.apache.ibatis.annotations.Param("fruit_id") int fruit_id);

    // 添加成果图片(封面)
    @Insert("insert into fruit_media(path,fruit_id,type) " +
            "values(#{path},#{fruit_id},'cover')")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Integer addFruitCover(@org.apache.ibatis.annotations.Param("path") String path, @org.apache.ibatis.annotations.Param("fruit_id") int fruit_id);


    //检查是否存在成果视频
    @Select("SELECT path FROM fruit_media WHERE fruit_id = #{fruitId} AND type = 'video'")
    String existsFruitVideo(@org.apache.ibatis.annotations.Param("fruitId") int fruitId);

    // 添加成果视频
    @Insert("insert into fruit_media(path,fruit_id,type) " +
            "values(#{path},#{fruit_id},'video')")
    boolean addFruitVideo(@org.apache.ibatis.annotations.Param("path") String path, @org.apache.ibatis.annotations.Param("fruit_id") int fruit_id);

    // 删除成果视频
    @Delete("DELETE from fruit_media where fruit_id = #{id} and type = 'video'")
    boolean deleteFruitVideo(@org.apache.ibatis.annotations.Param("id") int id);

    //媒体 id 查媒体名字
    @Select("SELECT path from fruit_media where media_id = #{media_id}")
    String getFruitMediaPathByMediaId(int media_id);

    //删除图片
    @Delete("DELETE from fruit_media where media_id = #{media_id}")
    boolean deleteFruitImage(@Param("media_id") int media_id);

}
