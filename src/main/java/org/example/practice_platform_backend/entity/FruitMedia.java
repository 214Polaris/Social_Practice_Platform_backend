package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FruitMedia {
    private int media_id;
    private String path;
    private int fruit_id;
    private String type;
}
