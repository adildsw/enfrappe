import DropItemTypes from "./DropItemTypes"

const componentCompatibility = (parentComponent) => {
    if (parentComponent === 'activity')
        return [DropItemTypes.SECTION];
    else if (parentComponent === 'section')
        return [DropItemTypes.NONE];
    else
        return [DropItemTypes.NONE];
}

export default componentCompatibility;