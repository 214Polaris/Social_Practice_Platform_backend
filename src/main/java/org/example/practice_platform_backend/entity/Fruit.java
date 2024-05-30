package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class Fruit {
    private int fruit_id;
    private String title;
    private String introduction;  //简介
    private String tutor;  //导师
    private String position; //地点
    private Date date;   // 日期
    private int project_id;
    private int kudos_num; //点赞数
    private int comment_num; //评论数
    // 成果图片 list
    private String[] mediaImgList;
    // 成果视频 list
    private String[] mediaVideoList;

    public Fruit(){};
}
