import ActivityProperties from '../ui-component-properties/ActivityProperties';
import './Properties.css';

const Properties = (props) => {
    const { selectedComponent, activityManager, currentActivity } = props;

    return (
        selectedComponent === 'None' ?
            <div id='properties-no-component'>
                <h1>Properties</h1>
                <p>No component is selected.</p>
            </div>
            : <div>
                <h1 className={'panel-heading'}>Properties</h1>
                <h2 className={'panel-subheading'}>{selectedComponent}</h2>
                { selectedComponent === 'Activity' && <ActivityProperties activityManager={activityManager} currentActivity={currentActivity} /> }
            </div>
    );

}

export default Properties;