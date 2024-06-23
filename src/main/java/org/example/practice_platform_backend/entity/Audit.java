package org.example.practice_platform_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Audit {
    @Id
    private int audit_id;

    // 不同的审核内容
    private int team_id;
    private int community_id;
    private int need_id;
    private int fruit_id;
    private int project_id;

    private int new_id; // 新的内容对应id
    private int apply_user_id; // 申请人id
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime apply_time;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime last_mod_time; // 上次修改时间，为空说明未完成审核
    private int is_pass;
    private String fail_interpretation;
    private int is_notice;  // 是否已通知申请人


}
