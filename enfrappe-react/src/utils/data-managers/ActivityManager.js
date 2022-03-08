import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const ActivityManager = (componentData, setComponentData) => {

    // Function for getting activity ID from activity name
    const getActivityId = (activityName) => {
        for (const key in componentData.components)
            if (componentData.components[key]['name'] === activityName)
                return key
        return undefined;
    }

    // Function for getting list of all activity names
    const getAllActivityNames = () => {
        const activityNames = [];
        componentData['activity-sequence'].forEach(activityId => {
            activityNames.push(componentData.components[activityId]['name']);
        });
            
        return activityNames;
    }

    // Function for getting metada of a specific activity
    const getActivityData = (activityName) => {
        const activityId = getActivityId(activityName);
        if (!activityId) return undefined;
        return componentData.components[activityId];
    }

    // Function for adding activity
    const addActivity = (activityName) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now(),
        }
        newComponentData['activity-sequence'].push(newId);
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.ACTIVITY);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['name'] = activityName;
        setComponentData(newComponentData);
    }

    // Function for deleting activity
    const deleteActivity = (activityName) => {
        const newComponentData = {
            ...componentData,
            'activity-sequence': componentData['activity-sequence'].filter(id => id !== getActivityId(activityName)), 
            'last-edited': Date.now()
        };
        // TODO: Delete all children attached to this activity
        delete newComponentData.components[getActivityId(activityName)];
        setComponentData(newComponentData);
    }

    // Function for modifying activity name
    const setActivityName = (activityName, newActivityName) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        };
        newComponentData.components[getActivityId(activityName)]['name'] = newActivityName;
        setComponentData(newComponentData);
    }

    // Function for modifying activity background
    const setActivityBackground = (activityName, newBackground) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        };
        newComponentData.components[getActivityId(activityName)]['background'] = newBackground;
        setComponentData(newComponentData);
    }

    return {
        addActivity,
        deleteActivity,
        setActivityName,
        setActivityBackground,
        getActivityId,
        getAllActivityNames,
        getActivityData
    }
}

export default ActivityManager;