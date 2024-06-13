package org.example.practice_platform_backend.utils;

import com.google.gson.JsonArray;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.example.practice_platform_backend.entity.Fruit;
import org.example.practice_platform_backend.entity.FruitMedia;
import org.example.practice_platform_backend.entity.Report;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.mapper.MediaMapper;
import org.example.practice_platform_backend.mapper.ProjectMapper;
import org.example.practice_platform_backend.mapper.TeamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Component;

import java.io.IOException;

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

    @Value("${uploadPath}")
//    private String uploadPath = "D:/Desktop/Processing/终极实训/Social_Practice_Platform_backend/uploadfiles";
    private String uploadPath;
    /**
     * 根据需求编号查询其相关媒体（视频未实现）
     * @param need_id
     * @return
     */
    public JSONArray getImgList(int need_id) throws IOException {
        JSONArray mediaList = new JSONArray();
        FruitMedia[]  fruitMedia = mediaMapper.getMediaByNeedId(need_id); 
        for(FruitMedia media : fruitMedia){
            JSONObject mediaJson = new JSONObject();
            if(media.getType().equals("img") || media.getType().equals("cover")){
                String path =  uploadPath + media.getPath();
                mediaJson.put("src",imageUtils.getThumbnail(path));
                mediaJson.put("img_flag",0);
                mediaList.add(mediaJson);
            }
        }
        return mediaList;
    }

    /**
     * 获取近期成果列表 4
     * @param project_id
     * @return
     * @throws IOException
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
     * @param project_id
     * @return
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
}
