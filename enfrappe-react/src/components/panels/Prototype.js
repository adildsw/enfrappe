import { Button, Dropdown, Grid } from 'semantic-ui-react'

import Activity from '../ui-components/Activity';

import './Prototype.css';

const Prototype = (props) => {

    const { activityManager, currentActivity, setCurrentActivity } = props;
    const { addActivity, removeActivity, activityEditor, getAllActivityNames } = activityManager;

    // Returns activity control button states
    const setControlButtonState = (buttonID) => {
        if (buttonID === 'previous' || buttonID === 'remove') {
            return getAllActivityNames().findIndex(activityName => activityName === currentActivity) === 0 ? true : false;
        } 
        else if (buttonID === 'next') {
            return getAllActivityNames().findIndex(activityName => activityName === currentActivity) === getAllActivityNames().length - 1 ? true : false;
        } 
        else if (buttonID === 'add') {
            return getAllActivityNames().length > 5 ? true : false;
        }
    }

    // Function to navigate to specified activity
    const navigateToActivity = (activityName) => {
        // Defining activity navigation landmarks
        const currentIdx = getAllActivityNames().findIndex(activity => activity === currentActivity);
        if (activityName === 'previous')
            activityName = getAllActivityNames()[currentIdx - 1];
        else if (activityName === 'next')
            activityName = getAllActivityNames()[currentIdx + 1];
        else if (activityName === 'first')
            activityName = getAllActivityNames()[0];
        else if (activityName === 'last')
            activityName = getAllActivityNames()[getAllActivityNames().length - 1];
            
        setCurrentActivity(activityName);
    }

    const generateDropdownItems = () => (
        activityManager.getAllActivityNames().map(activityName => (
            {'key' : activityName,
            'text' : activityName,
            'value' : activityName}
        ))
    )

    return (
        <div id='prototype-controls'>
            <div id='activity-selection-control'>
                <span>Activity: <Dropdown
                    placeholder='Select Activity'
                    inline
                    value={currentActivity}
                    options={generateDropdownItems()}
                    onChange={(e, data) => { setCurrentActivity(data.value); console.log(data.value); }} />
                </span>
            </div>

            <div id='activities-list-div'>
                <Activity currentActivity={currentActivity} activityManager={activityManager} />
            </div>

            <div id='activity-navigation-controls'>
                <Grid>
                    <Grid.Column textAlign='center'>
                        <Button.Group>
                            <Button
                                icon='chevron left'
                                disabled={setControlButtonState('previous')}
                                onClick={() => { navigateToActivity('previous'); }}
                            />
                            <Button 
                                icon='trash' 
                                disabled={setControlButtonState('remove')}
                                onClick={() => { 
                                    const activityToBeRemoved = currentActivity;
                                    navigateToActivity('previous');
                                    removeActivity(activityToBeRemoved); 
                                }}
                            />
                            <Button 
                                icon='add' 
                                disabled={setControlButtonState('add')}
                                onClick={() => { 
                                    const activityName = 'Activity-' + (getAllActivityNames().length + 1);
                                    addActivity(activityName);
                                    navigateToActivity(activityName);
                                }}
                            />
                            <Button 
                                icon='chevron right' 
                                disabled={setControlButtonState('next')} 
                                onClick={() => { navigateToActivity('next'); }}
                            />
                            
                            {/* Test Button */}
                            <Button 
                                icon='question' 
                                onClick={() => { 
                                    // activityEditor.editActivityName('Main Activity', 'lmao this works?');
                                    // console.log(currentActivity);
                                    // activityManager.getActivity('Main Activity').changeName('lmao this works?');
                                    // navigateToActivity('lmao this works?')
                                    // console.log("thy bidding is done");
                                    console.log("thy haven't give me a bidding master");
                                }}
                            />
                        </Button.Group>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    );
    
}

export default Prototype;