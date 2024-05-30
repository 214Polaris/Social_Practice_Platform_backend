package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchRequest {
    private String text;
    private String address;
    private String category;

    SearchRequest() {}
}
