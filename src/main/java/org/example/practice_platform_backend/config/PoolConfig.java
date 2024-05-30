package org.example.practice_platform_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.ThreadPoolExecutor;

// 线程池的 config
@Configuration
@EnableAsync
public class PoolConfig {
    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.initialize();
        executor.setCorePoolSize(5); //核心线程数
        executor.setMaxPoolSize(32); //最大线程数
        executor.setQueueCapacity(512); //设置队列容量
        executor.setKeepAliveSeconds(60); //设置线程活跃时间（秒）
        executor.setThreadNamePrefix("ThreadPool-"); //默认线程名称
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());//拒绝策略
        executor.setWaitForTasksToCompleteOnShutdown(true); // 等待所有任务结束后再关闭线程池
        return executor;
    }
}
