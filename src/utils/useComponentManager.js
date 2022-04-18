import { useState } from 'react';

import ActivityManager from './data-managers/ActivityManager';
import SectionManager from './data-managers/SectionManager';
import ButtonManager from './data-managers/ButtonManager';
import TextManager from './data-managers/TextManager';
import InputManager from './data-managers/InputManager';
import CheckboxManager from './data-managers/CheckboxManager';
import RadioManager from './data-managers/RadioManager';
import DropdownManager from './data-managers/DropdownManager';

import getDefaultComponentData from './DefaultComponentData';

import { DEFAULT_ACTIVITY_NAME, DEFAULT_ACTIVITY_ID } from './DefaultComponentData';

import UIItemTypes from './UIItemTypes';
import DataViewerManager from './data-managers/DataViewerManager';
import ChartManager from './data-managers/ChartManager';

const initActivityData = getDefaultComponentData(UIItemTypes.ACTIVITY);
initActivityData['id'] = DEFAULT_ACTIVITY_ID;
initActivityData['name'] = DEFAULT_ACTIVITY_NAME;

const useComponentManager = () => {

    const [componentData, setComponentData] = useState({
        'last-edited': Date.now(), 
        'activity-sequence': [DEFAULT_ACTIVITY_ID],
        'components': {
            [DEFAULT_ACTIVITY_ID]: { ...initActivityData }
        }
    });

    const activityManager = ActivityManager(componentData, setComponentData);
    const sectionManager = SectionManager(componentData, setComponentData);
    const buttonManager = ButtonManager(componentData, setComponentData);
    const textManager = TextManager(componentData, setComponentData);
    const inputManager = InputManager(componentData, setComponentData);
    const checkboxManager = CheckboxManager(componentData, setComponentData);
    const radioManager = RadioManager(componentData, setComponentData);
    const dropdownManager = DropdownManager(componentData, setComponentData);
    const dataViewerManager = DataViewerManager(componentData, setComponentData);
    const chartManager = ChartManager(componentData, setComponentData);

    const getComponent = (componentId) => {
        return componentData.components[componentId];
    }

    const getAllUserInputComponentNames = () => {
        const userInputComponentNames = [];
        Object.keys(componentData.components).forEach(component => {
            if (componentData.components[component].hasOwnProperty('name'))
                userInputComponentNames.push(componentData.components[component].name);
        });
        return userInputComponentNames;
    }

    const getUserInputIdByName = (name) => {
        const userInputId = Object.keys(componentData.components).find(component => {
            if (componentData.components[component].hasOwnProperty('name'))
                return componentData.components[component].name === name;
            else
                return false;
        });
        return userInputId;
    }

    return {
        activityManager,
        sectionManager,
        buttonManager,
        textManager,
        inputManager,
        checkboxManager,
        radioManager,
        dropdownManager,
        dataViewerManager,
        chartManager,
        getComponent,
        getAllUserInputComponentNames,
        getUserInputIdByName,
        componentData,
        setComponentData
    }
}

export default useComponentManager;