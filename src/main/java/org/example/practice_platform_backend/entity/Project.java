package org.example.practice_platform_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

// 合并需求和结对项目的一个实体类
@Getter
@Setter
public class Project {
    private int need_id;
    private int project_id;
    private String tutor;
    private String related_report;
    private String related_result;
    private int team_number;
    private String title;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime post_time;
    private String introduction;
    private String resource;
    private int is_pass;
    private int is_pair;
    private String fail_interpretation;
    private int user_id;
    private String address;
    private int community_id;

    // 重写equals和hashCode方法,进行去重
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(need_id, project.need_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(need_id);
    }


}
