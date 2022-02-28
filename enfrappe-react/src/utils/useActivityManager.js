import { useState } from 'react';

const useActivityManager = () => {
    const [activityData, setActivityData] = useState({});

    // Function for adding activity
    const addActivity = (activityName) => {
        setActivityData({...activityData, [activityName]: {
            'name': activityName, 
            'background': '#ffffff', 
            'data': {}
        }});
    }

    // Function for removing activity
    const removeActivity = (activityName) => {
        const newActivityData = {...activityData};
        delete newActivityData[activityName];
        setActivityData(newActivityData);
    }

    // Function for modifying activity name
    const editActivityName = (activityName, newActivityName) => {
        const newActivityData = {...activityData};
        console.log(newActivityData);
        newActivityData[newActivityName] = newActivityData[activityName];
        newActivityData[newActivityName]['name'] = newActivityName;
        delete newActivityData[activityName];
        setActivityData(newActivityData);
    }

    // Function for modifying activity background
    const editActivityBackground = (activityName, newBackground) => {
        const newActivityData = {...activityData};
        newActivityData[activityName]['background'] = newBackground;
        setActivityData(newActivityData);
    }

    // Function for modifying activity data
    const editActivityData = (activityName, data) => {
        const newActivityData = {...activityData};
        newActivityData[activityName]['data'] = data;
        setActivityData(newActivityData);
    }

    // Function for returning activity data
    const getActivity = (activityName) => {
        return activityData[activityName];
    }

    // Function for returning activity data
    const getAllActivityNames = () => {
        return Object.keys(activityData);
    }

    // Packaging functions under a single object
    return {
        getActivity: getActivity,
        addActivity: addActivity,
        removeActivity: removeActivity,
        activityEditor: {
            editActivityName: editActivityName,
            editActivityBackground: editActivityBackground,
            editActivityData: editActivityData
        },
        getAllActivityNames: getAllActivityNames
    }
}

export default useActivityManager;

