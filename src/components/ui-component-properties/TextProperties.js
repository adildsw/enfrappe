import { useState } from 'react';
import { Form, Label, Input, Button, Modal, Header, Icon, Checkbox, Table } from "semantic-ui-react";
import { SketchPicker } from 'react-color';

import UIItemTypes from '../../utils/UIItemTypes';

const TextProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, textManager } = componentManager;
    const { setTextValue, setTextColor, setTextBold, setTextItalic, shiftTextUp, shiftTextDown, deleteText } = textManager;
    const textData = textManager.getTextData(selectedComponent.id);
    
    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const getMoveTextButtonState = (buttonId) => {
        const parentId = textData.parent;
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
                <Label className={'tucked-label'}>Text Value</Label>
                <Form.TextArea
                    type='rich'
                    value={textData.text}
                    onChange={(e) => { setTextValue(textData.id, e.target.value); }}
                    placeholder='Text Value'
                    style={{ minHeight: 100 }}
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={textData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': textData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={textData['text-color']} 
                            onChange={(color) => { setTextColor(textData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>

            <Form.Field>
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell textAlign='center' verticalAlign='middle'>
                                <Checkbox 
                                    label='Bold' 
                                    onChange={(e, data) => { setTextBold(textData.id, data.checked); }}
                                    checked={textData.bold}
                                />
                            </Table.Cell>
                            <Table.Cell textAlign='center' verticalAlign='middle'>
                                <Checkbox 
                                    label='Italic' 
                                    onChange={(e, data) => { setTextItalic(textData.id, data.checked); }}
                                    checked={textData.italic}
                                />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Form.Field>

            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Text Up' 
                        onClick={() => { shiftTextUp(textData.id); }} 
                        disabled={!getMoveTextButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Text Down' 
                        onClick={() => { shiftTextDown(textData.id); }} 
                        disabled={!getMoveTextButtonState('moveDown')}
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
                    content='Delete Text' 
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
                        Delete Text
                        <Header.Subheader>Are you sure you want to delete this text?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Text' inverted onClick={() => {
                            const toBeDeleted = textData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteText(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default TextProperties;