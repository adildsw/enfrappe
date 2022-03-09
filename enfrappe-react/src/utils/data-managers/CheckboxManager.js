import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const CheckboxManager = (componentData, setComponentData) => {

    const addCheckbox = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.CHECKBOX);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteCheckbox = (checkboxId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[checkboxId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== checkboxId);
        delete newComponentData.components[checkboxId];
        setComponentData(newComponentData);
    }

    const shiftCheckboxUp = (checkboxId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[checkboxId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(checkboxId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = checkboxId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftCheckboxDown = (checkboxId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[checkboxId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(checkboxId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = checkboxId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getCheckboxData = (checkboxId) => {
        return componentData.components[checkboxId];
    }

    const setCheckboxLabel = (checkboxId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[checkboxId]['label'] = value;
        setComponentData(newComponentData);
    }

    const setCheckboxTextColor = (checkboxId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[checkboxId]['text-color'] = value;
        setComponentData(newComponentData);
    }

    return {
        addCheckbox,
        deleteCheckbox,
        getCheckboxData,
        setCheckboxLabel,
        setCheckboxTextColor,
        shiftCheckboxUp,
        shiftCheckboxDown
    }

}

export default CheckboxManager;