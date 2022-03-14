import { useState } from "react";
import { Form, Label, Input, Button, Modal, Header, Icon } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import UIItemTypes from "../../utils/UIItemTypes";

const InputProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, inputManager } = componentManager;
    const { deleteInput, setInputLabel, setInputPlaceholder, setInputTextColor, shiftInputDown, shiftInputUp, setInputName } = inputManager;
    const inputData = inputManager.getInputData(selectedComponent.id);

    const [userInputRenamerModalState, setUserInputRenamerModalState] = useState(false);
    const [userInputRenameState, setUserInputRenameState] = useState({'name': '', 'valid': false, 'message': 'Component name cannot be empty.'});
    const [newName, setNewName] = useState('');
    
    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const getMoveInputButtonState = (buttonId) => {
        const parentId = inputData.parent;
        const index = activityManager.getActivityData(parentId).children.indexOf(selectedComponent.id);
        if (buttonId === 'moveUp') {
            if (index === 0) return false;
            else return true;
        }
        else if (buttonId === 'moveDown') {
            if (index === activityManager.getActivityData(parentId).children.length - 1) return false;
            else return true;
        }
    }

    // Form validation for new user-input name
    const validateUserInputName = (newUserInputName) => {
        const currentUserInputName = inputData.name;
        if (newUserInputName === '' || newUserInputName === undefined)
            setUserInputRenameState({'name': currentUserInputName, 'valid': false, 'message': 'Component name cannot be empty.'});
        else if (newUserInputName.charAt(0).match(/[0-9]/) !== null)
            setUserInputRenameState({'name': currentUserInputName, 'valid': false, 'message': 'Component name cannot start with a number.'});
        else if (componentManager.getAllUserInputComponentNames().includes(newUserInputName))
            if (newUserInputName === currentUserInputName)
                setUserInputRenameState({'name': currentUserInputName, 'valid': false, 'message': 'The new component name cannot be the same as the old one.'});
            else
                setUserInputRenameState({'name': currentUserInputName, 'valid': false, 'message': 'Component name already exists.'});
        else
            setUserInputRenameState({'name': newUserInputName, 'valid': true, 'message': ''});
    };

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'} color={'grey'}>Name</Label>
                <Input
                    className={'button-based-input-only'}
                    value={inputData.name}
                    action={{
                        icon: 'pencil',
                        onClick: () => { 
                            validateUserInputName(); 
                            setUserInputRenamerModalState(true); 
                        },
                    }}
                    readOnly
                />
                <Modal
                    size={'tiny'}
                    open={userInputRenamerModalState}
                    onClose={() => { setUserInputRenamerModalState(false); }}>
                    <Header icon='pencil' content='Rename Component' />
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <Label className={'tucked-label'}>Current Component Name</Label>
                                <Input 
                                    className={'button-based-input-only'}
                                    value={inputData.name}
                                    placeholder='Current Component Name'
                                    fluid
                                    readOnly 
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label className={'tucked-label'}>New Component Name</Label>
                                <Form.Input 
                                    placeholder='New Component Name'
                                    value={newName}
                                    onChange={(e, data) => { 
                                        const newUserInputName = data.value.replace(/[^a-zA-Z0-9_]/g, '');
                                        setNewName(newUserInputName);
                                        validateUserInputName(newUserInputName); 
                                    }}
                                    error={!userInputRenameState.valid && {
                                        content: userInputRenameState.message,
                                        pointing: 'above',
                                    }}
                                    fluid 
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            icon='cancel' 
                            onClick={() => { setUserInputRenamerModalState(false); }} 
                        />
                        <Button 
                            icon='check'
                            content='Confirm Changes'
                            labelPosition='right' 
                            disabled={!userInputRenameState.valid} 
                            onClick={() => { 
                                if (userInputRenameState.valid) {
                                    setUserInputRenamerModalState(false);
                                    setInputName(inputData.id, userInputRenameState.name);
                                }
                            }} 
                        />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Input Label</Label>
                <Input 
                    value={inputData.label}
                    onChange={(e) => { setInputLabel(selectedComponent.id, e.target.value); }}
                    placeholder='Label'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Input Placeholder</Label>
                <Input 
                    value={inputData.placeholder}
                    onChange={(e) => { setInputPlaceholder(selectedComponent.id, e.target.value); }}
                    placeholder='Placeholder'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={inputData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': inputData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={inputData['text-color']} 
                            onChange={(color) => { setInputTextColor(inputData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>
            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Text Up' 
                        onClick={() => { shiftInputUp(inputData.id); }} 
                        disabled={!getMoveInputButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Text Down' 
                        onClick={() => { shiftInputDown(inputData.id); }} 
                        disabled={!getMoveInputButtonState('moveDown')}
                    />
                </Button.Group>
            </Form.Field>
            <Form.Field>
                <Button 
                    type='button'
                    fluid 
                    icon='trash' 
                    labelPosition='left' 
                    color='red' 
                    content='Delete Input Field' 
                    onClick={() => { 
                        setDeleteButtonModalState(true);
                    }} 
                />

                <Modal
                    basic
                    size='small'
                    open={deleteButtonModalState}
                    onClose={() => { setDeleteButtonModalState(false); }}>
                    <Header as='h2' icon inverted>
                        <Icon name='trash' />
                        Delete Input Field
                        <Header.Subheader>Are you sure you want to delete this input field?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Input Field' inverted onClick={() => {
                            const toBeDeleted = inputData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteInput(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default InputProperties;