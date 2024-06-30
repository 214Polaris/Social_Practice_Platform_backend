package org.example.practice_platform_backend.utils;

import lombok.Setter;
import org.springframework.stereotype.Component;
import org.apache.tomcat.util.codec.binary.Base64;
import net.coobird.thumbnailator.Thumbnails;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Objects;
import java.util.Random;
import java.util.UUID;

// 生成图片的工具类
@Setter
@Component
public class ImageUtils {

    /**
     * 获取文件真实名称
     * 由于浏览器的不同获取的名称可能为:c:/upload/1.jpg或者1.jpg
     * 最终获取的为  1.jpg
     * @param name 上传上来的文件名称
     * @return 真实名称
     */
    public static String getRealName(String name) {
        //获取最后一个"/"
        int index = name.lastIndexOf("/");
        return name.substring(index + 1);
    }

    /**
     * 获取文件除去后缀的名称
     * 如 yzt.jpg 最终获取的为 yzt
     * @param name 上传上来的文件名称
     * @return 除去后缀的名称
     */
    public static String getTrueName(String name) {
        //获取最后一个"."
        String trueName = getRealName(name);
        int index = trueName.lastIndexOf(".");
        return trueName.substring(0,index);
    }


    /**
     * 获取文件后缀
     * @param name 上传上来的文件名称
     * @return 后缀
     */
    public static String getSuffix(String name) {
        String trueName = getRealName(name);
        int index = trueName.lastIndexOf(".");
        return trueName.substring(index);
    }

    /**
     * 获取随机名称
     *
     * @param realName 真实名称
     * @return uuid 随机名称
     */
    public static String getUUIDName(String realName) {
        //获取后缀名
        int index = realName.lastIndexOf(".");
        if (index == -1) {
            return UUID.randomUUID().toString().replace("-", "").toUpperCase();
        } else {
            return UUID.randomUUID().toString().replace("-", "").toUpperCase() + realName.substring(index);
        }
    }
    /**
     * 获取文件目录,可以获取256个随机目录
     * @return 随机目录
     */
    public static String getDir() {
        String s = "0123456789ABCPDF";
        Random r = new Random();
        // /A/A
        return "/" + s.charAt(r.nextInt(16)) + "/" + s.charAt(r.nextInt(16));
    }

    /**
     * 生成图片缩略图
     * @Param sourceFile 源文件
     * @Param toFile 目标文件
     */
    public void photoSmaller(InputStream inputStream,String path) throws IOException {
        Thumbnails.of(inputStream)
                .size(200, 150)//尺寸
                //.watermark(Positions.CENTER, ImageIO.read(markIco), 0.1f)
                .outputQuality(0.4f)//缩略图质量
                .toFile(path);
    }

    /**
     * base64加密后的字节类型的缩略图
     * @return base64加密后的字节类型缩略图
     */
    public String getThumbnail(String filePath) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        File file = new File(filePath);
        // 读取图片文件
        BufferedImage originalImage = ImageIO.read(file);
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        Thumbnails.of(file)
                .size(width,height)
                .outputQuality(0.4)
                .toOutputStream(bos);
        byte[] data = bos.toByteArray();
        return new String(Objects.requireNonNull(Base64.encodeBase64(data,true)));
    }

    /**
     * base64加密后的字节类型的图片
     * @return base64加密后的字节类型图片
     */
    public String getFileBytes(String filePath) throws IOException {
        try (FileInputStream fileInputStream = new FileInputStream(filePath);) {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] b = new byte[1024];
            int len = -1;
            while ((len = fileInputStream.read(b)) != -1) {
                bos.write(b, 0, len);
            }
            byte[] data = bos.toByteArray();
            return new String(Objects.requireNonNull(Base64.encodeBase64(data,true)));
        }
    }

    /*** 将base64字符串，生成文件
     * 之后有可能用到*/
    public static File convertBase64ToFile(String fileBase64String, String filePath, String fileName) {
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            File dir = new File(filePath);
            //判断文件目录是否存在
            if (!dir.exists() && dir.isDirectory()) {
                dir.mkdirs();
            }
            byte[] bfile = Base64.decodeBase64(fileBase64String);
            file = new File(filePath + File.separator + fileName);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(bfile);
            return file;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
        return null;
    }

}
