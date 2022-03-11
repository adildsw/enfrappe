import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const RadioManager = (componentData, setComponentData) => {

    const addRadio = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.RADIO);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteRadio = (radioId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[radioId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== radioId);
        delete newComponentData.components[radioId];
        setComponentData(newComponentData);
    }

    const shiftRadioUp = (radioId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[radioId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(radioId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = radioId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftRadioDown = (radioId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[radioId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(radioId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = radioId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getRadioData = (radioId) => {
        return componentData.components[radioId];
    }

    const setRadioLabel = (radioId, label) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[radioId]['label'] = label;
        setComponentData(newComponentData);
    }

    const setRadioTextColor = (radioId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[radioId]['text-color'] = value;
        setComponentData(newComponentData);
    }

    const addRadioOption = (radioId, label, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const optionId = nextId();
        newComponentData.components[radioId]['option-ids'].push(optionId);
        newComponentData.components[radioId]['options'][optionId] = {
            label: label,
            value: value
        };
        setComponentData(newComponentData);
    }

    const deleteRadioOption = (radioId, optionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[radioId]['option-ids'] = newComponentData.components[radioId]['option-ids'].filter(id => id !== optionId);
        delete newComponentData.components[radioId]['options'][optionId];
        setComponentData(newComponentData);
    }

    const editRadioOption = (radioId, optionId, label, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[radioId]['options'][optionId] = {
            label: label,
            value: value
        };
        setComponentData(newComponentData);
    }

    const shiftRadioOptionUp = (radioId, optionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const index = newComponentData.components[radioId]['option-ids'].indexOf(optionId);
        if (index === 0) return;
        const temp = newComponentData.components[radioId]['option-ids'][index - 1];
        newComponentData.components[radioId]['option-ids'][index - 1] = optionId;
        newComponentData.components[radioId]['option-ids'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftRadioOptionDown = (radioId, optionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const index = newComponentData.components[radioId]['option-ids'].indexOf(optionId);
        if (index === newComponentData.components[radioId]['option-ids'].length - 1) return;
        const temp = newComponentData.components[radioId]['option-ids'][index + 1];
        newComponentData.components[radioId]['option-ids'][index + 1] = optionId;
        newComponentData.components[radioId]['option-ids'][index] = temp;
        setComponentData(newComponentData);
    }

    const findOptionLabel = (radioId, label) => {
        var res = null;
        componentData.components[radioId]['option-ids'].forEach(optionId => {
            if (componentData.components[radioId]['options'][optionId]['label'] === label) {
                res = optionId;
            }
        });
        return res;
    }

    const findOptionValue = (radioId, value) => {
        var res = null;
        componentData.components[radioId]['option-ids'].forEach(optionId => {
            if (componentData.components[radioId]['options'][optionId]['value'] === value) {
                res = optionId;
            }
        });
        return res;
    }
    
    return {
        addRadio,
        deleteRadio,
        getRadioData,
        setRadioLabel,
        setRadioTextColor,
        shiftRadioUp,
        shiftRadioDown,
        addRadioOption,
        deleteRadioOption,
        editRadioOption,
        shiftRadioOptionUp,
        shiftRadioOptionDown,
        findOptionLabel,
        findOptionValue
    }

}

export default RadioManager;