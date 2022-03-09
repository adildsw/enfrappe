import { useState } from "react";
import { Form, Label, Input, Button, Modal, Header, Icon } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import UIItemTypes from "../../utils/UIItemTypes";

const InputProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, inputManager } = componentManager;
    const { deleteInput, setInputLabel, setInputPlaceholder, setInputTextColor, shiftInputDown, shiftInputUp } = inputManager;
    const inputData = inputManager.getInputData(selectedComponent.id);
    
    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const setMoveInputButtonState = (buttonId) => {
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

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'} color={'orange'}>ID</Label>
                <Input
                    value={inputData.id}
                    readOnly
                    style={{ 'pointerEvents': 'none', 'userSelect': 'none' }}
                />
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
                        disabled={!setMoveInputButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Text Down' 
                        onClick={() => { shiftInputDown(inputData.id); }} 
                        disabled={!setMoveInputButtonState('moveDown')}
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