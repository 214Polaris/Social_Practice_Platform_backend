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

    public Comment(long comment_id, Date comment_time, String content, int fruit_id, int user_id) {
        this.comment_id = comment_id;
        this.comment_time = comment_time;
        this.content = content;
        this.fruit_id = fruit_id;
        this.user_id = user_id;
    }
}
