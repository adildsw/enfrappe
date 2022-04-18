import { useEffect, useRef } from 'react';

import '../DataViewer.css';

const DataViewerLive = (props) => {
    const { componentManager, appManager, componentId } = props;
    const dataViewerData = componentManager.getComponent(componentId);

    const style = {
        'color': dataViewerData['text-color'],
        'fontWeight': dataViewerData['bold'] ? 'bold' : 'normal',
        'fontStyle': dataViewerData['italic'] ? 'italic' : 'normal',
        'textDecoration': dataViewerData['underline'] ? 'underline' : 'none',
        'textAlign': dataViewerData['align'],
        'fontSize': dataViewerData['size'] === 'large' ? '1.8em' : (dataViewerData['size'] === 'medium' ? '1.4em' : '1em'),
        'marginBottom': dataViewerData['tight'] ? '-10px' : '0px'
    }

    const dataRef = useRef();

    useEffect(() => {  
        const generateApiData = () => {
            var apiData = {};
            Object.keys(dataViewerData['api-custom-params']).forEach(param => {
                apiData[param] = dataViewerData['api-custom-params'][param];
            });
            return apiData;
        }
    
        const generateApiUrl = () => {
            var apiUrl = appManager.appData['server-address'];
            if (!apiUrl.startsWith('http://') && ! apiUrl.startsWith('https://'))
                apiUrl = 'http://' + apiUrl;
            if (apiUrl.endsWith(':'))
                apiUrl = apiUrl.slice(0, -1);
            apiUrl += ':' + appManager.appData['server-port'];
            if (apiUrl.endsWith('/'))
                apiUrl = apiUrl.substring(0, apiUrl.length - 1);
            apiUrl += dataViewerData['api-url'];
    
            if (dataViewerData['api-call-type'] === 'GET') {
                const apiData = generateApiData();
                apiUrl += '?' + Object.keys(apiData).map(key => key + '=' + apiData[key]).join('&');
            }
            return apiUrl;
        }
    
        const generateApiRequestInit = () => {
            console.log(parseInt(dataViewerData['refresh-interval']) > 0 ? parseInt(dataViewerData['refresh-interval']) * 1000 : 10000);
            var requestInit = {
                method: dataViewerData['api-call-type'],
                timeout: parseInt(dataViewerData['refresh-interval']) > 0 ? parseInt(dataViewerData['refresh-interval']) * 1000 : 10000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if (dataViewerData['api-call-type'] === 'POST')
                requestInit.body = JSON.stringify(generateApiData());
            return requestInit;
        }
    
        const apiUrl = generateApiUrl();
        const apiRequestInit = generateApiRequestInit();

        const fetchData = () => {
            fetch(apiUrl, apiRequestInit)
                .then(response => {
                    if (response.ok) {
                        response.text().then(data => {
                            dataRef.current.textContent = data;
                        });
                    }
                    else {
                        var statusText = response.statusText.toLowerCase();
                        statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1);
                        dataRef.current.textContent = statusText;
                    }
                })
                .catch(error => {
                    dataRef.current.textContent = "Error Loading Data...";
                    console.log(error);
                });
        }

        fetchData();
        console.log(dataViewerData['refresh-interval']);
        if (dataViewerData['refresh-interval'] !== '' && parseInt(dataViewerData['refresh-interval']) !== 0) {
            const interval = setInterval(() => {
                fetchData();
            }, parseInt(dataViewerData['refresh-interval']) * 1000);
            return () => clearInterval(interval);
        }
    }, [appManager.appData, dataViewerData]);

    return (
        <div>
            <div id={dataViewerData.id} className={'enfrappe-ui-textlive'} style={style}>
                <p id={dataViewerData.id} ref={dataRef}>
                    {dataViewerData['text']}
                </p>
            </div>
        </div>
    );
}

export default DataViewerLive;