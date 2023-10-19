import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const DataViewerManager = (componentData, setComponentData) => {

    const addDataViewer = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.DATAVIEWER);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteDataViewer = (dataViewerId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[dataViewerId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== dataViewerId);
        delete newComponentData.components[dataViewerId];
        setComponentData(newComponentData);
    }

    const shiftDataViewerUp = (dataViewerId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[dataViewerId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(dataViewerId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = dataViewerId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftDataViewerDown = (dataViewerId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[dataViewerId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(dataViewerId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = dataViewerId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getDataViewerData = (dataViewerId) => {
        return componentData.components[dataViewerId];
    }

    const setDataViewerValue = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['text'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerBold = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['bold'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerItalic = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['italic'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerUnderline = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['underline'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerTight = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['tight'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerColor = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['text-color'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerSize = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['size'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerAlign = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['align'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerRefreshInterval = (dataViewerId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['refresh-interval'] = value;
        setComponentData(newComponentData);
    }

    const setDataViewerApiCallType = (dataViewerId, apiCallType) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['api-call-type'] = apiCallType;
        setComponentData(newComponentData);
    }

    const setDataViewerApiUrl = (dataViewerId, apiUrl) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['api-url'] = apiUrl;
        setComponentData(newComponentData);
    }

    const addDataViewerApiCustomParam = (dataViewerId, apiParamKey, apiParamValue) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dataViewerId]['api-custom-params'][apiParamKey] = apiParamValue;
        setComponentData(newComponentData);
    }

    const deleteDataViewerApiCustomParam = (dataViewerId, apiParamKey) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        delete newComponentData.components[dataViewerId]['api-custom-params'][apiParamKey];
        setComponentData(newComponentData);
    }

    return {
        addDataViewer,
        deleteDataViewer,
        getDataViewerData,
        setDataViewerValue,
        setDataViewerBold,
        setDataViewerItalic,
        setDataViewerUnderline,
        setDataViewerTight,
        setDataViewerColor,
        shiftDataViewerUp,
        shiftDataViewerDown,
        setDataViewerSize,
        setDataViewerAlign,
        setDataViewerRefreshInterval,
        setDataViewerApiCallType,
        setDataViewerApiUrl,
        addDataViewerApiCustomParam,
        deleteDataViewerApiCustomParam
    }

}

export default DataViewerManager;