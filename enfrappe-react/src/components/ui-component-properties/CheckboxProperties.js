import { useState } from "react";
import { Form, Label, Input, Modal, Header, Icon, Button } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import UIItemTypes from "../../utils/UIItemTypes";

const CheckboxProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, checkboxManager } = componentManager;
    const { deleteCheckbox, setCheckboxLabel, setCheckboxTextColor, shiftCheckboxDown, shiftCheckboxUp } = checkboxManager;
    const checkboxData = checkboxManager.getCheckboxData(selectedComponent.id);

    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const setMoveCheckboxButtonState = (buttonId) => {
        const parentId = checkboxData.parent;
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
                    value={checkboxData.id}
                    readOnly
                    style={{ 'pointerEvents': 'none', 'userSelect': 'none' }}
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Checkbox Label</Label>
                <Input 
                    value={checkboxData.label}
                    onChange={(e) => { setCheckboxLabel(selectedComponent.id, e.target.value); }}
                    placeholder='Label'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={checkboxData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': checkboxData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={checkboxData['text-color']} 
                            onChange={(color) => { setCheckboxTextColor(checkboxData.id, color.hex); }} 
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
                        onClick={() => { shiftCheckboxUp(checkboxData.id); }} 
                        disabled={!setMoveCheckboxButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Text Down' 
                        onClick={() => { shiftCheckboxDown(checkboxData.id); }} 
                        disabled={!setMoveCheckboxButtonState('moveDown')}
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
                    content='Delete Checkbox' 
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
                        Delete Checkbox
                        <Header.Subheader>Are you sure you want to delete this Checkbox?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Checkbox' inverted onClick={() => {
                            const toBeDeleted = checkboxData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteCheckbox(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default CheckboxProperties;