package org.example.practice_platform_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// debug模式关闭了 spring security 的保护
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class PracticePlatformBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(PracticePlatformBackendApplication.class, args);
    }
}
