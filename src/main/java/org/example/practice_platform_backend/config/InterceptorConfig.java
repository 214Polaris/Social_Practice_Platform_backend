package org.example.practice_platform_backend.config;
import org.example.practice_platform_backend.Interceptor.JwtInterceptor;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 配置拦截规则
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    private final JwtUtils jwtUtils;

    private final UserMapper userMapper;

    public InterceptorConfig(JwtUtils jwtUtils, UserMapper userMapper) {
        this.jwtUtils = jwtUtils;
        this.userMapper = userMapper;
    }

    @Bean
    public JwtInterceptor jwtInterceptor(JwtUtils jwtUtils, UserMapper userMapper) {
        return new JwtInterceptor(jwtUtils,userMapper);
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor(jwtUtils,userMapper)).addPathPatterns("/**")
                //在这里修改不拦截的路径"/api/login"，如果要放拦截的接口，用addPathPatterns
                .excludePathPatterns("/api/login","/api/register","/**/excel","/**/import");
    }
}
