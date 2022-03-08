import UIItemTypes from "./UIItemTypes";

const componentCompatibility = (parentComponent) => {
    if (parentComponent === UIItemTypes.ACTIVITY)
        return [UIItemTypes.SECTION];
    else if (parentComponent === UIItemTypes.SECTION)
        return [UIItemTypes.NONE];
    else
        return [UIItemTypes.NONE];
}

export default componentCompatibility;