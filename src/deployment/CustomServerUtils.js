import UIItemTypes from '../utils/UIItemTypes';
import JSZip from 'jszip';
import saveAs from 'file-saver';

import generateFlaskBackend from './GenerateFlaskBackend';



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

    const generateCustomServer = () => {
        var zip = new JSZip();

        const { apiUrlList, apiMethodList } = getApiList();
        zip.file("server.py", generateFlaskBackend(apiUrlList, apiMethodList));


        zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content, "example.zip");
        });
    }

    const countFiles = () => {
       
    }


    return {
        getApiList,
        generateCustomServer,
        countFiles
    }

}

export default CustomServerUtils;