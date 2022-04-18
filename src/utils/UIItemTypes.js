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
    CHART: 'enfrappe-ui-chart',
}

const UIItemNames = {
    [UIItemTypes.ACTIVITY]: 'Activity',
    [UIItemTypes.SECTION]: 'Section',
    [UIItemTypes.BUTTON]: 'Button',
    [UIItemTypes.TEXT]: 'Text',
    [UIItemTypes.INPUT]: 'Input Field',
    [UIItemTypes.CHECKBOX]: 'Checkbox',
    [UIItemTypes.RADIO]: 'Radio Group',
    [UIItemTypes.DROPDOWN]: 'Dropdown',
    [UIItemTypes.DATAVIEWER]: 'Data Viewer',
    [UIItemTypes.CHART]: 'Chart',
}

const basicComponents = [
    UIItemTypes.SECTION,
    UIItemTypes.BUTTON,
    UIItemTypes.TEXT,
    UIItemTypes.INPUT,
    UIItemTypes.CHECKBOX,
    UIItemTypes.RADIO,
    UIItemTypes.DROPDOWN
];

export const isComponentBasic = (componentType) => {
    if (basicComponents.includes(componentType)) {
        return true;
    }
    return false;
}

export const getUIItemName = (componentType) => {
    return UIItemNames[componentType];
}

export default UIItemTypes;