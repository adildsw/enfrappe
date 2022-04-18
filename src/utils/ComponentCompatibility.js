import UIItemTypes from "./UIItemTypes";

const getComponentCompatibility = (parentComponent) => {
    if (parentComponent === UIItemTypes.ACTIVITY)
        return [UIItemTypes.SECTION];
    else if (parentComponent === UIItemTypes.SECTION)
        return [UIItemTypes.BUTTON, UIItemTypes.CHART, UIItemTypes.CHECKBOX, UIItemTypes.DROPDOWN, UIItemTypes.DATAVIEWER, UIItemTypes.INPUT, UIItemTypes.RADIO, UIItemTypes.TEXT];
    else
        return [UIItemTypes.NONE];
}

export default getComponentCompatibility;