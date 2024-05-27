package org.example.practice_platform_backend.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class Fruit {
    private int fruit_id;
    private String title;
    private String introduction;
    private String tutor;
    private String position;
    private Date date;
    private int project_id;
    // 成果图片 list
    private String[] mediaImgList;
    // 成果视频 list
    private String[] mediaVideoList;

    public Fruit(){};
}
