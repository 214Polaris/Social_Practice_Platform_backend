package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class CommunityNeed {
    private int need_id;
    private int name;
    private Date post_time;
    private String introduction;
    private String resource;
    private boolean is_pass;
    private boolean is_pair;
    private String address;
    //审核未通过说明
    private String fail_interpretation;
    //关联到哪个社区负责人
    private int user_id;

    public CommunityNeed(){};
}
