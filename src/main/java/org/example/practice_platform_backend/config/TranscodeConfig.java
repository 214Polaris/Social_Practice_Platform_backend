package org.example.practice_platform_backend.config;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TranscodeConfig {
    //封面时间
    private String poster = "00:00:00.001";
    //分片大小（秒）
    private String tsSeconds ="15";
    //开始裁剪
    private String cutStart;
    //结束裁剪
    private String cutEnd;

    //按照m3u8格式写入
    @Override
    public String toString() {
        return "TranscodeConfig [poster=" + poster + ", tsSeconds=" + tsSeconds + ", cutStart=" + cutStart + ", cutEnd="
                + cutEnd + "]";
    }
}
