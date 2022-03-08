import * as deepcopy from 'deepcopy';
import UIItemTypes from './UIItemTypes';

export const DEFAULT_ACTIVITY_NAME = 'Main Activity';
export const DEFAULT_ACTIVITY_ID = 'main-activity';

const DefaultComponentData = {
    [UIItemTypes.ACTIVITY]: {
        'type': UIItemTypes.ACTIVITY,
        'id': '',
        'name': '', 
        'background': '#ffffff', 
        'children': []
    },
    [UIItemTypes.SECTION]: {
        'type': UIItemTypes.SECTION,
        'id': '',
        'title': "Title",
        'subtitle': "Subtitle",
        'background': "#DDDDDD",
        'text-color': "#000000",
        'children': [],
        'parent': ''
    }
}

const getDefaultComponentData = (componentType) => {
    return deepcopy(DefaultComponentData[componentType]);
};

export default getDefaultComponentData;
