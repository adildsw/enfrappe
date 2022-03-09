import UIItemTypes from "./UIItemTypes";

const getComponentCompatibility = (parentComponent) => {
    if (parentComponent === UIItemTypes.ACTIVITY)
        return [UIItemTypes.SECTION];
    else if (parentComponent === UIItemTypes.SECTION)
        return [UIItemTypes.BUTTON, UIItemTypes.CHECKBOX, UIItemTypes.INPUT, UIItemTypes.TEXT];
    else if (parentComponent === UIItemTypes.BUTTON)
        return [UIItemTypes.NONE];
    else if (parentComponent === UIItemTypes.TEXT)
        return [UIItemTypes.NONE];
    else
        return [UIItemTypes.NONE];
}

export default getComponentCompatibility;