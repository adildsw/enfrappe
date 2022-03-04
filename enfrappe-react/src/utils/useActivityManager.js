import { useState } from 'react';
import nextId from 'react-id-generator';

import { modifyKeyInDict, getValueFromDict } from './helperFunctions';

import { defaultActivityData } from './defaultComponentData';

const useActivityManager = () => {
    const [activityData, setActivityData] = useState({'last-edited': Date.now(), 'activities': {}});

    // Function for adding activity
    const addActivity = (activityName) => {
        const newId = nextId();
        setActivityData({...activityData, 
            'last-edited': Date.now(), 
            'activities': {...activityData.activities, [newId]: {...defaultActivityData, 'id': newId, 'name': activityName}}
        });
    }

    // Function for deleting activity
    const deleteActivity = (activityName) => {
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        delete newActivityData.activities[getActivityId(activityName)];
        setActivityData(newActivityData);
    }

    // Function for modifying activity name
    const editActivityName = (activityName, newActivityName) => {
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        newActivityData.activities[getActivityId(activityName)]['name'] = newActivityName;
        setActivityData(newActivityData);
    }

    // Function for modifying activity background
    const editActivityBackground = (activityName, newBackground) => {
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        newActivityData.activities[getActivityId(activityName)]['background'] = newBackground;
        setActivityData(newActivityData);
    }

    // Function for modifying activity data
    const editActivityData = (activityName, data) => {
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        newActivityData.activities[getActivityId(activityName)]['data'] = data;
        setActivityData(newActivityData);
    }

    // Function for getting activity ID from activity name
    const getActivityId = (activityName) => {
        for (const key in activityData.activities)
            if (activityData.activities[key]['name'] === activityName)
                return key
        return undefined;
    }

    // Function for returning activity data
    const getActivity = (activityName) => {
        return activityData.activities[getActivityId(activityName)];
    }

    // Function for returning activity data
    const getAllActivityNames = () => {
        const activityNames = [];
        for (const key in activityData.activities)
            activityNames.push(activityData.activities[key]['name']);
        return activityNames;
    }

    // Function for returning activity data object
    const getActivityDataObject = () => {
        return activityData;
    }

    const addComponent = (parentId, componentData) => {
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        const parentComp = getValueFromDict(newActivityData, parentId);
        console.log("erverything", activityData);
        console.log("hello", parentId, parentComp);
        const compId = nextId();
        parentComp['data']['sequence'].push(compId);
        parentComp['data']['components'][compId] = {...componentData, 'id': compId};
        setActivityData(newActivityData);
    }

    // Packaging functions under a single object
    return {
        getActivity,
        addActivity,
        deleteActivity,
        activityEditor: {
            editActivityName: editActivityName,
            editActivityBackground: editActivityBackground,
            editActivityData: editActivityData
        },
        getAllActivityNames,
        getActivityId,
        getActivityDataObject,
        activityData,
        loadActivityData: setActivityData,
        addComponent
    }
}

export default useActivityManager;

