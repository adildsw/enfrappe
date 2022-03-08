import { useState } from 'react';
import { Button, Dropdown, Grid, Modal, Header, Icon } from 'semantic-ui-react'

import UIItemTypes from '../../utils/UIItemTypes';
import { DEFAULT_ACTIVITY_NAME } from '../../utils/DefaultComponentData';

import Activity from '../ui-components/Activity';

import './Prototype.css';

const Prototype = (props) => {

    const { componentManager, currentActivity, setCurrentActivity, selectedComponent, setSelectedComponent } = props;

    const { activityManager } = componentManager;
    const { addActivity, deleteActivity, getAllActivityNames } = activityManager;

    const [deleteActivityModalState, setDeleteActivityModalState] = useState(false);

    // Returns activity control button states
    const setControlButtonState = (buttonId) => {
        if (buttonId === 'previous' || buttonId === 'delete') {
            return getAllActivityNames().findIndex(activityName => activityName === currentActivity) === 0 ? true : false;
        } 
        else if (buttonId === 'next') {
            return getAllActivityNames().findIndex(activityName => activityName === currentActivity) === getAllActivityNames().length - 1 ? true : false;
        } 
        else if (buttonId === 'add') {
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

    // Generates activity dropdown items
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
                    onChange={(e, data) => { setCurrentActivity(data.value); setSelectedComponent({'id': 'None', 'type': UIItemTypes.NONE}); }} />
                </span>
            </div>

            <div id='activities-list-div'>
                <Activity currentActivity={currentActivity} selectedComponent={selectedComponent} componentManager={componentManager} />
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
                                disabled={setControlButtonState('delete')}
                                onClick={() => { 
                                    if (currentActivity !== DEFAULT_ACTIVITY_NAME)
                                        setDeleteActivityModalState(true);
                                }}
                            />
                            <Button 
                                icon='add' 
                                disabled={setControlButtonState('add')}
                                onClick={() => { 
                                    var newActivityName = 'New Activity';
                                    var newActivityCounter = 1;
                                    while (activityManager.getAllActivityNames().includes(newActivityName))
                                        newActivityName = 'New Activity (' + (newActivityCounter++) + ')';
                                    addActivity(newActivityName);
                                    navigateToActivity(newActivityName);
                                }}
                            />
                            <Button 
                                icon='chevron right' 
                                disabled={setControlButtonState('next')} 
                                onClick={() => { navigateToActivity('next'); }}
                            />
                            
                            {/* Test Button */}
                            {/* <Button 
                                icon='question' 
                                onClick={() => { 
                                    console.log(activityManager.getActivityData(DEFAULT_ACTIVITY_NAME));
                                    setActivityName(DEFAULT_ACTIVITY_NAME, 'lmao this works?');
                                    console.log("thy haven't give me a bidding master");
                                }}
                            /> */}
                        </Button.Group>

                        <Modal
                            basic
                            size='small'
                            open={deleteActivityModalState}
                            onClose={() => { setDeleteActivityModalState(false); }}>
                            <Header as='h2' icon inverted>
                                <Icon name='trash' />
                                Delete Activity
                                <Header.Subheader>Are you sure you want to delete this activity?</Header.Subheader>
                            </Header>
                            <Modal.Actions style={{'textAlign': 'center'}}>
                                <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteActivityModalState(false); }} />
                                <Button icon='trash' color='red' content='Delete Activity' inverted onClick={() => {
                                    setDeleteActivityModalState(false);
                                    const activityToBeDeleted = currentActivity;
                                    navigateToActivity('previous');
                                    deleteActivity(activityToBeDeleted); 
                                }} 
                            />
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    );
    
}

export default Prototype;