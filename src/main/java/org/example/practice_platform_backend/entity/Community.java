package org.example.practice_platform_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
public class Community {
    @Getter
    @Setter
    public static class media{
        Integer media_id;
        String path;
        int community_id;
        String type;
    }
    private int community_id;
    private String community_name;
    private String address;
    private String introduction;
    private String is_pass;
    private String fail_interpretation;
    //负责人的 user_id
    private int user_id;
    private List<media> mediaList;
    private String avatar_path;
    Community(){};
}
