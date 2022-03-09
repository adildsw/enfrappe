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
        'background': "#EEEEEE",
        'text-color': "#000000",
        'children': [],
        'parent': ''
    },
    [UIItemTypes.BUTTON]: {
        'type': UIItemTypes.BUTTON,
        'id': '',
        'text': 'Button',
        'background': '#CCCCCC',
        'text-color': '#000000',
        'parent': '',
        'on-press': ''
    },
    [UIItemTypes.TEXT]: {
        'type': UIItemTypes.TEXT,
        'id': '',
        'text': 'Text content here.',
        'text-color': '#000000',
        'bold': false,
        'italic': false,
        'parent': '',
    },
    [UIItemTypes.INPUT]: {
        'type': UIItemTypes.INPUT,
        'id': '',
        'label': 'Label',
        'placeholder': 'Placeholder',
        'text-color': '#000000',
        'parent': '',
    },
    [UIItemTypes.CHECKBOX]: {
        'type': UIItemTypes.CHECKBOX,
        'id': '',
        'label': 'Label',
        'text-color': '#000000',
        'parent': '',
    },
    [UIItemTypes.RADIO]: {
        'type': UIItemTypes.RADIO,
        'id': '',
        'label': 'Label',
        'options': [],
        'text-color': '#000000',
        'parent': '',
    },
    [UIItemTypes.DROPDOWN]: {
        'type': UIItemTypes.DROPDOWN,
        'id': '',
        'label': 'Label',
        'options': [],
        'text-color': '#000000',
        'parent': '',
    },
}

const getDefaultComponentData = (componentType) => {
    return deepcopy(DefaultComponentData[componentType]);
};

export default getDefaultComponentData;
