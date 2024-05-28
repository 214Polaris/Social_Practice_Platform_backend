package org.example.practice_platform_backend.entity;
import org.apache.ibatis.annotations.Select;
import org.example.practice_platform_backend.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Student extends User {
    private int privilege_level;
    private int team_number;
}
