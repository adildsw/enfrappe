import { useState } from 'react';
import { Form, Label, Input, Button, Modal, Header, Icon } from "semantic-ui-react";
import { SketchPicker } from 'react-color';

import UIItemTypes from '../../utils/UIItemTypes';

const ButtonProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, buttonManager } = componentManager;
    const { setButtonText, setButtonBackground, setButtonTextColor, shiftButtonUp, shiftButtonDown, deleteButton } = buttonManager;
    const buttonData = buttonManager.getButtonData(selectedComponent.id);
    
    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);
    const [backgroundColorPickerDisplay, setBackgroundColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const setMoveButtonButtonState = (buttonId) => {
        const parentId = buttonData.parent;
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

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'}>Button Label</Label>
                <Input 
                    value={buttonData.text}
                    onChange={(e) => { setButtonText(selectedComponent.id, e.target.value); }}
                    placeholder='Button Label'
                    fluid
                />
            </Form.Field>

            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={buttonData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': buttonData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={buttonData['text-color']} 
                            onChange={(color) => { setButtonTextColor(selectedComponent.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Background Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={buttonData.background}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setBackgroundColorPickerDisplay(!backgroundColorPickerDisplay); },
                        style: {'background': buttonData.background, 'border': '1px solid #ccc'}
                    }}
                    placeholder='Background Color'
                    fluid
                    readOnly 
                />
                {backgroundColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setBackgroundColorPickerDisplay(!backgroundColorPickerDisplay); }} />
                        <SketchPicker 
                            color={buttonData['background']} 
                            onChange={(color) => { setButtonBackground(selectedComponent.id, color.hex); }} 
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
                        content='Move Button Up' 
                        onClick={() => { shiftButtonUp(selectedComponent.id); }} 
                        disabled={!setMoveButtonButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Button Down' 
                        onClick={() => { shiftButtonDown(selectedComponent.id); }} 
                        disabled={!setMoveButtonButtonState('moveDown')}
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
                    content='Delete Button' 
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
                        Delete Button
                        <Header.Subheader>Are you sure you want to delete this button?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Button' inverted onClick={() => {
                            const toBeDeleted = buttonData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteButton(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>

        </Form>
    );
}

export default ButtonProperties;