package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Team {
    private int team_number;
    private String team_name;
    private String introduction;
    private String academy;
    private String college;
    private int team_manager;
    private int member_cnt;
    private String address;
    private String avatar_path;
    private String teacher;
}

