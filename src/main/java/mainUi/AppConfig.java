package mainUi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by aautushk on 11/6/2015.
 */
@Component
public class AppConfig {
    @Value("${gatewayHost}")
    private String gatewayHost;

    @Value("${gatewayPort}")
    private String gatewayPort;

    @Value("${mainAppHost}")
    private String mainAppHost;

    @Value("${mainAppPort}")
    private String mainAppPort;

    @Value("${aws.s3.uploadUrl}")
    private String s3UploadUrl;

    @Value("${aws.s3.accessKeyId}")
    private String s3AccessKeyId;

    @Value("${aws.s3.policy}")
    private String s3Policy;

    @Value("${aws.s3.signature}")
    private String s3Signature;

    public String getGatewayHost() {
        return gatewayHost;
    }

    public void setGatewayHost(String gatewayHost) {
        this.gatewayHost = gatewayHost;
    }

    public String getGatewayPort() {
        return gatewayPort;
    }

    public void setGatewayPort(String gatewayPort) {
        this.gatewayPort = gatewayPort;
    }

    public String getMainAppHost() {
        return mainAppHost;
    }

    public void setMainAppHost(String mainAppHost) {
        this.mainAppHost = mainAppHost;
    }

    public String getMainAppPort() {
        return mainAppPort;
    }

    public void setMainAppPort(String mainAppPort) {
        this.mainAppPort = mainAppPort;
    }

    public String getS3AccessKeyId() {
        return s3AccessKeyId;
    }

    public void setS3AccessKeyId(String s3AccessKeyId) {
        this.s3AccessKeyId = s3AccessKeyId;
    }

    public String getS3Policy() {
        return s3Policy;
    }

    public void setS3Policy(String s3Policy) {
        this.s3Policy = s3Policy;
    }

    public String getS3Signature() {
        return s3Signature;
    }

    public void setS3Signature(String s3Signature) {
        this.s3Signature = s3Signature;
    }

    public String getS3UploadUrl() {
        return s3UploadUrl;
    }

    public void setS3UploadUrl(String s3UploadUrl) {
        this.s3UploadUrl = s3UploadUrl;
    }
}
