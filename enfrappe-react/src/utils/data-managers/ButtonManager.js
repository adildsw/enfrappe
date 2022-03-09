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

    const setButtonOnPressEvent = (buttonId, onPressEvent) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[buttonId]['on-press'] = onPressEvent;
        setComponentData(newComponentData);
    }

    return {
        addButton,
        deleteButton,
        getButtonData,
        setButtonText,
        setButtonBackground,
        setButtonTextColor,
        setButtonOnPressEvent,
        shiftButtonUp,
        shiftButtonDown
    }
}

export default ButtonManager;