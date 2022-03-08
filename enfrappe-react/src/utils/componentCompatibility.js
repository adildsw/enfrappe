import UIItemTypes from "./UIItemTypes";

const componentCompatibility = (parentComponent) => {
    if (parentComponent === 'activity')
        return [UIItemTypes.SECTION];
    else if (parentComponent === 'section')
        return [UIItemTypes.NONE];
    else
        return [UIItemTypes.NONE];
}

export default componentCompatibility;