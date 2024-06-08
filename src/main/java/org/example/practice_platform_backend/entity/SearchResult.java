package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SearchResult {
    private Integer id;
    private String name;
    private List<String> tags;
    // 涉及人员的 list
    private Map<String,String> list;
    private String image;

    SearchResult() {}

    public Boolean JudgeEmpty(){
        return this.tags == null || this.name == null || this.id == null || this.image == null;
    }
}
