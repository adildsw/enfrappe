import { useEffect, useState } from 'react';

import SectionLive from './SectionLive';
import UIItemTypes from '../../../utils/UIItemTypes';

import '../Activity.css';

const ActivityLive = (props) => {

    const { appManager, currentActivity, setCurrentActivity, componentManager, liveData, updateLiveData } = props;
    const { activityManager, getComponent } = componentManager;
    const { getActivityData } = activityManager;

    // Storing activity container dimension states
    const [{containerHeight, containerWidth}, setContainerDim] = useState({containerHeight: 0, containerWidth: 0});

    // Function for resizing activity container dimensions based on panel size
    const resizeContainer = () => {
        const spaceHeight = window.innerHeight;
        const spaceWidth = window.innerWidth * 6 / 16;
        if (spaceHeight/spaceWidth > 16/9)
            setContainerDim({containerHeight: 0.75 * spaceWidth * 16/9, containerWidth: 0.75 * spaceWidth});
        else
            setContainerDim({containerHeight: 0.75 * spaceHeight, containerWidth: 0.75 * spaceHeight * 9/16});
    };

    // Initializing activity container and setting up resize listener
    useEffect(() => {
        resizeContainer();
        window.addEventListener('resize', () => { resizeContainer(); });
    }, []);

    const generateActivityComponents = () => {
        const { children } = getActivityData(currentActivity);
        let activityComponents = [];
        children.forEach(child => {
            const childData = getComponent(child);
            if (childData.type === UIItemTypes.SECTION) {
                activityComponents.push(
                    <SectionLive appManager={appManager} key={child} setCurrentActivity={setCurrentActivity} componentId={child} componentManager={componentManager} liveData={liveData} updateLiveData={updateLiveData} />
                );
            }
        });
        return activityComponents;
    };

    return (
        <div className={'enfrappe-ui-activity enfrappe-ui-activitylive'} id={currentActivity} style={{height: containerHeight, width: containerWidth, background: getActivityData(currentActivity).background}}>
            <div className={'enfrappe-ui-activitycontent'} id={currentActivity}>
                {generateActivityComponents()}
            </div>
        </div>
    );

}

export default ActivityLive;