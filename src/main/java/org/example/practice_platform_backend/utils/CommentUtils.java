package org.example.practice_platform_backend.utils;

import com.alibaba.fastjson2.JSONObject;
import lombok.Setter;
import org.example.practice_platform_backend.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Map;

// 解决文件索引
@Setter
@Component
public class CommentUtils {
    @Autowired
    private ImageUtils imageUtils;

    /**
     * 包装评论
     * @param comment 评论类
     * @param userInfo 包含头像图片路径和用户名的 map
     * @return 包装好后的评论
     */
    public JSONObject getComment(Comment comment,Map<String, String> userInfo) throws IOException {
        // 每个子结果
        JSONObject result = new JSONObject();
        // 先把查出来的东西放到 json 里
        result.put("comment_no", comment.getComment_id());
        result.put("date", comment.getComment_time());
        result.put("content", comment.getContent());
        // 判断是否有头像
        if (userInfo.get("username") != null) {
            result.put("user_name", userInfo.get("username"));
            if (userInfo.get("avatar_path") != null) {
                // 获取头像图片
                String fileString = imageUtils.getFileBytes(userInfo.get("avatar_path"));
                result.put("avatar", fileString);
            }
        }
        return result;
    }
}
