package org.example.practice_platform_backend.entity;


import lombok.Getter;
import lombok.Setter;


/**
 * 相关报道
 */
@Getter
@Setter
public class Report {
    private int project_id;
    private String need_id;
    private int report_id;
    private String title;
    private String link;

}
