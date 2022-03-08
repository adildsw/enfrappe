import { Divider } from 'semantic-ui-react';

import UIItemTypes from '../../utils/UIItemTypes';
import { getUIItemName } from '../../utils/UIItemTypes';
import ActivityProperties from '../ui-component-properties/ActivityProperties';
import SectionProperties from '../ui-component-properties/SectionProperties';

import './Properties.css';

const Properties = (props) => {
    const { selectedComponent, setSelectedComponent, componentManager, currentActivity, setCurrentActivity } = props;
    const { activityManager, sectionManager } = componentManager;

    return (
        selectedComponent.type === UIItemTypes.NONE ?
            <div id='properties-no-component'>
                <h1>Properties</h1>
                <p>No component is selected.</p>
            </div>
            : 
            <div className={'scrollable-div'}>
                <div>
                    <h1 className={'panel-heading'}>Properties</h1>
                    <h3 className={'panel-subheading'}>{getUIItemName(selectedComponent.type)}</h3>
                </div>
                <Divider />
                <div className={'scrollable-section'}>
                    { selectedComponent.type === UIItemTypes.ACTIVITY && 
                        <ActivityProperties 
                            activityManager={activityManager} 
                            currentActivity={currentActivity} 
                            setCurrentActivity={setCurrentActivity}
                            setSelectedComponent={setSelectedComponent} 
                        /> 
                    }
                    {
                        selectedComponent.type === UIItemTypes.SECTION &&
                        <SectionProperties
                            activityManager={activityManager} 
                            sectionManager={sectionManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                </div>
            </div>
    );
}

export default Properties;