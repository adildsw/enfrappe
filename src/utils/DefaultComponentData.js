import * as deepcopy from 'deepcopy';
import nextId from 'react-id-generator';

import UIItemTypes from './UIItemTypes';

export const DEFAULT_ACTIVITY_NAME = 'Main Activity';
export const DEFAULT_ACTIVITY_ID = 'main-activity';

const RADIO_DEFAULT_OPTIONA_ID = nextId();
const RADIO_DEFAULT_OPTIONB_ID = nextId();
const DROPDOWN_DEFAULT_OPTION_ID = nextId();

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
        'on-press-action-type': 'api', // 'activity': for changing activity, 'api': for RESTful API call
        'on-press-activity': 'none',
        'on-press-api-result-display-type': 'toast', // 'none, 'toast', 'prompt'
        'on-press-api-call-type': 'GET', // 'GET', 'POST'
        'on-press-api-url': '/',
        'on-press-api-params': [],
        'on-press-api-custom-params': {},
    },
    [UIItemTypes.TEXT]: {
        'type': UIItemTypes.TEXT,
        'id': '',
        'text': 'Text content here.',
        'text-color': '#000000',
        'size': 'small', // 'large', 'medium', 'small'
        'align': 'left', // 'left', 'center', 'right', 'justify'
        'bold': false,
        'italic': false,
        'underline': false,
        'tight': false,
        'parent': '',
    },
    [UIItemTypes.INPUT]: {
        'type': UIItemTypes.INPUT,
        'id': '',
        'name': '',
        'label': 'Label',
        'placeholder': 'Placeholder',
        'text-color': '#000000',
        'parent': '',
    },
    [UIItemTypes.CHECKBOX]: {
        'type': UIItemTypes.CHECKBOX,
        'id': '',
        'name': '',
        'label': 'Label',
        'text-color': '#000000',
        'parent': '',
    },
    [UIItemTypes.RADIO]: {
        'type': UIItemTypes.RADIO,
        'id': '',
        'name': '',
        'label': 'Label',
        'option-ids': [RADIO_DEFAULT_OPTIONA_ID, RADIO_DEFAULT_OPTIONB_ID],
        'options': {
            [RADIO_DEFAULT_OPTIONA_ID]: {'value': 'A', 'label': 'Option A'}, 
            [RADIO_DEFAULT_OPTIONB_ID]: {'value': 'B', 'label': 'Option B'}, 
        },
        'text-color': '#000000',
        'parent': '',
    },
    [UIItemTypes.DROPDOWN]: {
        'type': UIItemTypes.DROPDOWN,
        'id': '',
        'name': '',
        'label': 'Label',
        'option-ids': [DROPDOWN_DEFAULT_OPTION_ID],
        'options': {
            [DROPDOWN_DEFAULT_OPTION_ID]: {'value': 'A', 'label': 'Option A'}
        },
        'text-color': '#000000',
        'parent': '',
    },
    [UIItemTypes.DATAVIEWER]: {
        'type': UIItemTypes.DATAVIEWER,
        'id': '',
        'text': 'Server data here.',
        'text-color': '#000000',
        'size': 'small', // 'large', 'medium', 'small'
        'align': 'left', // 'left', 'center', 'right', 'justify'
        'bold': false,
        'italic': false,
        'underline': false,
        'tight': false,
        'refresh-interval': 0,
        'parent': '',
        'on-press-api-call-type': 'GET', // 'GET', 'POST'
        'on-press-api-url': '/',
        'on-press-api-custom-params': {},
    }
}

const getDefaultComponentData = (componentType) => {
    return deepcopy(DefaultComponentData[componentType]);
};

export default getDefaultComponentData;
