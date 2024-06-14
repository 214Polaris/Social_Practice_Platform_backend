package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.mapper.CommunityMapper;
import org.example.practice_platform_backend.mapper.FruitMapper;
import org.example.practice_platform_backend.service.SaveFileService;
import org.example.practice_platform_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.example.practice_platform_backend.entity.User;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@RestController
@EnableAsync
@RequestMapping("/api/video")
public class VideoStreamController {

    @Value("${uploadPath}")
    private String uploadPath;

    @Autowired
    private SaveFileService saveFileService;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * 处理视频上传
     * @param file 上传的视频
     * @param type 类型，0说明是社区信息相关，1说明是社区需求相关，2说明是成果
     * @param id 对应的 id
     * @param isModify 是否为修改原有视频
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(@RequestParam("video") MultipartFile file,
                                              @RequestParam("type") Integer type,
                                              @RequestParam("id") Integer id,
                                              @RequestParam("isModify") boolean isModify,
                                              HttpServletRequest request) throws IOException {

        ResponseEntity<String> res = saveFileService.privilegeCheck(type,id,isModify,request);
        if(res.getStatusCode()== HttpStatus.FORBIDDEN){
            return res;
        }

        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).build();
        }
        if(type == null){
            return ResponseEntity.status(400).body("未指定类型");
        }
        if (type>3||type<0){
            return ResponseEntity.status(400).body("错误的上传类型");
        }
        // 传入了isModify，则代表需要修改，要删除掉之前的视频
        if(isModify){
            return saveFileService.modifyVideo(file.getInputStream(),file.getOriginalFilename(),id,type);
        }
        else{
            return saveFileService.saveVideo(file.getInputStream(),file.getOriginalFilename(),id,type);
        }
    }

    /**
     * 获取 m3u8 播放目录
     * @param filepath m3u8的文件位置
     */
    @GetMapping("/m3u8")
    public ResponseEntity<byte[]> getM3U8Content(@RequestParam String filepath) {
        try {
            File file = new File(uploadPath+filepath);
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }
            // 读取M3U8文件内容
            FileInputStream fileInputStream = new FileInputStream(file);
            byte[] data = new byte[(int) file.length()];
            fileInputStream.read(data);
            fileInputStream.close();

            // 设置响应头为M3U8类型
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf("application/vnd.apple.mpegurl"))
                    .body(data);
        } catch (IOException e) {
            e.fillInStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 获取 ts 视频文件
     * @param filename ts 文件名
     * @param filepath m3u8文件的路径
     */
    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> getTSContent(@PathVariable String filename,@RequestParam String filepath) {
        try {

            Path path = Paths.get(uploadPath+filepath).getParent();

            File file = new File(String.valueOf(path), filename);

            if (file.exists()) {
                // 读取TS文件内容
                FileInputStream fileInputStream = new FileInputStream(file);
                byte[] data = new byte[(int) file.length()];
                fileInputStream.read(data);
                fileInputStream.close();

                // 设置响应头为TS文件类型
                return ResponseEntity.ok()
                        .contentType(MediaType.valueOf("video/mp2t"))
                        .body(data);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.fillInStackTrace();
            return null;
        }
    }

}
