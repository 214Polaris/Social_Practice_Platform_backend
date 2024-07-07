package org.example.practice_platform_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import com.alibaba.fastjson.JSONObject;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CommunityNeed {
    private int need_id;
    private String title;
    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    private Date post_time;
    private String introduction;
    private String resource;
    private int is_pass;
    private int is_pair;
    private String address;
    //审核未通过说明
    private String fail_interpretation;
    //关联到哪个社区
    private int community_id;
    private List<JSONObject> mediaList;
    private Float latitude;
    private Float longitude;
    private List<String> tags;
    private List<Integer> tags_id;
    @Getter
    @Setter
    public static class media{
        int media_id;
        String path;
        int need_id;
    }

    public CommunityNeed(){};
}
