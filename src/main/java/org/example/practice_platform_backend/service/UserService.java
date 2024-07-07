package org.example.practice_platform_backend.service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Audit;
import org.example.practice_platform_backend.mapper.*;
import org.example.practice_platform_backend.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.function.Function;

@Service
public class UserService {

    @Value("${uploadPath}")
    private String uploadPath;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ImageUtils imageUtils;

    @Autowired
    private TeamMapper teamMapper;

    @Autowired
    private AuditMapper  auditMapper;

    @Autowired
    @Qualifier("threadPoolExecutor")
    private TaskExecutor executor;

    private final Map<Integer, String> getTypeMap;

    private final Map<String, Function<Integer, String>> getNameMap;

    private final Map<String, Function<Audit, Integer>> getIDMap;

    private final Map<String, Function<Audit, String>> getReasonMap;

    private final Map<String, Function<Integer, String>> getCoverMap;

    private final Map<String, Function<Integer, Integer>> getComId;

    private final Map<String, Function<Integer, String>> getComName;

    public UserService(TeamMapper teamMapper, FruitMapper fruitMapper, ProjectMapper projectMapper, CommunityMapper communityMapper) {
        getTypeMap = Map.of(
                1, "team",
                2, "team_new",
                3, "fruit",
                4, "fruit_new",
                7, "project",
                8, "project_new"
        );

        getNameMap = Map.of(
                        "team", teamMapper::getTeamNameByTeamNumber,
                        "fruit",fruitMapper::getFruitTitleByFruitId,
                        "project",projectMapper::getNeedTitleByProjectId,
                        "team_new", teamMapper::getTeamNameByTeamNumber,
                        "fruit_new",fruitMapper::getFruitTitleByFruitId,
                        "project_new",projectMapper::getNeedTitleByProjectId
                );
        getIDMap = Map.of(
                        "team", Audit::getTeam_id,
                        "fruit", Audit::getFruit_id,
                        "project", Audit::getProject_id,
                        "team_new", Audit::getNew_id,
                        "fruit_new", Audit::getNew_id,
                        "project_new", Audit::getNew_id
                );
         getReasonMap = Map.of(
                        "team_new", Audit::getFail_interpretation,
                        "fruit_new", Audit::getFail_interpretation
                );
          getCoverMap = Map.of(
                        "team", teamMapper::getTeamAvatarPathByTeamNumber,
                        "fruit",fruitMapper::getFruitCover,
                        "project",projectMapper::getCoverPathByProjectId,
                        "team_new", teamMapper::getTeamAvatarPathByTeamNumber,
                        "fruit_new",fruitMapper::getFruitCover,
                        "project_new",projectMapper::getCoverPathByProjectId
                );

           getComId = Map.of(
                        "project", communityMapper::getCommunityIdByProjectId,
                    "project_new", communityMapper::getCommunityIdByProjectId
                );

            getComName = Map.of(
                        "project", communityMapper::getCommunityName,
                    "project_new", communityMapper::getCommunityName
                );
    }

    // 确保 getDefault 返回一个有效的函数
    private static Function<Integer, String> getDefaultFunction() {
        return id -> "Default Value";
    }

    private static Function<Audit, String> getDefaultFunction_str() {
        return id -> "Default Value";
    }

    private static Function<Integer, Integer> getDefaultFunction_int() {
        return id -> 0;
    }

    // 获取 User 信息
    public HashMap<String, String> getUserByUser_id(int user_id) throws IOException {
        HashMap<String,String> user = userMapper.getUserById(user_id);
        String trueName = ImageUtils.getTrueName(user.get("image"));
        String suffix = ImageUtils.getSuffix(user.get("image"));
        String path = uploadPath + "avatar" + File.separator + trueName + "_origin" + suffix;
        user.put("image",imageUtils.getFileBytes(path));
        return user;
    }

    public JSONObject getStuInfo(int user_id){
        JSONObject jsonObject = new JSONObject();
        HashMap<String,String> user = userMapper.getStudentInfo(user_id);
        jsonObject.put("Name",user.get("name"));
        jsonObject.put("college",user.get("academy"));
        int hasJoinOther = teamMapper.isHaveTeam(user_id)?1:0;
        jsonObject.put("hasJoinOther",hasJoinOther);
        return jsonObject;
    }

    @Transactional
    public JSONArray getStuNotice(int user_id) throws IOException {
        List<Audit> teamAuditList = team_audit_notice(user_id);
        List<Audit> fruitAuditList = fruit_audit_notice(user_id);
        List<Audit> pairAuditList = pair_audit_notice(user_id);
        JSONArray list = new JSONArray();
        List<Audit> auditList =  new ArrayList<>();
        auditList.addAll(teamAuditList);
        auditList.addAll(fruitAuditList);
        auditList.addAll(pairAuditList);
        Collections.sort(auditList);
        List<CompletableFuture<JSONObject>> futures = new ArrayList<>();
        // 提交并行任务
        auditList.forEach(audit ->{
            CompletableFuture<JSONObject> JSONObjectFutures = CompletableFuture.supplyAsync(() -> {
                try {
                    return handleStuNotice(audit);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            },  executor);
            futures.add(JSONObjectFutures);
        });
        // 等待并行任务完成并收集结果
        List<JSONObject> JsonObjectList = futures.stream().map(future -> {
                    try {
                        return future.get();
                    } catch (Exception e) {
                        System.err.println("Failed to get future result: " + e.getMessage());
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .toList();
        list.addAll(JsonObjectList);
        return list;
    }

    public JSONObject handleStuNotice(Audit audit) throws IOException {
        JSONObject  jsonObject = new JSONObject();
        int type = 0;
        if(audit.getTeam_id() != 0){ // 队伍审核相关
            if(audit.getIs_pass() == 1){ // 通过！！
                type = 1;
            }else{
                type = 2;
            }
        }else if(audit.getFruit_id() != 0){ // 成果审核相关
            if(audit.getIs_pass() == 1){
                type = 3;
            }else{
                type = 4;
            }
        }else if(audit.getProject_id() != 0){
            if(audit.getIs_pass() == 1){
                type = 7;
            }else{
                type = 8;
            }
        }
        String type_String =  getTypeMap.getOrDefault(type, "unknown");
        int id = getIDMap.get(type_String).apply(audit);
        String name = getNameMap.getOrDefault(type_String,getDefaultFunction()).apply(id);
        String reason = getReasonMap.getOrDefault(type_String,getDefaultFunction_str()).apply(audit);
        String img_path = getCoverMap.getOrDefault(type_String,getDefaultFunction()).apply(id);
        int comID = getComId.getOrDefault(type_String,getDefaultFunction_int()).apply(audit.getProject_id());
        String comName = getComName.getOrDefault(type_String,getDefaultFunction()).apply(comID);
        jsonObject.put("type",type);
        jsonObject.put("Name", name);
        jsonObject.put("id",String.valueOf(id));
        jsonObject.put("reason",reason);
        jsonObject.put("img", imageUtils.getThumbnail(uploadPath+img_path));
        jsonObject.put("comID", comID);
        jsonObject.put("comName",  comName);
        jsonObject.put("time", audit.getLast_mod_time());
        return jsonObject;
    }

    /**
     * 获取队伍审核变更列表 申请人
     */
    @Transactional
    public List<Audit> team_audit_notice(int user_id){
        List<Audit> teamAuditList = auditMapper.getTeamAuditByUserId(user_id);
        auditMapper.updateTeamAuditAsRead(user_id);
        return teamAuditList;
    }

    /**
     * 获取成果审核变更列表 申请人
     */
    @Transactional
    public List<Audit> fruit_audit_notice(int user_id){
        List<Audit> fruitAuditList = auditMapper.getFruitAuditByUserId(user_id);
        auditMapper.updateFruitAuditAsRead(user_id);
        return fruitAuditList;
    }

    /**
     * 获取结对审核变更列表 申请人
     */
    @Transactional
    public List<Audit> pair_audit_notice(int user_id){
        List<Audit> pairAuditList = auditMapper.getProjAuditByUserId(user_id);
        auditMapper.updateProjAuditAsRead(user_id);
        return pairAuditList;
    }
}
