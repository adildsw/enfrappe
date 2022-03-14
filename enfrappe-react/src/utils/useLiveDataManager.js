import { useState } from "react";
import UIItemTypes from "./UIItemTypes";

const useLiveDataManager = (componentManager) => {
    const [liveData, setLiveData] = useState({});

    const resetLiveData = () => {
        const emptyData = {};
        const data = componentManager.componentData.components;
        Object.keys(data).forEach(key => {
            if (data[key].type === UIItemTypes.ACTIVITY)
                emptyData[key] = null;
            else if (data[key.type === UIItemTypes.BUTTON])
                emptyData[key] = null;
            else if (data[key].type === UIItemTypes.TEXT)
                emptyData[key] = null;
            else if (data[key].type === UIItemTypes.INPUT)
                emptyData[key] = '';
            else if (data[key].type === UIItemTypes.CHECKBOX)
                emptyData[key] = false;
            else if (data[key].type === UIItemTypes.RADIO)
                emptyData[key] = data[key].options[data[key]['option-ids'][0]].value;
            else if (data[key].type === UIItemTypes.DROPDOWN)
                emptyData[key] = data[key].options[data[key]['option-ids'][0]].value;
        });
        setLiveData(emptyData);
    }

    const updateLiveData = (componentId, value) => {
        const newLiveData = { ...liveData };
        newLiveData[componentId] = value;
        setLiveData(newLiveData);
    }

    return {
        liveData,
        updateLiveData,
        resetLiveData
    }
}

export default useLiveDataManager;