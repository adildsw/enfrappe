import { useState } from 'react';

import TemplateManager from './TemplateManager';

const useAppManager = () => {
    const [appData, setAppData] = useState(TemplateManager.EMPTY['app-data']);

    // Function for setting app data
    const setAppMeta = (key, value) => {
        setAppData({...appData, 'last-edited': Date.now(), [key]: value});
    }

    const getAppMeta = (key) => {
        return appData[key];
    }

    return {
        setAppMeta,
        getAppMeta,
        appData,
        loadAppData: setAppData
    }
}

export default useAppManager;