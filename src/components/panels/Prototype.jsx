import { useState } from 'react';
import { Button, Dropdown, Grid, Modal, Header, Icon } from 'semantic-ui-react'

import UIItemTypes from '../../utils/UIItemTypes';

import Activity from '../ui-components/Activity';

import './Prototype.css';

const Prototype = (props) => {

    const { componentManager, currentActivity, setCurrentActivity, selectedComponent, setSelectedComponent } = props;

    const { activityManager } = componentManager;
    const { addActivity, deleteActivity, getAllActivityIds, getActivityId } = activityManager;

    const [deleteActivityModalState, setDeleteActivityModalState] = useState(false);

    // Returns activity control button states
    const setControlButtonState = (buttonId) => {
        if (buttonId === 'previous' || buttonId === 'delete') {
            return getAllActivityIds().findIndex(activityId => activityId === currentActivity) === 0 ? true : false;
        } 
        else if (buttonId === 'next') {
            return getAllActivityIds().findIndex(activityId => activityId === currentActivity) === getAllActivityIds().length - 1 ? true : false;
        } 
        else if (buttonId === 'add') {
            return getAllActivityIds().length > 5 ? true : false;
        }
    }

    // Function to navigate to specified activity
    const navigateToActivity = (activityId) => {
        // Defining activity navigation landmarks
        const currentIdx = getAllActivityIds().findIndex(activity => activity === currentActivity);
        if (activityId === 'previous')
            activityId = getAllActivityIds()[currentIdx - 1];
        else if (activityId === 'next')
            activityId = getAllActivityIds()[currentIdx + 1];
        else if (activityId === 'first')
            activityId = getAllActivityIds()[0];
        else if (activityId === 'last')
            activityId = getAllActivityIds()[getAllActivityIds().length - 1];
            
        setCurrentActivity(activityId);
    }

    // Generates activity dropdown items
    const generateDropdownItems = () => (
        activityManager.getAllActivityNames().map(activityName => (
            {'key' : getActivityId(activityName),
            'text' : activityName,
            'value' : getActivityId(activityName)}
        ))
    );

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

            <div id='activity-area'>
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
                            {/* <Button 
                                icon='trash' 
                                disabled={setControlButtonState('delete')}
                                onClick={() => { 
                                    if (currentActivity !== DEFAULT_ACTIVITY_NAME)
                                        setDeleteActivityModalState(true);
                                }}
                            /> */}
                            <Button 
                                icon='add' 
                                disabled={setControlButtonState('add')}
                                onClick={() => { 
                                    const activityId = addActivity();
                                    navigateToActivity(activityId);
                                }}
                            />
                            <Button 
                                icon='chevron right' 
                                disabled={setControlButtonState('next')} 
                                onClick={() => { navigateToActivity('next'); }}
                            />
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