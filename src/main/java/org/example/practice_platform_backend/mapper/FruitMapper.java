package org.example.practice_platform_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.Fruit;

@Mapper
public interface FruitMapper {
    // 获取成果详细信息
    @Select("select * from fruit_info where fruit_id=#{fruit_id}")
    Fruit getFruit(int fruit_id);


}
