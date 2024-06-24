package org.example.practice_platform_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

//表面上是fruitMedia，实际上是头脑异于常人的通用media
@Getter
@Setter
@Entity
public class FruitMedia {
    @Id
    private int media_id;
    private String path;
    private int fruit_id;
    private String type;
    private int need_id;
}
