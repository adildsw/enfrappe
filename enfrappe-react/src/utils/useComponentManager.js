import { useState } from 'react';

import ActivityManager from './data-managers/ActivityManager';
import SectionManager from './data-managers/SectionManager';

import getDefaultComponentData from './DefaultComponentData';

import { DEFAULT_ACTIVITY_NAME, DEFAULT_ACTIVITY_ID } from './DefaultComponentData';

import UIItemTypes from './UIItemTypes';

const useComponentManager = () => {

    const initActivityData = getDefaultComponentData(UIItemTypes.ACTIVITY);
    initActivityData['id'] = DEFAULT_ACTIVITY_ID;
    initActivityData['name'] = DEFAULT_ACTIVITY_NAME;

    const [componentData, setComponentData] = useState({
        'last-edited': Date.now(), 
        'activity-sequence': [DEFAULT_ACTIVITY_ID],
        'components': {
            [DEFAULT_ACTIVITY_ID]: { ...initActivityData }
        }
    });

    const activityManager = ActivityManager(componentData, setComponentData);
    const sectionManager = SectionManager(componentData, setComponentData);

    const getComponent = (componentId) => {
        return componentData.components[componentId];
    }

    return {
        activityManager,
        sectionManager,
        getComponent,
        componentData,
        setComponentData
    }
}

export default useComponentManager;