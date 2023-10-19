import { useState } from "react";
import { Form, Label, Input, Button, Modal, Header, Icon, List, Segment } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import UIItemTypes from "../../utils/UIItemTypes";

const RadioProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, radioManager } = componentManager;
    const { deleteRadio, setRadioLabel, setRadioTextColor, shiftRadioUp, shiftRadioDown, addRadioOption, deleteRadioOption, editRadioOption, shiftRadioOptionUp, shiftRadioOptionDown, findOptionLabel, findOptionValue, setRadioName } = radioManager;
    const radioData = componentManager.getComponent(selectedComponent.id);

    const [selectedOption, setSelectedOption] = useState(null);

    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);
    const [deleteOptionButtonModalState, setDeleteOptionButtonModalState] = useState(false);

    const [addOptionModalState, setAddOptionModalState] = useState(false);
    const [editOptionModalState, setEditOptionModalState] = useState(false);
    const [optionValidationState, setOptionValidationState] = useState({'label': '', 'label-valid': false, 'label-message': 'Label cannot be empty.', 'value': '', 'value-valid': false, 'value-message': 'Value cannot be empty.'});

    const [userInputRenamerModalState, setUserInputRenamerModalState] = useState(false);
    const [userInputRenameState, setUserInputRenameState] = useState({'name': '', 'valid': false, 'message': 'Component name cannot be empty.'});
    const [newName, setNewName] = useState('');

    const getMoveRadioButtonState = (buttonId) => {
        const parentId = radioData.parent;
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

    const getMoveRadioOptionButtonState = (buttonId) => {
        if (selectedOption === null) return false;
        const optionIds = radioData['option-ids'];
        const index = optionIds.indexOf(selectedOption);
        if (buttonId === 'moveUp') {
            if (index === 0) return false;
            else return true;
        }
        else if (buttonId === 'moveDown') {
            if (index === optionIds.length - 1) return false;
            else return true;
        }
    }

    const getDeleteRadioOptionButtonState = () => {
        if (selectedOption === null) return false;
        if (radioData['option-ids'].length < 3) return false;
        else return true;
    }

    // Form validation for new user-input name
    const validateUserInputName = (newUserInputName) => {
        const currentUserInputName = radioData.name;
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

    const validateOption = (label, value, type) => {
        const newOptionValidationState = {...optionValidationState};
        if (label !== null) {
            if (label.length === 0) {
                newOptionValidationState['label'] = label;
                newOptionValidationState['label-valid'] = false;
                newOptionValidationState['label-message'] = 'Label cannot be empty.';
            }
            else if (findOptionLabel(radioData.id, label) !== null) {
                if (type === 'add') {
                    newOptionValidationState['label-valid'] = false;
                    newOptionValidationState['label-message'] = 'Label already exists.';
                }
                else if (type === 'edit') {
                    if (findOptionLabel(radioData.id, label) !== selectedOption) {
                        newOptionValidationState['label-valid'] = false;
                        newOptionValidationState['label-message'] = 'Label already exists.';
                    }
                    else {
                        newOptionValidationState['label'] = label;
                        newOptionValidationState['label-valid'] = true;
                        newOptionValidationState['label-message'] = '';
                    }
                }
            }
            else {
                newOptionValidationState['label'] = label;
                newOptionValidationState['label-valid'] = true;
                newOptionValidationState['label-message'] = '';
            }
        }
        if (value !== null) {
            if (value.length === 0) {
                newOptionValidationState['value'] = value;
                newOptionValidationState['value-valid'] = false;
                newOptionValidationState['value-message'] = 'Value cannot be empty.';
            }
            else if (findOptionValue(radioData.id, value) !== null) {
                if (type === 'add') {
                    newOptionValidationState['value-valid'] = false;
                    newOptionValidationState['value-message'] = 'Value already exists.';
                }
                else if (type === 'edit') {
                    if (findOptionValue(radioData.id, value) !== selectedOption) {
                        newOptionValidationState['value-valid'] = false;
                        newOptionValidationState['value-message'] = 'Value already exists.';
                    }
                    else {
                        newOptionValidationState['value'] = value;
                        newOptionValidationState['value-valid'] = true;
                        newOptionValidationState['value-message'] = '';
                    }
                }
            }
            else {
                newOptionValidationState['value'] = value;
                newOptionValidationState['value-valid'] = true;
                newOptionValidationState['value-message'] = '';
            }
        }
        setOptionValidationState(newOptionValidationState);
    }

    const generateRadioOptionProperties = () => {
        const radioOptionProperties = [];

        radioData['option-ids'].forEach((optionId) => {
            radioOptionProperties.push(
                <List.Item as='a' 
                    key={optionId}
                    id={optionId} 
                    className={'component-option' + (selectedOption === optionId ? ' selected-component-option' : '')} 
                    onClick={(e) => {
                        if (selectedOption !== e.target.id)
                            setSelectedOption(e.target.id);
                        else
                            setSelectedOption(null);
                    }}>
                    <List.Icon id={optionId} name='circle outline' size='tiny' verticalAlign='middle' />
                    <List.Content id={optionId}>
                        <List.Header id={optionId} as='b'>{radioData.options[optionId].label}</List.Header>
                        <List.Description id={optionId}>Value: {radioData.options[optionId].value}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });

        return radioOptionProperties;
    }

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'} color={'orange'}>Parameter Name</Label>
                <Input
                    className={'button-based-input-only'}
                    value={radioData.name}
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
                                    value={radioData.name}
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
                                    setRadioName(radioData.id, userInputRenameState.name);
                                }
                            }} 
                        />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Radio Group Label</Label>
                <Input 
                    value={radioData.label}
                    onChange={(e) => { setRadioLabel(selectedComponent.id, e.target.value); }}
                    placeholder='Label'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={radioData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': radioData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={radioData['text-color']} 
                            onChange={(color) => { setRadioTextColor(radioData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Options</Label>
                <Segment className={'tucked-label-compat'}>
                    <List divided relaxed>
                        {generateRadioOptionProperties()}
                    </List>
                    <Button.Group icon fluid className={'component-option-controls'}>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => {shiftRadioOptionUp(radioData.id, selectedOption);}}
                            disabled={!getMoveRadioOptionButtonState('moveUp')}>
                            <Icon 
                                className={'component-option-controls'} 
                                name='up arrow' 
                            />
                        </Button>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => {shiftRadioOptionDown(radioData.id, selectedOption);}}
                            disabled={!getMoveRadioOptionButtonState('moveDown')}>
                            <Icon 
                                className={'component-option-controls'} 
                                name='down arrow' 
                            />
                        </Button>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => { 
                                validateOption(radioData.options[selectedOption].label, radioData.options[selectedOption].value, 'edit');
                                setEditOptionModalState(true); 
                            }}
                            disabled={selectedOption === null}>
                            <Icon 
                                className={'component-option-controls'} 
                                name='cogs' 
                            />
                        </Button>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => { setDeleteOptionButtonModalState(true); }}
                            disabled={!getDeleteRadioOptionButtonState()}>
                            <Icon 
                                className={'component-option-controls'} 
                                name='trash' 
                            />
                        </Button>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => { 
                                validateOption('', '', 'add');
                                setAddOptionModalState(true); 
                            }}>
                            <Icon 
                                className={'component-option-controls'} 
                                name='add' 
                            />
                        </Button>
                    </Button.Group>
                </Segment>
            </Form.Field>

            {/* Add Option Modal */}
            <Modal
                size={'tiny'}
                open={addOptionModalState}
                onClose={() => { setAddOptionModalState(false); }}>
                <Header icon='pencil' content='Add Option' />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Label className={'tucked-label'}>Label</Label>
                            <Form.Input 
                                placeholder='Label'
                                fluid
                                onChange={(e, data) => { validateOption(data.value, null, 'add'); }}
                                error={!optionValidationState['label-valid'] && {
                                    content: optionValidationState['label-message']
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label className={'tucked-label'}>Value</Label>
                            <Form.Input 
                                placeholder='Value'
                                fluid 
                                onChange={(e, data) => { validateOption(null, data.value, 'add'); }}
                                error={!optionValidationState['value-valid'] && {
                                    content: optionValidationState['value-message']
                                }}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        icon='cancel' 
                        onClick={() => { setAddOptionModalState(false); }} 
                    />
                    <Button 
                        icon='check'
                        content='Add Option'
                        labelPosition='right' 
                        disabled={!optionValidationState['label-valid'] || !optionValidationState['value-valid']} 
                        onClick={() => { 
                            if (optionValidationState['label-valid'] && optionValidationState['value-valid']) {
                                setAddOptionModalState(false);
                                addRadioOption(radioData.id, optionValidationState.label, optionValidationState.value);
                            }
                        }} 
                    />
                </Modal.Actions>
            </Modal>

            {/* Edit Option Modal */}
            <Modal
                size={'tiny'}
                open={editOptionModalState}
                onClose={() => { setEditOptionModalState(false); }}>
                <Header icon='pencil' content='Edit Option' />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Label className={'tucked-label'}>Label</Label>
                            <Form.Input 
                                value={optionValidationState.label}
                                placeholder={optionValidationState.label}
                                fluid
                                onChange={(e, data) => { validateOption(data.value, null, 'edit'); }}
                                error={!optionValidationState['label-valid'] && {
                                    content: optionValidationState['label-message']
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label className={'tucked-label'}>Value</Label>
                            <Form.Input 
                                value={optionValidationState.value}
                                placeholder={optionValidationState.value}
                                fluid 
                                onChange={(e, data) => { validateOption(null, data.value, 'edit'); }}
                                error={!optionValidationState['value-valid'] && {
                                    content: optionValidationState['value-message']
                                }}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        icon='cancel' 
                        onClick={() => { setEditOptionModalState(false); }} 
                    />
                    <Button 
                        icon='check'
                        content='Edit Option'
                        labelPosition='right' 
                        disabled={!optionValidationState['label-valid'] || !optionValidationState['value-valid']} 
                        onClick={() => { 
                            if (optionValidationState['label-valid'] && optionValidationState['value-valid']) {
                                setEditOptionModalState(false);
                                editRadioOption(radioData.id, selectedOption, optionValidationState.label, optionValidationState.value);
                            }
                        }} 
                    />
                </Modal.Actions>
            </Modal>

            {/* Delete Option Modal */}
            <Modal
                basic
                size='small'
                open={deleteOptionButtonModalState}
                onClose={() => { setDeleteOptionButtonModalState(false); }}>
                <Header as='h2' icon inverted>
                    <Icon name='trash' />
                    Delete Option
                    <Header.Subheader>Are you sure you want to delete this option?</Header.Subheader>
                </Header>
                <Modal.Actions style={{'textAlign': 'center'}}>
                    <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteOptionButtonModalState(false); }} />
                    <Button icon='trash' color='red' content='Delete Option' inverted onClick={() => {
                        const toBeDeleted = selectedOption;
                        setSelectedOption(null);
                        deleteRadioOption(radioData.id, toBeDeleted);
                        setDeleteOptionButtonModalState(false);
                    }} 
                />
                </Modal.Actions>
            </Modal>

            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Radio Up' 
                        onClick={() => { shiftRadioUp(radioData.id); }} 
                        disabled={!getMoveRadioButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Radio Down' 
                        onClick={() => { shiftRadioDown(radioData.id); }} 
                        disabled={!getMoveRadioButtonState('moveDown')}
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
                    content='Delete Radio Group' 
                    onClick={() => { setDeleteButtonModalState(true); }} 
                />

                <Modal
                    basic
                    size='small'
                    open={deleteButtonModalState}
                    onClose={() => { setDeleteButtonModalState(false); }}>
                    <Header as='h2' icon inverted>
                        <Icon name='trash' />
                        Delete Radio Group
                        <Header.Subheader>Are you sure you want to delete this Radio Group?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Radio Group' inverted onClick={() => {
                            const toBeDeleted = radioData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteRadio(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default RadioProperties;