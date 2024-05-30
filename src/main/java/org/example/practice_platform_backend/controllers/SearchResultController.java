package org.example.practice_platform_backend.controllers;

import org.example.practice_platform_backend.mapper.SearchResultMapper;
import org.example.practice_platform_backend.mapper.TagsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Controller;
import org.example.practice_platform_backend.entity.SearchResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.example.practice_platform_backend.entity.SearchRequest;
import java.util.List;
import java.util.Objects;

@Controller
@EnableAsync
@RequestMapping("/api/")
public class SearchResultController {

    @Autowired
    private TagsMapper tagsMapper;

    @Autowired
    private SearchResultMapper searchResultMapper;

    @GetMapping(value="search")
    public ResponseEntity<?> SearchNeedResult(@RequestParam SearchRequest searchRequest){
        SearchResult searchResult;
        List<String> tags;
        String address = searchRequest.getAddress();
        String text = searchRequest.getText();
        try {
            if (Objects.equals(searchRequest.getCategory(), "示范项目")) {
                searchResult = searchResultMapper.searchFruit(address, text);
                tags = tagsMapper.searchFruitTags(searchResult.getId());
            }
            else if (Objects.equals(searchRequest.getCategory(), "乡镇需求")) {
                searchResult = searchResultMapper.searchNeed(address, text);
                tags = tagsMapper.searchTags(searchResult.getId());
            } else if (Objects.equals(searchRequest.getCategory(), "高校突击队")) {
                searchResult = searchResultMapper.searchTeam(address, text);
                tags = tagsMapper.searchTeamTags(searchResult.getId());
            } else if (Objects.equals(searchRequest.getCategory(), "结对成功墙")) {
                searchResult = searchResultMapper.searchSuccessNeed(address, text);
                tags = tagsMapper.searchTags(searchResult.getId());
            } else {
                return ResponseEntity.status(400).body("搜索类别错误");
            }
            searchResult.setTags(tags);
            return ResponseEntity.ok(searchResult);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("查询出错");
        }
    }
}
