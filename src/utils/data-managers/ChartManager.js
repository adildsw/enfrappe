import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const ChartManager = (componentData, setComponentData) => {

    const addChart = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.CHART);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteChart = (chartId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[chartId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== chartId);
        delete newComponentData.components[chartId];
        setComponentData(newComponentData);
    }

    const shiftChartUp = (chartId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[chartId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(chartId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = chartId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftChartDown = (chartId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[chartId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(chartId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = chartId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getChartData = (chartId) => {
        return componentData.components[chartId];
    }

    const setChartTitle = (chartId, title) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['title'] = title;
        setComponentData(newComponentData);
    }

    const setChartXLabel = (chartId, label) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['x-label'] = label;
        setComponentData(newComponentData);
    }

    const setChartYLabel = (chartId, label) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['y-label'] = label;
        setComponentData(newComponentData);
    }

    const setChartBackground = (chartId, background) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['background'] = background;
        setComponentData(newComponentData);
    }

    const setChartLineColor = (chartId, color) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['line-color'] = color;
        setComponentData(newComponentData);
    }

    const setChartTextColor = (chartId, color) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['text-color'] = color;
        setComponentData(newComponentData);
    }

    const setChartApiCallType = (chartId, apiCallType) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['api-call-type'] = apiCallType;
        setComponentData(newComponentData);
    }

    const setChartApiUrl = (chartId, apiUrl) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['api-url'] = apiUrl;
        setComponentData(newComponentData);
    }

    const addChartApiCustomParam = (chartId, apiParamKey, apiParamValue) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[chartId]['api-custom-params'][apiParamKey] = apiParamValue;
        setComponentData(newComponentData);
    }

    const deleteChartApiCustomParam = (chartId, apiParamKey) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        delete newComponentData.components[chartId]['api-custom-params'][apiParamKey];
        setComponentData(newComponentData);
    }

    return {
        addChart,
        deleteChart,
        getChartData,
        setChartTitle,
        setChartXLabel,
        setChartYLabel,
        setChartBackground,
        setChartLineColor,
        setChartTextColor,
        shiftChartUp,
        shiftChartDown,
        setChartApiCallType,
        setChartApiUrl,
        addChartApiCustomParam,
        deleteChartApiCustomParam
    }

}

export default ChartManager;