package org.example.practice_platform_backend.entity;

import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Comment {
    //评论 id
    private long comment_id;
    //评论时间
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime comment_time;
    //评论内容
    private String content;
    //对应成果的 id
    private int fruit_id;
    //对应用户的 id
    private int user_id;

    public Comment(){};

}
