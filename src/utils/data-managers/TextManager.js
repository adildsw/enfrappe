import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const TextManager = (componentData, setComponentData) => {

    const addText = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.TEXT);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteText = (textId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[textId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== textId);
        delete newComponentData.components[textId];
        setComponentData(newComponentData);
    }

    const shiftTextUp = (textId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[textId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(textId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = textId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftTextDown = (textId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[textId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(textId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = textId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getTextData = (textId) => {
        return componentData.components[textId];
    }

    const setTextValue = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['text'] = value;
        setComponentData(newComponentData);
    }

    const setTextBold = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['bold'] = value;
        setComponentData(newComponentData);
    }

    const setTextItalic = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['italic'] = value;
        setComponentData(newComponentData);
    }

    const setTextUnderline = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['underline'] = value;
        setComponentData(newComponentData);
    }

    const setTextTight = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['tight'] = value;
        setComponentData(newComponentData);
    }

    const setTextColor = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['text-color'] = value;
        setComponentData(newComponentData);
    }

    const setTextSize = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['size'] = value;
        setComponentData(newComponentData);
    }

    const setTextAlign = (textId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[textId]['align'] = value;
        setComponentData(newComponentData);
    }

    return {
        addText,
        deleteText,
        getTextData,
        setTextValue,
        setTextBold,
        setTextItalic,
        setTextUnderline,
        setTextTight,
        setTextColor,
        shiftTextUp,
        shiftTextDown,
        setTextSize,
        setTextAlign
    }

}

export default TextManager;