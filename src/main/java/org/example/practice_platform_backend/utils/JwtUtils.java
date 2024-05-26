package org.example.practice_platform_backend.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {
    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_CREATED = "created";

    //密钥
    @Value("${jwt.secret}")
    private  String secret;
    //有效期
    @Value("${jwt.expiration}")
    private Long expiration;

    /**
     * 根据用户信息生成 token
     * @param userInfo
     * @return
     */
    @SneakyThrows
    public String generateToken(Object userInfo) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, new ObjectMapper().writeValueAsString(userInfo));
        claims.put(CLAIM_KEY_CREATED, new Date());
        return generateToken(claims);
    }

    /**
     * 从 token 中获取用户信息
     * @param token
     * @param valueType
     * @param <T>
     * @return
     */
    @SneakyThrows
    public <T> T getUserInfoFromToken(String token, Class<T> valueType) {
        Claims claims = getClaimsFromToken(token);
        // 将 json字符串解析为 Java 对象
        return new ObjectMapper().readValue(claims.getSubject(), valueType);
    }

    /**
     * 判断 token 是否有效
     * @param token
     * @return
     */
    public boolean isTokenExpired(String token) {
        Date expiredDate = getExpiredDateFromToken(token);
        return expiredDate.after(new Date());
    }

    /**
     * 刷新 token
     * @param token
     * @return
     */
    public String refreshToken(String token) {
        Claims claims = getClaimsFromToken(token);
        claims.put(CLAIM_KEY_CREATED, new Date());
        return generateToken(claims);
    }

    /**
     * 生成 token
     * @param claims
     * @return
     */
    private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(generateKeyByDecoders())
                .compact();
    }

    /**
     * 从 token 中获取
     * @param token
     * @return
     */
    private Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(generateKeyByDecoders())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 生成 token 过期时间
     * @return
     */
    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }

    /**
     * 生成自定义 Key
     * @return
     */
    private SecretKey generateKeyByDecoders() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    /**
     * 从 token 中获取过期时间
     * @param token
     * @return
     */
    private Date getExpiredDateFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getExpiration();
    }

}
