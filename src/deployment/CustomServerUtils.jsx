import UIItemTypes from '../utils/UIItemTypes';
import JSZip from 'jszip';
import saveAs from 'file-saver';

import generateFlaskBackend from './BackendGenerator';
import generateReactFrontend from './FrontendGenerator';

const installServerBat = `
cd frontend
call npm install
pause
`;

const launchServerBat = `
@echo off
cd backend
echo Launching backend server...
start cmd /k python server.py
cd ..
cd frontend
echo Launching frontend server...
start cmd /k npm start
`;

const CustomServerUtils = (appManager, componentManager) => {
    const { componentData } = componentManager;

    const getApiList = () => {
        const apiUrlList = [];
        const apiMethodList = [];

        Object.keys(componentData.components).forEach(component => {
            const data = componentData.components[component];
            if (data.type === UIItemTypes.BUTTON) {
                var apiUrl = data['on-press-api-url'];
                var apiMethod = data['on-press-api-call-type'];
                if (apiUrlList.includes(apiUrl) === false) {
                    apiUrlList.push(apiUrl);
                    apiMethodList.push("'" + apiMethod + "'");
                }
                else {
                    if (apiMethodList[apiUrlList.indexOf(apiUrl)] !== apiMethod) {
                        apiMethodList[apiUrlList.indexOf(apiUrl)] = "'GET', 'POST'";
                    }
                }
            }
        });
        return { apiUrlList, apiMethodList };
    }

    const generateCustomServerZip = (frontendIp, frontendPort) => {
        var zip = new JSZip();
        var backendFolder = zip.folder('backend');
        var frontendFolder = zip.folder('frontend');
        zip.file('install.bat', installServerBat);
        zip.file('launch.bat', launchServerBat);

        const { apiUrlList, apiMethodList } = getApiList();

        generateFlaskBackend(
            backendFolder,
            appManager.appData['app-id'], 
            appManager.appData['app-version'],
            appManager.appData['app-name'],
            appManager.appData['server-address'],
            appManager.appData['server-port'], 
            apiUrlList, 
            apiMethodList
        );

        generateReactFrontend(
            frontendFolder, 
            appManager.appData['server-address'], 
            appManager.appData['server-port'], 
            frontendIp, 
            frontendPort
        );

        return zip;
    }

    const downloadCustomServer = (frontendIp, frontendPort) => {
        var zip = generateCustomServerZip(frontendIp, frontendPort);
        zip.generateAsync({type:'blob'}).then(function(content) {
            saveAs(content, appManager.appData['app-id'] + '_' + appManager.appData['app-version'] + '_customserver.zip');
        });
    }

    return {
        getApiList,
        generateCustomServerZip,
        downloadCustomServer
    }

}

export default CustomServerUtils;