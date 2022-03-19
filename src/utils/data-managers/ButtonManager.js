import nextId from "react-id-generator";

import getDefaultComponentData from "../DefaultComponentData";
import UIItemTypes from "../UIItemTypes";

const ButtonManager = (componentData, setComponentData) => {
    const addButton = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.BUTTON);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteButton = (buttonId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[buttonId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== buttonId);
        delete newComponentData.components[buttonId];
        setComponentData(newComponentData);
    }

    const getButtonData = (buttonId) => {
        return componentData.components[buttonId];
    }

    const shiftButtonUp = (buttonId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[buttonId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(buttonId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = buttonId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftButtonDown = (buttonId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[buttonId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(buttonId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = buttonId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const setButtonText = (buttonId, text) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['text'] = text;
        setComponentData(newComponentData);
    }

    const setButtonBackground = (buttonId, background) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['background'] = background;
        setComponentData(newComponentData);
    }

    const setButtonTextColor = (buttonId, textColor) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['text-color'] = textColor;
        setComponentData(newComponentData);
    }

    const setButtonOnPressActionType = (buttonId, actionType) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-action-type'] = actionType;
        setComponentData(newComponentData);
    }

    const setButtonOnPressActivity = (buttonId, activity) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-activity'] = activity;
        setComponentData(newComponentData);
    }

    const setButtonOnPressApiCallType = (buttonId, apiCallType) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-api-call-type'] = apiCallType;
        setComponentData(newComponentData);
    }

    const setButtonOnPressApiUrl = (buttonId, apiUrl) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-api-url'] = apiUrl;
        setComponentData(newComponentData);
    }

    const addButtonOnPressApiParam = (buttonId, apiParam) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-api-params'].push(apiParam);
        setComponentData(newComponentData);
    }

    const deleteButtonOnPressApiParam = (buttonId, apiParam) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-api-params'] = newComponentData.components[buttonId]['on-press-api-params'].filter(param => param !== apiParam);
        setComponentData(newComponentData);
    }

    const addButtonOnPressApiCustomParam = (buttonId, apiParamKey, apiParamValue) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-api-custom-params'][apiParamKey] = apiParamValue;
        setComponentData(newComponentData);
    }

    const deleteButtonOnPressApiCustomParam = (buttonId, apiParamKey, apiParamValue) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        delete newComponentData.components[buttonId]['on-press-api-custom-params'][apiParamKey];
        setComponentData(newComponentData);
    }

    const setButtonOnPressApiResultDisplayType = (buttonId, apiResultDisplayType) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press-api-result-display-type'] = apiResultDisplayType;
        setComponentData(newComponentData);
    }

    return {
        addButton,
        deleteButton,
        getButtonData,
        setButtonText,
        setButtonBackground,
        setButtonTextColor,
        setButtonOnPressActionType,
        setButtonOnPressActivity,
        setButtonOnPressApiCallType,
        setButtonOnPressApiUrl,
        addButtonOnPressApiParam,
        deleteButtonOnPressApiParam,
        addButtonOnPressApiCustomParam,
        deleteButtonOnPressApiCustomParam,
        setButtonOnPressApiResultDisplayType,
        shiftButtonUp,
        shiftButtonDown
    }
}

export default ButtonManager;