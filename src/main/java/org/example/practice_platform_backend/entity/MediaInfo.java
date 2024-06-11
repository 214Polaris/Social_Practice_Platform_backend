package org.example.practice_platform_backend.entity;
import java.util.List;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediaInfo {

    @Getter
    @Setter
    public static class Format{
        @SerializedName("bit_rate")
        private String bitRate;
    }

    @Getter
    @Setter
    public static class Stream{
        @SerializedName("index")
        private int index;

        @SerializedName("codec_name")
        private String codecName;

        @SerializedName("codec_long_name")
        private String codecLongame;

        @SerializedName("profile")
        private String profile;

    }

    @SerializedName("streams")
    private List<Stream> streams;

    @SerializedName("format")
    private Format format;

}
