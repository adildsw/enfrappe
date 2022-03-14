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

    // Function for getting activity name from activity ID
    const getActivityName = (activityId) => {
        return componentData.components[activityId]['name'];
    }

    // Function for getting list of all activity names
    const getAllActivityNames = () => {
        const activityNames = [];
        componentData['activity-sequence'].forEach(activityId => {
            activityNames.push(componentData.components[activityId]['name']);
        });
        return activityNames;
    }

    const getAllActivityIds = () => {
        return componentData['activity-sequence'];
    }

    // Function for getting activity data
    const getActivityData = (activityId) => {
        return componentData.components[activityId];
    }

    // Function for adding activity
    const addActivity = () => {
        const newId = nextId();
        var newActivityName = 'New Activity';
        var newActivityCounter = 1;
        while (getAllActivityNames().includes(newActivityName))
            newActivityName = 'New Activity (' + (newActivityCounter++) + ')';
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now(),
        }
        newComponentData['activity-sequence'].push(newId);
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.ACTIVITY);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['name'] = newActivityName;
        setComponentData(newComponentData);
        return newId;
    }

    // Function for deleting activity
    const deleteActivity = (activityId) => {
        const newComponentData = {
            ...componentData,
            'activity-sequence': componentData['activity-sequence'].filter(id => id !== activityId),
            'last-edited': Date.now()
        };

        // Deleting child components
        newComponentData.components[activityId].children.forEach(childId => {
            if (newComponentData.components[childId].hasOwnProperty('children')) {
                newComponentData.components[childId].children.forEach(grandChildId => {
                    delete newComponentData.components[grandChildId];
                });
            }
            delete newComponentData.components[childId];
        });

        // Deleting button links to activity
        Object.keys(newComponentData.components).forEach(compId => {
            var component = newComponentData.components[compId];
            if (component.hasOwnProperty('on-press-activity')) {
                if (component['on-press-activity'] === activityId)
                    component['on-press-activity'] = 'none';
            }
        });

        delete newComponentData.components[activityId];
        setComponentData(newComponentData);
    }

    // Function for modifying activity name
    const setActivityName = (activityId, newActivityName) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        };
        newComponentData.components[activityId]['name'] = newActivityName;
        setComponentData(newComponentData);
    }

    // Function for modifying activity background
    const setActivityBackground = (activityId, newBackground) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        };
        newComponentData.components[activityId]['background'] = newBackground;
        setComponentData(newComponentData);
    }

    return {
        addActivity,
        deleteActivity,
        setActivityName,
        setActivityBackground,
        getActivityId,
        getActivityName,
        getAllActivityNames,
        getActivityData,
        getAllActivityIds
    }
}

export default ActivityManager;