package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchResult {
    private String title;
    private String image;
    private List<String> tags;
    private int id;

    SearchResult() {}
}
