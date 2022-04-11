const UIItemTypes = {
    UIID: 'enfrappe-ui-',
    NONE: 'none',
    ACTIVITY: 'enfrappe-ui-activity',
    SECTION: 'enfrappe-ui-section',
    BUTTON: 'enfrappe-ui-button',
    TEXT: 'enfrappe-ui-text',
    INPUT: 'enfrappe-ui-input',
    CHECKBOX: 'enfrappe-ui-checkbox',
    RADIO: 'enfrappe-ui-radio',
    DROPDOWN: 'enfrappe-ui-dropdown',
    DATAVIEWER: 'enfrappe-ui-dataviewer',
}

export const getUIItemName = (componentType) => {
    let res = "None";
    Object.keys(UIItemTypes).forEach(key => {
        if (UIItemTypes[key] === componentType)
            res = key;
    });
    res = res.charAt(0).toUpperCase() + res.slice(1).toLowerCase();
    return res;
}

export default UIItemTypes;