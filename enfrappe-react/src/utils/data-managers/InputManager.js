import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const InputManager = (componentData, setComponentData) => {

    const addInput = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.INPUT);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteInput = (inputId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[inputId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== inputId);
        delete newComponentData.components[inputId];
        setComponentData(newComponentData);
    }

    const shiftInputUp = (inputId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[inputId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(inputId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = inputId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftInputDown = (inputId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[inputId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(inputId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = inputId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getInputData = (inputId) => {
        return componentData.components[inputId];
    }

    const setInputLabel = (inputId, label) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[inputId]['label'] = label;
        setComponentData(newComponentData);
    }

    const setInputPlaceholder = (inputId, placeholder) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[inputId]['placeholder'] = placeholder;
        setComponentData(newComponentData);
    }

    const setInputTextColor = (inputId, textColor) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[inputId]['text-color'] = textColor;
        setComponentData(newComponentData);
    }

    return {
        addInput,
        deleteInput,
        getInputData,
        setInputLabel,
        setInputPlaceholder,
        setInputTextColor,
        shiftInputUp,
        shiftInputDown
    }

}

export default InputManager;