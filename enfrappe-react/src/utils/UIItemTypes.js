const UIItemTypes = {
    UIID: 'enfrappe-ui-',
    NONE: 'none',
    SECTION: 'enfrappe-ui-section',
    ACTIVITY: 'enfrappe-ui-activity'
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