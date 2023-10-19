import { Image as SemanticImage } from 'semantic-ui-react';

import '../Image.css';

const ImageLive = (props) => {
    const { componentManager, appManager, componentId } = props;
    const imageData = componentManager.getComponent(componentId);

    var src = imageData['src-url'];
    if (imageData['src-url'].startsWith('/')) {
        var apiUrl = appManager.appData['server-address'];
        if (!apiUrl.startsWith('http://') && ! apiUrl.startsWith('https://'))
            apiUrl = 'http://' + apiUrl;
        if (apiUrl.endsWith(':'))
            apiUrl = apiUrl.slice(0, -1);
        if (appManager.appData['server-port'] !== "")
            apiUrl += ':' + appManager.appData['server-port'];
        if (apiUrl.endsWith('/'))
            apiUrl = apiUrl.substring(0, apiUrl.length - 1);
        src = apiUrl + src;
    }

    return (
        <div>
            <div id={imageData.id} className={'enfrappe-ui-imagelive'}>
                <SemanticImage id={imageData.id} src={src} fluid />
            </div>
        </div>
    );
}

export default ImageLive;