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
}
