package org.example.practice_platform_backend.utils;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Project;
import org.example.practice_platform_backend.entity.Report;
import org.example.practice_platform_backend.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ProjectUtils {

    @Autowired
    private ProjectMapper projectMapper;
    @Autowired
    private FruitMapper fruitMapper;

    @Autowired
    private ImageUtils  imageUtils;
    
    @Autowired
    private MediaMapper  mediaMapper;

    @Autowired
    private TagsMapper tagsMapper;

    @Autowired
    private TeamMapper  teamMapper;

    @Value("${uploadPath}")
    private String uploadPath;
    /**
     * 根据需求编号查询其相关媒体（视频未实现）
     */
    public JSONArray getImgList(int need_id) throws IOException {
        JSONArray mediaList = new JSONArray();
        FruitMedia[]  fruitMedia = mediaMapper.getMediaByNeedId(need_id); 
        for(FruitMedia media : fruitMedia){
            JSONObject mediaJson = new JSONObject();
            if(media.getType().equals("image") || media.getType().equals("cover")){
                String path =  uploadPath + media.getPath();
                mediaJson.put("src",imageUtils.getFileBytes(path));
                mediaJson.put("img_flag",0);
                mediaList.add(mediaJson);
            }
            else{
                mediaJson.put("src",media.getPath());
                mediaJson.put("img_flag",1);
                mediaList.add(mediaJson);
            }
        }
        return mediaList;
    }

    /**
     * 获取近期成果列表 4
     */
    public JSONArray getFruitList(int project_id) throws IOException {
        JSONArray fruitList = new JSONArray();
        Fruit[] fruits = projectMapper.getFruitByProjectId(project_id);
        for(Fruit fruit : fruits){
            JSONObject fruitJson =  new JSONObject();
            fruitJson.put("id", String.valueOf(fruit.getFruit_id()));
            FruitMedia[]  fruitMedia = fruitMapper.getFruitMedia(fruit.getFruit_id());
            String img_path = null;
            for(FruitMedia media : fruitMedia){
                if(media.getType().equals("cover") ||  media.getType().equals("img")){
                    img_path = uploadPath + media.getPath();
                    break;
                }
            }
            fruitJson.put("img",imageUtils.getThumbnail(img_path));
            fruitJson.put("title",fruit.getTitle());
            fruitJson.put("date",fruit.getDate());
            System.out.println(fruit.getDate());
            fruitList.add(fruitJson);
        }
        return  fruitList;
    }

    /**
     * 获取报道列表
     */
    public JSONArray getReportList(int project_id) {
        JSONArray reportList = new JSONArray();
        Report[] reports = projectMapper.getReportByProjectId(project_id);
        for(Report report : reports){
            JSONObject reportJson =  new JSONObject();
            reportJson.put("title",report.getTitle());
            reportJson.put("link",report.getLink());
            reportList.add(reportJson);
        }
        return reportList;
    }

    /**
     * 获取需求列表(gov_id)
     */
    public JSONArray getNeedList(int gov_id) throws IOException {
        JSONArray need_list = new JSONArray();
        Project[] needs = projectMapper.getNeedListByCommunityId(gov_id);
        for(Project need : needs) {
            JSONObject needJSON = new JSONObject();
            needJSON.put("demand_id", String.valueOf(need.getNeed_id()));
            needJSON.put("demand_name", need.getTitle());
            List<String> tag_list = tagsMapper.searchTags(need.getNeed_id());
            JSONArray tag_array = new JSONArray();
            tag_array.addAll(tag_list);
            needJSON.put("tags", tag_array);
            String cover = mediaMapper.getNeedCoverPath(need.getNeed_id());
            if(cover == null){ //判断这个需求有无封面，没有则不会返回
                continue;
            }
            String coverPath = uploadPath + cover;
            needJSON.put("demand_img", imageUtils.getThumbnail(coverPath));
            need_list.add(needJSON);
        }
        return need_list;
    }

    /**
     * 获取结对项目列表
     */
    public JSONArray getProjectList(int gov_id) throws IOException {
        Project[]  projects = projectMapper.getProjectListByCommunityId(gov_id);
        JSONArray project_list = new JSONArray();
        for(Project project : projects){
            JSONObject projectJson = new JSONObject();
            projectJson.put("proj_id", String.valueOf(project.getProject_id()));
            projectJson.put("proj_title", projectMapper.getNeedTitleByProjectId(project.getProject_id()));
            projectJson.put("proj_img", imageUtils.getThumbnail(uploadPath + mediaMapper.getNeedCoverPath(project.getNeed_id())));
            String team_name = teamMapper.getTeamNameByProjectId(project.getProject_id());
            projectJson.put("team_name", team_name);
            List<String> tag_list = tagsMapper.searchTags(project.getNeed_id());
            JSONArray tag_array = new JSONArray();
            tag_array.addAll(tag_list);
            projectJson.put("tags", tag_array);
            project_list.add(projectJson);
        }
        return project_list;
    }
}
