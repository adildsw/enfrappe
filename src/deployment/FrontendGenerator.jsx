import AssetGenerator from "./frontend-generator-utils/AssetGenerator"
import RootFileGenerator from "./frontend-generator-utils/RootFileGenerator";
import PublicFileGenerator from "./frontend-generator-utils/PublicFileGenerator";
import SourceFileGenerator from "./frontend-generator-utils/SourceFileGenerator";
import ComponentFileGenerator from "./frontend-generator-utils/ComponentFileGenerator";

const generateReactFrontend = (zipContainer, serverIp, serverPort, frontendIp, frontendPort) => {
    const { packageJson, env } = RootFileGenerator(frontendIp, frontendPort);
    zipContainer.file("package.json", packageJson);
    zipContainer.file(".env", env);

    const { appCss, appJs, indexJs } = SourceFileGenerator(serverIp, serverPort);
    var srcFolder = zipContainer.folder("src");
    srcFolder.file("index.js", indexJs);
    srcFolder.file("App.css", appCss);
    srcFolder.file("App.js", appJs);

    const { serverDetailsJs, endpointBrowserJs, requestBrowserJs, requestDetailsJs, activityLogJs } = ComponentFileGenerator();
    var componentsFolder = srcFolder.folder("components");
    componentsFolder.file("ServerDetails.js", serverDetailsJs);
    componentsFolder.file("EndpointBrowser.js", endpointBrowserJs);
    componentsFolder.file("RequestBrowser.js", requestBrowserJs);
    componentsFolder.file("RequestDetails.js", requestDetailsJs);
    componentsFolder.file("ActivityLog.js", activityLogJs);

    const { faviconIcoBase64, logo192PngBase64, logo512PngBase64, serverLogoSvgBase64, notificationMp3Base64 } = AssetGenerator();
    var assetsFolder = srcFolder.folder("assets");
    assetsFolder.file("server_logo.svg", serverLogoSvgBase64, { base64: true });
    assetsFolder.file("notification.mp3", notificationMp3Base64, { base64: true });

    const { indexHtml, manifestJson, robotsTxt } = PublicFileGenerator();
    var publicFolder = zipContainer.folder("public");
    publicFolder.file("favicon.ico", faviconIcoBase64, { base64: true });
    publicFolder.file("logo192.png", logo192PngBase64, { base64: true });
    publicFolder.file("logo512.png", logo512PngBase64, { base64: true });
    publicFolder.file("index.html", indexHtml);
    publicFolder.file("manifest.json", manifestJson);
    publicFolder.file("robots.txt", robotsTxt);

    return zipContainer;
}

export default generateReactFrontend;