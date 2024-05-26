package org.example.practice_platform_backend.config;
import org.example.practice_platform_backend.Interceptor.JwtInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 配置拦截规则
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Bean
    public JwtInterceptor jwtInterceptor() {
        return new JwtInterceptor();
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor()).addPathPatterns("/**")
                //在这里修改不拦截的路径"/api/login"，如果要放拦截的接口，用addPathPatterns
                .excludePathPatterns("/api/login","/api/register","/**/excel","/**/import");
    }
}
