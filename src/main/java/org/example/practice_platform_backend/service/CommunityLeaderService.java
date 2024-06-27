package org.example.practice_platform_backend.service;

import jakarta.servlet.http.HttpServletRequest;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.example.practice_platform_backend.entity.Community;
import org.example.practice_platform_backend.entity.CommunityLeader;
import org.example.practice_platform_backend.entity.User;
import org.example.practice_platform_backend.mapper.*;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.example.practice_platform_backend.utils.RandomGenerateUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Objects;

@Service
public class CommunityLeaderService {

    // 错误日志
    private static final Logger LOGGER = LoggerFactory.getLogger(CommunityLeaderService.class);

    @Autowired
    private CommitteeMapper committeeMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ImageUtils imageUtils;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RandomGenerateUtils randomGenerateUtils;

    @Value("${uploadPath}")
    private String uploadPath;
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private KudosMapper kudosMapper;
    @Autowired
    private CommunityMapper communityMapper;
    @Autowired
    private AuditService auditService;

    public boolean checkIdentity(HttpServletRequest request) {
        String user_category = jwtUtils.getUserInfoFromToken(request.getHeader("token"),User.class).getUser_category();
        if(user_category==null||user_category.isEmpty()){
            return false;
        }
        return Objects.equals(user_category, "committee");
    }

    /**
     * 判断是否是社区身份
     * @param request request
     */
    public boolean checkLeader(HttpServletRequest request) {
        String user_category = jwtUtils.getUserInfoFromToken(request.getHeader("token"),User.class).getUser_category();
        if(user_category==null||user_category.isEmpty()){
            return false;
        }
        return Objects.equals(user_category, "community");
    }

    // 获取所有社区负责人
    public List<CommunityLeader> getCommunityLeaders(){
        List<CommunityLeader> leaders = committeeMapper.getCommunityLeader();
        return leaders.stream().peek(leader -> {
            try {
                if(leader.getCommunity() == null || leader.getCommunity().isEmpty()){
                    leader.setCommunity("暂未添加社区");
                }
                String path = uploadPath + leader.getImg();
                leader.setImg(imageUtils.getFileBytes(path));
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
        }).collect(Collectors.toList());
    }

    /**
     * 修改社区
     * @param origin_community 修改前的社区
     * @param community 修改后的社区
     */
    @Transactional
    public void modifyCommunity(Community origin_community, Community community){
        // 这里 origin_community 的 id 变了
        auditService.applyCommunityChanges(origin_community,community);
        communityMapper.registerCommunity(origin_community);
        // 存下新的 id
        int new_id = origin_community.getCommunity_id();
        // 将修改的 id 更新为最新的 id
        origin_community.setCommunity_id(community.getCommunity_id());
        auditService.insertCommunity(origin_community, new_id);
    }

    //  修改社区负责人
    @Transactional
    public Map<String, String> modifyCommunityLeader(Map<String, String> requestData) throws BadHanyuPinyinOutputFormatCombination {
        String user_name = randomGenerateUtils.generateRandomUserName(requestData.get("name"), 4);
        String passwd = "123456";
        String md5Pass = DigestUtils.md5DigestAsHex(passwd.getBytes());

        User user = new User();
        user.setName(requestData.get("name"));
        user.setUser_name(user_name);
        user.setPassword(md5Pass);
        user.setGender(requestData.get("gender"));
        user.setPhone_number(requestData.get("phone"));
        user.setUser_category("community");
        userMapper.register(user);
        int user_id = Integer.parseInt(requestData.get("id"));
        boolean updateSuccessful = committeeMapper.updateCommunityLeader(user_id,user.getUser_id());
        // 删除他所有的点赞评论
        commentMapper.deleteCommentByUserId(user_id);
        kudosMapper.deleteKudosByUserId(user_id);
        // 删除这个人
        boolean deleteSuccessful = updateSuccessful && committeeMapper.deleteCommunityLeader(user_id);

        if (updateSuccessful && deleteSuccessful) {
            Map<String, String> result = new HashMap<>();
            result.put("user_name", user_name);
            result.put("password", passwd);
            return result;
        } else {
            throw new IllegalStateException("服务器删除出错");
        }
    }
}
