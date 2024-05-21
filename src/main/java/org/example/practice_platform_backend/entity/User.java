package org.example.practice_platform_backend.entity;
import java.util.Objects;

public class User {
    private int user_id;
    private String user_name;
    private String password;
    private int phone_number;
    private String name;
    private String user_category;

    public User(){
    }

    public User(int user_id, String user_name, String password, int phone_number, String name, String user_category) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.password = password;
        this.phone_number = phone_number;
        this.name = name;
        this.user_category = user_category;
    }

    public int getUser_id(){
        return user_id;
    }
    public String getUser_name(){
        return user_name;
    }
    public String getPasswd(){
        return password;
    }

}
