package org.example.practice_platform_backend.entity;

import lombok.*;

@Getter
@Setter
public class Community {
    private String community_id;
    private String community_name;
    private String address;
    private String introduction;
    private String is_pass;
    private String fail_interpretation;
    //负责人的 user_id
    private int user_id;
    public Community(){};
}
