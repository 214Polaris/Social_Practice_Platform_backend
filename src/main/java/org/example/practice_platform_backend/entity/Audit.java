package org.example.practice_platform_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Comparator;

@Getter
@Setter
@Entity
public class Audit implements Comparable<Audit>{
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

    private String teacher_netid; // 队伍对应指导老师老师的net_id

    /**
     * 比较两个审核内容的更新时间 优先比较last_mod_time，若为空则比较apply_time
     */
    private static final Comparator<Audit> COMPARATOR =
            Comparator.comparing((Audit a) -> a.last_mod_time, Comparator.nullsFirst(LocalDateTime::compareTo))
                    .thenComparing(a -> a.apply_time, Comparator.nullsFirst(LocalDateTime::compareTo));
    @Override
    public int compareTo(Audit o) {
        return COMPARATOR.compare(this, o);
    }

    // 社区审核列表
    @Getter
    @Setter
    public static class CommunityAudit{
        private int audit_id;
        private int id;
        private String name;
        private String img;
    }

    // 高校队伍审核列表
    @Setter
    @Getter
    public static class TeamAudit{
        private int audit_id;
        private int id;
        private String academy_name;
        private String team_name;
        private String img;
    }

    // 需求审核列表
    @Setter
    @Getter
    public static class NeedAudit{
        private int audit_id;
        private int id;
        private String title;
        private int community_id;
        private String community_name;
        private String img;
    }

    //成果审核列表
    @Setter
    @Getter
    public static class FruitAudit{
        private int audit_id;
        private int id;
        private String title;
        private String img;
    }

}
