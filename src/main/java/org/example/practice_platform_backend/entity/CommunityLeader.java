package org.example.practice_platform_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CommunityLeader {
    @Id
    private int id;
    private String name;
    private String img;
    private String community;
    private String phone;
}
