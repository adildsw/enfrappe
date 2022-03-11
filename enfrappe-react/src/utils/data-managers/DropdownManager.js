import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const DropdownManager = (componentData, setComponentData) => {

    const addDropdown = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.DROPDOWN);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteDropdown = (dropdownId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[dropdownId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== dropdownId);
        delete newComponentData.components[dropdownId];
        setComponentData(newComponentData);
    }

    const shiftDropdownUp = (dropdownId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[dropdownId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(dropdownId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = dropdownId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftDropdownDown = (dropdownId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[dropdownId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(dropdownId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = dropdownId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getDropdownData = (dropdownId) => {
        return componentData.components[dropdownId];
    }

    const setDropdownLabel = (dropdownId, label) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dropdownId]['label'] = label;
        setComponentData(newComponentData);
    }

    const setDropdownTextColor = (dropdownId, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dropdownId]['text-color'] = value;
        setComponentData(newComponentData);
    }

    const addDropdownOption = (dropdownId, label, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const optionId = nextId();
        newComponentData.components[dropdownId]['option-ids'].push(optionId);
        newComponentData.components[dropdownId]['options'][optionId] = {
            label: label,
            value: value
        };
        setComponentData(newComponentData);
    }

    const deleteDropdownOption = (dropdownId, optionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dropdownId]['option-ids'] = newComponentData.components[dropdownId]['option-ids'].filter(id => id !== optionId);
        delete newComponentData.components[dropdownId]['options'][optionId];
        setComponentData(newComponentData);
    }

    const editDropdownOption = (dropdownId, optionId, label, value) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[dropdownId]['options'][optionId] = {
            label: label,
            value: value
        };
        setComponentData(newComponentData);
    }

    const shiftDropdownOptionUp = (dropdownId, optionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const index = newComponentData.components[dropdownId]['option-ids'].indexOf(optionId);
        if (index === 0) return;
        const temp = newComponentData.components[dropdownId]['option-ids'][index - 1];
        newComponentData.components[dropdownId]['option-ids'][index - 1] = optionId;
        newComponentData.components[dropdownId]['option-ids'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftDropdownOptionDown = (dropdownId, optionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const index = newComponentData.components[dropdownId]['option-ids'].indexOf(optionId);
        if (index === newComponentData.components[dropdownId]['option-ids'].length - 1) return;
        const temp = newComponentData.components[dropdownId]['option-ids'][index + 1];
        newComponentData.components[dropdownId]['option-ids'][index + 1] = optionId;
        newComponentData.components[dropdownId]['option-ids'][index] = temp;
        setComponentData(newComponentData);
    }

    const findOptionLabel = (dropdownId, label) => {
        var res = null;
        componentData.components[dropdownId]['option-ids'].forEach(optionId => {
            if (componentData.components[dropdownId]['options'][optionId]['label'] === label) {
                res = optionId;
            }
        });
        return res;
    }

    const findOptionValue = (dropdownId, value) => {
        var res = null;
        componentData.components[dropdownId]['option-ids'].forEach(optionId => {
            if (componentData.components[dropdownId]['options'][optionId]['value'] === value) {
                res = optionId;
            }
        });
        return res;
    }
    
    return {
        addDropdown,
        deleteDropdown,
        getDropdownData,
        setDropdownLabel,
        setDropdownTextColor,
        shiftDropdownUp,
        shiftDropdownDown,
        addDropdownOption,
        deleteDropdownOption,
        editDropdownOption,
        shiftDropdownOptionUp,
        shiftDropdownOptionDown,
        findOptionLabel,
        findOptionValue
    }

}

export default DropdownManager;