package org.example.practice_platform_backend.entity;

import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Comment {
    //评论 id
    @Id
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

    @Getter
    @Setter
    public static class Activity implements Comparable<Activity>{
        private String user_id;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime time;
        private String content;
        private int fruit_id;

        @Override
        public int compareTo(Activity other) {
            return other.getTime().compareTo(this.getTime());
        }
    }

}
