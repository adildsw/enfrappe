import { useState } from 'react';
import nextId from 'react-id-generator';

const useActivityManager = () => {
    const [activityData, setActivityData] = useState({'last-edited': Date.now(), 'data': {}});

    // Function for adding activity
    const addActivity = (activityName) => {
        // setActivityData({...activityData, [nextId()]: {
        //     'name': activityName, 
        //     'background': '#ffffff', 
        //     'data': {},
        // }});

        setActivityData({...activityData, 
            'last-edited': Date.now(), 
            'data': {...activityData.data, [nextId()]: {
                'name': activityName, 
                'background': '#ffffff', 
                'data': {},
            }
        }});
    }

    // Function for deleting activity
    const deleteActivity = (activityName) => {
        // const newActivityData = {...activityData};
        // delete newActivityData[getActivityId(activityName)];
        // setActivityData(newActivityData);

        const newActivityData = {...activityData, 'last-edited': Date.now()};
        delete newActivityData.data[getActivityId(activityName)];
        setActivityData(newActivityData);
    }

    // Function for modifying activity name
    const editActivityName = (activityName, newActivityName) => {
        // const newActivityData = {...activityData};
        // newActivityData[getActivityId(activityName)]['name'] = newActivityName;
        // setActivityData(newActivityData);
        
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        newActivityData.data[getActivityId(activityName)]['name'] = newActivityName;
        setActivityData(newActivityData);
    }

    // Function for modifying activity background
    const editActivityBackground = (activityName, newBackground) => {
        // const newActivityData = {...activityData};
        // newActivityData[getActivityId(activityName)]['background'] = newBackground;
        // setActivityData(newActivityData);
        
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        newActivityData.data[getActivityId(activityName)]['background'] = newBackground;
        setActivityData(newActivityData);
    }

    // Function for modifying activity data
    const editActivityData = (activityName, data) => {
        // const newActivityData = {...activityData};
        // newActivityData[getActivityId(activityName)]['data'] = data;
        // setActivityData(newActivityData);
        
        const newActivityData = {...activityData, 'last-edited': Date.now()};
        newActivityData.data[getActivityId(activityName)]['data'] = data;
        setActivityData(newActivityData);
    }

    // Function for getting activity ID from activity name
    const getActivityId = (activityName) => {
        // for (const key in activityData)
        //     if (activityData[key]['name'] === activityName)
        //         return key
        // return undefined;

        for (const key in activityData.data)
            if (activityData.data[key]['name'] === activityName)
                return key
        return undefined;
    }

    // Function for returning activity data
    const getActivity = (activityName) => {
        // return activityData[getActivityId(activityName)];
        return activityData.data[getActivityId(activityName)];
    }

    // Function for returning activity data
    const getAllActivityNames = () => {
        // const activityNames = [];
        // for (const key in activityData)
        //     activityNames.push(activityData[key]['name']);
        // return activityNames;
        
        const activityNames = [];
        for (const key in activityData.data)
            activityNames.push(activityData.data[key]['name']);
        return activityNames;
    }

    // Function for returning activity data object
    const getActivityDataObject = () => {
        return activityData;
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
        loadActivityData: setActivityData
    }
}

export default useActivityManager;

