package org.example.practice_platform_backend.Interceptor;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.alibaba.fastjson.JSON;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.UserMapper;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

public class JwtInterceptor implements HandlerInterceptor {

    UserMapper userMapper;
    JwtUtils jwtUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        if(StringUtils.isBlank(token)){
            directResponse(response,"无 token，请登录");
            return false;
        }
        User user;
        try{
            user = jwtUtils.getUserInfoFromToken(token,User.class);
        } catch (JWTVerificationException j){
            throw new RuntimeException("401");
        }
        user = userMapper.getUserById(user.getUser_id());
        if(user == null){
            directResponse(response,"用户不存在，token 无效");
            return false;
        }
        try{
            jwtUtils.isTokenExpired(token);
        } catch (JWTVerificationException j){
            directResponse(response,"token 过期，请重新登录");
            return false;
        }
        return true;
    }
    // 回应报文结构
    private void directResponse(HttpServletResponse response, String errorMessage) {
        PrintWriter writer = null;
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        try {
            writer = response.getWriter();
            HashMap<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", true);
            errorResponse.put("message", errorMessage);
            errorResponse.put("status", HttpServletResponse.SC_UNAUTHORIZED); // 可以根据需要设置适当的 HTTP 状态码
            // 将 Map 转换为 JSON 字符串并输出
            writer.print(JSON.toJSONString(errorResponse));
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                writer.close();
            }
        }
    }
}