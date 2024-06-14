package org.example.practice_platform_backend.utils;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.springframework.stereotype.Component;

import java.util.Random;


@Component
public class RandomGenerateUtils {
    /**
     * 根据中文名随机生成拼音+随机字符的用户名
     * @param name 中文名字
     * @param len 要生成后缀数字的长度
     * @return String
     */
    public String generateRandomUserName(String name, int len) throws BadHanyuPinyinOutputFormatCombination {
        HanyuPinyinOutputFormat outputFormat = new HanyuPinyinOutputFormat();
        outputFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);  // 设置无声调
        StringBuilder pinyin = new StringBuilder(PinyinHelper.toHanYuPinyinString(name, outputFormat, "", true));
        Random random = new Random();
        for (int i = 0; i < len; i++) {
            pinyin.append(random.nextInt(10));
        }
        return pinyin.toString();
    }
}
