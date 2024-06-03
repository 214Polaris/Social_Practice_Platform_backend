package org.example.practice_platform_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchResult {
    private String name;
    private String image;
    private List<String> tags;
    private Integer id;

    SearchResult() {}

    public Boolean JudgeEmpty(){
        return this.tags == null || this.name == null || this.id == null || this.image == null;
    }
}
