package org.example.practice_platform_backend.service;

import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class MapService {

    @Autowired
    CommunityMapper communityMapper;

    /**
     * 根据城市获取社区在地图上的分布
     * @return 分布的 list
     */
    public List<HashMap<String, Integer>> getCommunityCountsByCity(){
        return communityMapper.getCommunityCountsByAddress();
    }

    /**
     * 校验传过来的地址是否合法
     * @param address 传过来的地址
     * @return 结果 Boolean
     */
    public static Boolean checkValidAddress(String address){
        // 正则表达式，匹配以“xx省xx市”开头的字符串
        // 这里假设“省”和“市”之间的名称为汉字，且长度为1到多个
        String regex = "^[\\u4E00-\\u9FA5]{1,}省[\\u4E00-\\u9FA5]{1,}市";

        // 使用String的matches方法检查字符串是否符合正则表达式
        return address != null && address.matches(regex);
    }

}
