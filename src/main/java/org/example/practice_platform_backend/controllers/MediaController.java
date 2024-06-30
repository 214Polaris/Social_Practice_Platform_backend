package org.example.practice_platform_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.practice_platform_backend.service.SaveFileService;
import org.example.practice_platform_backend.service.SendFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@RestController
@EnableAsync
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private SaveFileService saveFileService;

    @Autowired
    private SendFileService sendFileService;

    @Autowired
    @Qualifier("threadPoolExecutor")
    private TaskExecutor executor;


    // 获取缩略图的 list（70%），异步调用
    @PostMapping(value="/get/image/thumbnail")
    public ResponseEntity<?> getImageThumbnail(@RequestParam("images") List<String> images,
                                               @RequestParam("id") int id,
                                               @RequestParam("type") int type){
        // 使用CompletableFuture异步处理每个图片
        List<CompletableFuture<String>> futures = images.stream()
                .map(image -> CompletableFuture.supplyAsync(() -> {
                    try {
                        return sendFileService.sendImage(image, type, id);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }, executor))
                .toList();

        // 等待所有异步操作完成，并收集结果
        List<String> result = futures.stream()
                .map(future -> {
                    try {
                        return future.get(); // 获取每个异步操作的结果
                    } catch (InterruptedException | ExecutionException e) {
                        throw new RuntimeException("Failed to get image thumbnail", e);
                    }
                })
                .collect(Collectors.toList());

        return ResponseEntity.status(200).body(result);
    }

    //获取图片高清大图
    @GetMapping(value = "/get/image")
    public ResponseEntity<?> getImage(@RequestParam("image") String image_name,
                                      @RequestParam("id") int id,
                                      @RequestParam("type") int type) throws IOException {
        String image = sendFileService.sendOriginalImage(image_name,type,id);
        if(image==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("找不到图片");
        }
        return ResponseEntity.status(200).body(image);
    }

    //删除图片
    @DeleteMapping(value="/delete/image")
    public ResponseEntity<?> DeleteImage(HttpServletRequest request,
                                         @RequestParam("id")Integer id, @RequestParam("media_id") Integer media_id,
                                         @RequestParam("type") Integer type) throws IOException {
        ResponseEntity<String> res = saveFileService.privilegeCheck(type,id,true,request);
        if(res.getStatusCode()== HttpStatus.FORBIDDEN){
            return res;
        }
        if (media_id == null || media_id < 0 || id == null ||id <0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).build();
        }
        if(type == null){
            return ResponseEntity.status(400).body("未指定类型");
        }
        if (type>3||type<0){
            return ResponseEntity.status(400).body("错误的上传类型");
        }
        //TODO：封面验证，不让它删掉封面，否则无法正常显示
        if(saveFileService.deleteImage(id,media_id,type)){
            return ResponseEntity.status(200).body("图片删除成功");
        }
        return ResponseEntity.status(400).body("图片删除失败");
    }

    //修改图片
    @PostMapping(value="/modify/image")
    public ResponseEntity<?> modifyImage(@RequestParam("image") MultipartFile image,
                                         HttpServletRequest request,
                                         @RequestParam("id")Integer id, @RequestParam("media_id") Integer media_id,
                                         @RequestParam("type") Integer type,
                                         @RequestParam("isCover") Boolean isCover) throws IOException {
        ResponseEntity<String> res = saveFileService.privilegeCheck(type,id,true,request);
        if(res.getStatusCode()== HttpStatus.FORBIDDEN){
            return res;
        }
        if (image == null || image.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).build();
        }
        if (media_id == null || media_id < 0 || id == null ||id <0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).build();
        }
        if(type == null){
            return ResponseEntity.status(400).body("未指定类型");
        }
        if (type>3||type<0){
            return ResponseEntity.status(400).body("错误的上传类型");
        }
        return saveFileService.modifyImage(image,id,media_id,type,isCover);
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
    @GetMapping("/video/{fileName}")
    public ResponseEntity<byte[]> getM3U8Content(@PathVariable String fileName,@RequestParam int type,@RequestParam int id) {
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
    @GetMapping("/video/ts/{filename}")
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
