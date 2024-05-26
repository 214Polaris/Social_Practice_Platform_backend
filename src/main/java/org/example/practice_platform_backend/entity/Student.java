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

    Student(int user_id, String user_name, String password, int phone_number, String name, String user_category,int privilege_level,int team_number){
        super(user_id,user_name,password,phone_number,name,user_category);
        this.privilege_level = privilege_level;
        this.team_number = team_number;
    }

}
