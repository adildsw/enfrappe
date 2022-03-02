import { Divider } from 'semantic-ui-react';

import ActivityProperties from '../ui-component-properties/ActivityProperties';
import './Properties.css';

const Properties = (props) => {
    const { selectedComponent, setSelectedComponent, activityManager, currentActivity, setCurrentActivity } = props;

    return (
        selectedComponent.type === 'None' ?
            <div id='properties-no-component'>
                <h1>Properties</h1>
                <p>No component is selected.</p>
            </div>
            : 
            <div className={'scrollable-div'}>
                <div>
                    <h1 className={'panel-heading'}>Properties</h1>
                    <h3 className={'panel-subheading'}>{selectedComponent.type}</h3>
                </div>
                <Divider />
                <div className={'scrollable-section'}>
                    { selectedComponent.type === 'Activity' && 
                        <ActivityProperties 
                            activityManager={activityManager} 
                            currentActivity={currentActivity} 
                            setCurrentActivity={setCurrentActivity}
                            setSelectedComponent={setSelectedComponent} /> 
                    }
                </div>
            </div>
    );
}

export default Properties;