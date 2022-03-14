import * as deepcopy from 'deepcopy';

import UIItemTypes from './UIItemTypes';
import { DEFAULT_ACTIVITY_NAME, DEFAULT_ACTIVITY_ID } from './DefaultComponentData';

const TemplateManager = {
    'EMPTY': {
        'app-data': {
            'app-id': 'com.me.frappeapp',
            'app-name': 'My Awesome Frappe App',
            'app-version': '1.0.0',
            'single-use': false,
            'location-linked': false,
            'notify-user': false,
            'server-address': '127.0.0.1',
            'server-port': '1803',
            'last-edited': Date.now()
        },
        'component-data': {
            'last-edited': Date.now(),
            'activity-sequence': [DEFAULT_ACTIVITY_ID],
            'components': {
                [DEFAULT_ACTIVITY_ID]: {
                    'type': UIItemTypes.ACTIVITY,
                    'id': DEFAULT_ACTIVITY_ID,
                    'name': DEFAULT_ACTIVITY_NAME,
                    'background': '#ffffff',
                    'children': []
                }
            }
        }
    },
}

const getAppTemplate = (type) => {
    return deepcopy(TemplateManager[type]);
};

export default getAppTemplate;