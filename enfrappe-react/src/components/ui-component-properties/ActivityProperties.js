import { Form, Input, Label, Modal, Button, Icon, Header } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

import '../ui-component-properties/ActivityProperties.css';
import { useState } from 'react';

const ActivityProperties = (props) => {

    const { activityManager, currentActivity, setCurrentActivity, setSelectedComponent } = props;
    const { getActivity, activityEditor } = activityManager;
    const activityData = getActivity(currentActivity);

    const [activityRenamerModalState, setActivityRenamerModalState] = useState(false);
    const [activityRenameState, setActivityRenameState] = useState({'name': '', 'valid': false, 'message': 'Activity name cannot be empty.'});

    const [colorPickerDisplay, setColorPickerDisplay] = useState(false);

    const [deleteActivityModalState, setDeleteActivityModalState] = useState(false);

    // Form validation for new activity name
    const validateActivityName = (newActivityName) => {
        if (currentActivity === 'Main Activity')
            setActivityRenameState({'name': currentActivity, 'valid': false, 'message': 'Main Activity cannot be renamed.'});
        else if (newActivityName === '' || newActivityName === undefined)
            setActivityRenameState({'name': currentActivity, 'valid': false, 'message': 'Activity name cannot be empty.'});
        else if (activityManager.getAllActivityNames().includes(newActivityName))
            setActivityRenameState({'name': currentActivity, 'valid': false, 'message': 'Activity name already exists.'});
        else
            setActivityRenameState({'name': newActivityName, 'valid': true, 'message': ''});
    };

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'}>Activity Name</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={activityData.name}
                    action={{
                        icon: 'pencil',
                        onClick: () => { 
                            validateActivityName(); 
                            setActivityRenamerModalState(true); 
                        },
                    }}
                    placeholder='Actvity Name'
                    fluid
                    readOnly 
                />
                <Modal
                    size={'tiny'}
                    open={activityRenamerModalState}
                    onClose={() => { setActivityRenamerModalState(false); }}>
                    <Header icon='pencil' content='Rename Activity' />
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <Label className={'tucked-label'}>Current Activity Name</Label>
                                <Input 
                                    className={'button-based-input-only'}
                                    value={activityData.name}
                                    placeholder='Current Actvity Name'
                                    fluid
                                    readOnly 
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label className={'tucked-label'}>New Activity Name</Label>
                                <Form.Input 
                                    placeholder='New Actvity Name'
                                    onChange={(e, data) => { validateActivityName(data.value); }}
                                    error={!activityRenameState.valid && {
                                        content: activityRenameState.message,
                                        pointing: 'above',
                                        }}
                                        readOnly={currentActivity === 'Main Activity'} 
                                    fluid 
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            icon='cancel' 
                            onClick={() => { setActivityRenamerModalState(false); }} 
                        />
                        <Button 
                            icon='check'
                            content='Confirm Changes'
                            labelPosition='right' 
                            disabled={!activityRenameState.valid} 
                            onClick={() => { 
                                if (activityRenameState.valid) {
                                    setActivityRenamerModalState(false);
                                    activityEditor.editActivityName(currentActivity, activityRenameState.name);
                                    setCurrentActivity(activityRenameState.name);
                                }
                            }} 
                        />
                    </Modal.Actions>
                </Modal>
            </Form.Field>

            <Form.Field>
                <Label className={'tucked-label'}>Background Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={activityData.background}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setColorPickerDisplay(!colorPickerDisplay); },
                    }}
                    placeholder='Background Color'
                    fluid
                    readOnly 
                />
                {colorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setColorPickerDisplay(!colorPickerDisplay); }} />
                        <SketchPicker 
                            color={activityData.background} 
                            onChange={(color) => { activityEditor.editActivityBackground(currentActivity, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>

            <Button 
                fluid 
                icon='trash' 
                labelPosition='left' 
                color='red' 
                content='Delete Activity' 
                disabled={currentActivity === 'Main Activity'} 
                onClick={() => { 
                    if (currentActivity !== 'Main Activity')
                        setDeleteActivityModalState(true);
                }} />

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
                        const currentIdx = activityManager.getAllActivityNames().findIndex(activity => activity === currentActivity);
                        activityManager.deleteActivity(currentActivity);
                        setCurrentActivity(activityManager.getAllActivityNames()[currentIdx - 1]);
                        setSelectedComponent({'id': 'None', 'type': 'None'});
                    }} 
                />
                </Modal.Actions>
            </Modal>

        </Form>
    );
}

export default ActivityProperties;