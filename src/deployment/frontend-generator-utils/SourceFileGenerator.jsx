const SourceFileGenerator = (serverIp, serverPort) => {
    return {
        appCss: appCss,
        appJs: appJs(serverIp, serverPort),
        indexJs: indexJs,
    }
}

export default SourceFileGenerator;

const appCss = `
.fullscreen-div {
    height: 100vh;
}

#logo {
    max-width: 500px;
    margin: 10px auto;
    user-select: none;
}

.scrollable-div {
    display: flex;
    position: relative;
    flex-direction: column; 
    height: 100%;
}

.scrollable-section {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.panel-heading {
    margin-bottom: 0;
    color: #000000;
}

.panel-subheading {
    color: rgba(0, 0, 0);
    opacity: 0.5;
    margin-top: 0;
}

p, h1, h2, h3, h4, h5, h6, span, .label {
    user-select: none;
}

.details-form {
    background: #F6F6F6;
    border-radius: 5px;
    padding: 10px;
    padding-bottom: 10px;
}

.details-form > h4 {
    padding: 5px;
}

.details-form > p {
    background: #FDFDFD;
    border-radius: 5px;
    padding: 5px;
    padding-left: 5px;
    margin-top: -10px;
    font-style: italic;
}

.no-component {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #AAAAAA;
    user-select: none;
    text-align: center;
}

.no-component h1 {
    margin-bottom: 0;
}

.selected-component {
    border-color: #323232 !important; 
}

.selected-component-option {
    background: #F2F2F2 !important;
}

.component-option {
    border-radius: 5px;
    padding: 5px !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
}

.component-option:hover {
    border-radius: 5px;
    padding: 5px !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    background: #F8F8F8;
}
`;

const appJs = (serverIp, serverPort) => (`
import { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import useSound from 'use-sound';
import notificationSound from './assets/notification.mp3';

import ActivityLog from './components/ActivityLog';
import EndpointBrowser from './components/EndpointBrowser';
import RequestBrowser from './components/RequestBrowser';
import RequestDetails from './components/RequestDetails';
import ServerDetails from './components/ServerDetails';

import './App.css';

const IP = '${serverIp}';
const PORT = ${serverPort};
const UPDATE_FREQUENCY = 1000;

const App = () => {

    const [appDetails, setAppDetails] = useState({ appId: '', appVersion: '', appName: '', serverIp: '', serverPort: '' });
    const [apiMapping, setApiMapping] = useState({});
    const [serverData, setServerData] = useState({});
    const [timestampData, setTimestampData] = useState({'previous': 0, 'current': 0});

    const [selectedApiEndpoint, setSelectedApiEndpoint] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const [playNotification] = useSound(notificationSound);

    const clearServerData = () => {
        fetch('http://' + IP + ':' + PORT + '/enfrappe_static_delete_data', { method: 'POST' });
    }

    useEffect(() => {
        fetch('http://' + IP + ':' + PORT + '/enfrappe_static_app_detail', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            setAppDetails({ 
                appId: data['app_id'], 
                appVersion: data['app_version'], 
                appName: data['app_name'],  
                serverIp: data['server_ip'],  
                serverPort: data['server_port']
            });
        });
    }, []);

    useEffect(() => {
        fetch('http://' + IP + ':' + PORT + '/enfrappe_static_function_api_mapping', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            setApiMapping(data);
        });
    }, []);

    useEffect(() => {  
        const interval = setInterval(() => {
            fetch('http://' + IP + ':' + PORT + '/enfrappe_static_get_last_timestamp', {
                method: 'POST'
                })
            .then(response => response.json())
            .then(data => {
                setTimestampData(prevState => ({'previous': prevState['current'], 'current': data['timestamp']}));
            });
        }, UPDATE_FREQUENCY);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('http://' + IP + ':' + PORT + '/enfrappe_static_update_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'timestamp': timestampData['previous']})
            })
            .then(response => response.json())
            .then(data => {
                setServerData(prevState => {
                    if (timestampData['current'] !== timestampData['previous']) {
                        playNotification();
                        setTimestampData({...timestampData, 'previous': timestampData['current']});
                    }
                    return {...prevState, ...data};
                });
            })
            .catch(error => setServerData(prevState => ({...prevState})));
    }, [timestampData, playNotification]);

    return (
        <Grid celled='internally' id='app-grid' className={'fullscreen-div'}>
            <Grid.Row id='app-grid-row'>
                <Grid.Column width={3} className={'fullscreen-div'}>
                    <ServerDetails 
                        appDetails={appDetails} 
                        clearServerData={clearServerData} 
                        setTimestampData={setTimestampData} 
                        setServerData={setServerData}
                    />
                </Grid.Column>
                <Grid.Column width={3} className={'fullscreen-div'}>
                    <EndpointBrowser 
                        apiMapping={apiMapping} 
                        selectedApiEndpoint={selectedApiEndpoint}
                        setSelectedApiEndpoint={setSelectedApiEndpoint}
                    />
                </Grid.Column>
                <Grid.Column width={3} className={'fullscreen-div'}>
                    <RequestBrowser
                        apiMapping={apiMapping} 
                        selectedApiEndpoint={selectedApiEndpoint}
                        selectedRequest={selectedRequest}
                        setSelectedRequest={setSelectedRequest}
                        serverData={serverData}
                    />
                </Grid.Column>
                <Grid.Column width={4} className={'fullscreen-div'}>
                    <RequestDetails
                        apiMapping={apiMapping} 
                        selectedRequest={selectedRequest}
                        serverData={serverData}
                    />
                </Grid.Column>
                <Grid.Column width={3} className={'fullscreen-div'}>
                    <ActivityLog
                        serverData={serverData} 
                        setSelectedApiEndpoint={setSelectedApiEndpoint}
                        setSelectedRequest={setSelectedRequest}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;
`);

const indexJs = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'semantic-ui-css/semantic.css';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
`;