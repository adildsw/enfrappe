import { useEffect, useState } from 'react';

import './Activity.css';
import Section from './Section';
import DnDSpace from './ui-component-utils/DnDSpace';
import componentCompatibility from '../../utils/ComponentCompatibility';
import UIItemTypes from '../../utils/UIItemTypes';

const Activity = (props) => {

    const { currentActivity, selectedComponent, componentManager } = props;
    const { activityManager, getComponent } = componentManager;
    const { getActivityData, getActivityId } = activityManager;

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
                    <Section key={child} selectedComponent={selectedComponent} componentId={child} componentManager={componentManager} />
                );
            }
        });
        return activityComponents;
    };

    return (
        <div className={'enfrappe-ui-activity' + (selectedComponent.id === getActivityId(currentActivity) ? ' selected-component' : '')} id={getActivityId(currentActivity)} style={{height: containerHeight, width: containerWidth, background: getActivityData(currentActivity).background}}>
            <div className={'enfrappe-ui-activitycontent'} id={getActivityId(currentActivity)}>
                {generateActivityComponents()}
                <DnDSpace 
                    id={getActivityId(currentActivity)} 
                    className={'enfrappe-ui-activitydndspace'} 
                    centered={getActivityData(currentActivity)['children'].length === 0} 
                    acceptedItems={componentCompatibility('activity')} 
                    componentManager={componentManager}
                />
            </div>
        </div>
    );

}

export default Activity;