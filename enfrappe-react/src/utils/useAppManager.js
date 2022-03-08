import { useState } from 'react';

import getAppTemplate from './TemplateManager';

const useAppManager = () => {
    const [appData, setAppData] = useState(getAppTemplate('EMPTY')['app-data']);

    // Function for setting app data
    const setAppMetadata = (key, value) => {
        setAppData({...appData, 'last-edited': Date.now(), [key]: value});
    }

    // Function for getting app data
    const getAppMetadata = (key) => {
        return appData[key];
    }

    return {
        setAppMetadata,
        getAppMetadata,
        appData,
        setAppData
    }
}

export default useAppManager;