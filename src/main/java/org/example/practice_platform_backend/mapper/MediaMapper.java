package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.FruitMedia;

@Mapper
public interface MediaMapper {

    /**
     * need_media表中找到need_id为1且Type为cover的path字段，
     * 如果不存在则返回need_id为1的第一个Type为img的path字段
     * @param needId
     * @return
     */
    @Select("SELECT path " +
            "FROM ( " +
            "  SELECT path, media_id, 1 AS sort_order " +
            "  FROM need_media " +
            "  WHERE need_id = #{needId} AND type = 'cover' " +
            "  UNION " +
            "  SELECT path, media_id, 2 AS sort_order " +
            "  FROM need_media " +
            "  WHERE need_id = #{needId} AND type = 'img' " +
            ") AS combined " +
            "ORDER BY sort_order ASC, media_id ASC " +
            "LIMIT 1")
    String getCoverPath(int needId);

    /**
     * 根据need_id查找所有的media
     * @param needId
     * @return
     */
    @Select("Select * from need_media where need_id = #{needId}")
    FruitMedia[] getMediaByNeedId(int needId);
}
