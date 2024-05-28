package org.example.practice_platform_backend.entity;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Comment {
    //评论 id
    private long comment_id;
    //评论时间
    private Date comment_time;
    //评论内容
    private String content;
    //对应成果的 id
    private int fruit_id;
    //对应用户的 id
    private int user_id;

    public Comment(){};

}
