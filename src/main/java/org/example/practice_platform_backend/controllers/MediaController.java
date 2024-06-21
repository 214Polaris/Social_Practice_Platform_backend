package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.service.SaveFileService;
import org.example.practice_platform_backend.service.SendFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@EnableAsync
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private SaveFileService saveFileService;

    @Autowired
    private SendFileService sendFileService;


    // 获取缩略图的 list（70%）
    @GetMapping(value="/get/image/thumbnail")
    public ResponseEntity<?> getImageThumbnail(@RequestParam("images") List<String> images,
                                               @RequestParam("id") int id,
                                               @RequestParam("type") int type){
        List<String> result = new java.util.ArrayList<>();
        images.forEach(image->{
            try {
                result.add(sendFileService.sendImage(image,type,id));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return ResponseEntity.status(200).body(result);
    }

    /**
     * 处理视频上传
     * @param file 上传的视频
     * @param type 类型，0说明是社区信息相关，1说明是社区需求相关，2说明是成果
     * @param id 对应的 id
     * @param isModify 是否为修改原有视频
     */
    @PostMapping("/video/upload")
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
     * @param fileName m3u8文件名
     */
    @GetMapping("/video/m3u8")
    public ResponseEntity<byte[]> getM3U8Content(@RequestParam String fileName,@RequestParam int type,@RequestParam int id) {
        try {
            byte[] data = sendFileService.sendM3u8File(fileName,type,id);
            if(data==null){
                return ResponseEntity.notFound().build();
            }
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
     */
    @GetMapping("/video/{filename}")
    public ResponseEntity<byte[]> getTSContent(@PathVariable String filename,@RequestParam int type,@RequestParam int id) {
        try {
            byte[] data = sendFileService.sendM3u8File(filename,type,id);
            if(data==null){
                return ResponseEntity.notFound().build();
            }
            // 设置响应头为TS文件类型
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf("video/mp2t"))
                    .body(data);

        } catch (IOException e) {
            e.fillInStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

}
