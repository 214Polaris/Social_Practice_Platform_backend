package org.example.practice_platform_backend.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FFmpegUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(FFmpegUtils.class);

    /**
     * 转换视频为 m3u8 格式
     * @param srcPathname 读取的原视频的目录
     * @param destPathname 存放 m3u8 文件的目录
     * @return boolean 判断是否转换成功
     */

    public static boolean convert(String srcPathname, String destPathname,int type,int id) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("ffmpeg", "-i", srcPathname, "-c:v", "libx264", "-hls_time", "30",
                    "-hls_list_size", "0", "-c:a", "aac", "-strict", "-2", "-f", "hls", destPathname);
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            System.out.println("FFmpeg process exited with code: " + exitCode);
            // Modify the .m3u8 file to add query parameters to .ts files
            List<String> lines = Files.readAllLines(Paths.get(destPathname));
            lines = lines.stream()
                    .map(l -> l.endsWith(".ts") ? l + "?id=" + id + "&type=" + type : l)
                    .collect(Collectors.toList());
            Files.write(Paths.get(destPathname), lines);
            return true;
        } catch (IOException | InterruptedException e) {
            LOGGER.error(e.getMessage());
            return false;
        }
    }

    // 跨平台换行符
    private static final String LINE_SEPARATOR = System.lineSeparator();

}

