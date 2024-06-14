package org.example.practice_platform_backend.service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.mapper.TagsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TagsService {
    
    @Autowired
    private TagsMapper  tagsMapper;

    /**
     * 获取所有tags
     */
    public JSONObject getAllTags() {

        JSONObject result = new JSONObject();
        JSONArray tagArray = new JSONArray();
        List<Map<String, String>> tags = tagsMapper.searchAllTags();
        for (Map<String, String>  tag : tags){
            JSONObject tagJson =  new JSONObject();
            tagJson.put("id",  tag.get("id"));
            tagJson.put("name",  tag.get("category_name"));
            tagArray.add(tagJson);
        }
        result.put("tags",  tagArray);
        return  result;
    }

    /**
     * 新增 tag 前端判断重名
     */
    public void addTags(String tagName){
        tagsMapper.addTags(tagName);
    }

    /**
     * 删除tag
     */
    public void deleteTags(int id){
        tagsMapper.deleteTags(id);
    }

    /**
     * 修改tag
     */
    public void updateTags(int id, String tagName){
        tagsMapper.updateTags(tagName, id);
    }
}
