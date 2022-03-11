import { useState } from "react";
import { Form, Label, Input, Button, Modal, Header, Icon, List, Segment } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import UIItemTypes from "../../utils/UIItemTypes";

const DropdownProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, dropdownManager } = componentManager;
    const { deleteDropdown, setDropdownLabel, setDropdownTextColor, shiftDropdownUp, shiftDropdownDown, addDropdownOption, deleteDropdownOption, editDropdownOption, shiftDropdownOptionUp, shiftDropdownOptionDown, findOptionLabel, findOptionValue } = dropdownManager;
    const dropdownData = componentManager.getComponent(selectedComponent.id);

    const [selectedOption, setSelectedOption] = useState(null);

    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);
    const [deleteOptionButtonModalState, setDeleteOptionButtonModalState] = useState(false);

    const [addOptionModalState, setAddOptionModalState] = useState(false);
    const [editOptionModalState, setEditOptionModalState] = useState(false);
    const [optionValidationState, setOptionValidationState] = useState({'label': '', 'label-valid': false, 'label-message': 'Label cannot be empty.', 'value': '', 'value-valid': false, 'value-message': 'Value cannot be empty.'});

    const getMoveDropdownButtonState = (buttonId) => {
        const parentId = dropdownData.parent;
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

    const getMoveDropdownOptionButtonState = (buttonId) => {
        if (selectedOption === null) return false;
        const optionIds = dropdownData['option-ids'];
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

    const getDeleteDropdownOptionButtonState = () => {
        if (selectedOption === null) return false;
        if (dropdownData['option-ids'].length < 2) return false;
        else return true;
    }

    const validateOption = (label, value, type) => {
        const newOptionValidationState = {...optionValidationState};
        if (label !== null) {
            if (label.length === 0) {
                newOptionValidationState['label-valid'] = false;
                newOptionValidationState['label-message'] = 'Label cannot be empty.';
            }
            else if (findOptionLabel(dropdownData.id, label) !== null) {
                if (type === 'add') {
                    newOptionValidationState['label-valid'] = false;
                    newOptionValidationState['label-message'] = 'Label already exists.';
                }
                else if (type === 'edit') {
                    if (findOptionLabel(dropdownData.id, label) !== selectedOption) {
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
                newOptionValidationState['value-valid'] = false;
                newOptionValidationState['value-message'] = 'Value cannot be empty.';
            }
            else if (findOptionValue(dropdownData.id, value) !== null) {
                if (type === 'add') {
                    newOptionValidationState['value-valid'] = false;
                    newOptionValidationState['value-message'] = 'Value already exists.';
                }
                else if (type === 'edit') {
                    if (findOptionValue(dropdownData.id, value) !== selectedOption) {
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

    const generateDropdownOptionProperties = () => {
        const dropdownOptionProperties = [];

        dropdownData['option-ids'].forEach((optionId) => {
            dropdownOptionProperties.push(
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
                        <List.Header id={optionId} as='b'>{dropdownData.options[optionId].label}</List.Header>
                        <List.Description id={optionId}>Value: {dropdownData.options[optionId].value}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });

        return dropdownOptionProperties;
    }

    return (
        <Form>
            <Form.Field className={'properties-id'}>
                <Label className={'tucked-label'} color={'grey'}>ID</Label>
                <Input
                    value={dropdownData.id}
                    readOnly
                    style={{ 'pointerEvents': 'none', 'userSelect': 'none' }}
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Dropdown Group Label</Label>
                <Input 
                    value={dropdownData.label}
                    onChange={(e) => { setDropdownLabel(selectedComponent.id, e.target.value); }}
                    placeholder='Label'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={dropdownData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': dropdownData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={dropdownData['text-color']} 
                            onChange={(color) => { setDropdownTextColor(dropdownData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Options</Label>
                <Segment className={'tucked-label-compat'}>
                    <List divided relaxed>
                        {generateDropdownOptionProperties()}
                    </List>
                    <Button.Group icon fluid className={'component-option-controls'}>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => {shiftDropdownOptionUp(dropdownData.id, selectedOption);}}
                            disabled={!getMoveDropdownOptionButtonState('moveUp')}>
                            <Icon 
                                className={'component-option-controls'} 
                                name='up arrow' 
                            />
                        </Button>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => {shiftDropdownOptionDown(dropdownData.id, selectedOption);}}
                            disabled={!getMoveDropdownOptionButtonState('moveDown')}>
                            <Icon 
                                className={'component-option-controls'} 
                                name='down arrow' 
                            />
                        </Button>
                        <Button 
                            className={'component-option-controls'}
                            onClick={() => { 
                                validateOption(dropdownData.options[selectedOption].label, dropdownData.options[selectedOption].value, 'edit');
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
                            disabled={!getDeleteDropdownOptionButtonState()}>
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
                                addDropdownOption(dropdownData.id, optionValidationState.label, optionValidationState.value);
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
                                editDropdownOption(dropdownData.id, selectedOption, optionValidationState.label, optionValidationState.value);
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
                        deleteDropdownOption(dropdownData.id, toBeDeleted);
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
                        content='Move Dropdown Up' 
                        onClick={() => { shiftDropdownUp(dropdownData.id); }} 
                        disabled={!getMoveDropdownButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Dropdown Down' 
                        onClick={() => { shiftDropdownDown(dropdownData.id); }} 
                        disabled={!getMoveDropdownButtonState('moveDown')}
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
                    content='Delete Dropdown Group' 
                    onClick={() => { setDeleteButtonModalState(true); }} 
                />

                <Modal
                    basic
                    size='small'
                    open={deleteButtonModalState}
                    onClose={() => { setDeleteButtonModalState(false); }}>
                    <Header as='h2' icon inverted>
                        <Icon name='trash' />
                        Delete Dropdown Group
                        <Header.Subheader>Are you sure you want to delete this Dropdown Group?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Dropdown Group' inverted onClick={() => {
                            const toBeDeleted = dropdownData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteDropdown(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default DropdownProperties;