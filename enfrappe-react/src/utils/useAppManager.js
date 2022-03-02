import { useState } from 'react';

const useAppManager = () => {
    const [appData, setAppData] = useState({
        'app-id': 'com.me.frappeapp', 
        'app-name': 'My Awesome Frappe App', 
        'app-version': '1.0.0', 
        'single-use': false, 
        'location-linked': false, 
        'notify-user': false, 
        'server-address': '127.0.0.1', 
        'server-port': '1803',
        'last-edited': Date.now()
    });

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