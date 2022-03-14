import { useState } from 'react';
import { Form, Label, Input, Button, Modal, Header, Icon, Segment, Radio, Table, Dropdown, List } from "semantic-ui-react";
import { SketchPicker } from 'react-color';

import UIItemTypes, { getUIItemName } from '../../utils/UIItemTypes';

const ButtonProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { componentData, activityManager, buttonManager } = componentManager;
    const { setButtonText, setButtonBackground, setButtonTextColor, shiftButtonUp, shiftButtonDown, deleteButton, setButtonOnPressActionType, setButtonOnPressActivity, setButtonOnPressApiCallType, setButtonOnPressApiUrl, addButtonOnPressApiParam, deleteButtonOnPressApiParam } = buttonManager;
    const buttonData = buttonManager.getButtonData(selectedComponent.id);
    
    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);
    const [backgroundColorPickerDisplay, setBackgroundColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const getMoveButtonButtonState = (buttonId) => {
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

    // Generates activity dropdown items
    const generateDropdownItems = () => {
        var activityList = [{ 
            key: 'none',
            text: 'None',
            value: 'none'
        }];
        activityList = activityList.concat(
            activityManager.getAllActivityNames().map(activityName => (
                {'key' : activityManager.getActivityId(activityName),
                'text' : activityName,
                'value' : activityManager.getActivityId(activityName)}
            ))
        );

        return activityList;
    }

    const generateSectionUserInputComponentItems = () => {
        var itemList = [];
        var parentId = buttonData.parent;
        componentData.components[parentId].children.forEach(childId => {
            var childData = componentData.components[childId];
            if (childData.hasOwnProperty('name') && !buttonData['on-press-api-params'].includes(childData.id)) {
                itemList.push({
                    'key': childId,
                    'text': childData.name + ' [' + getUIItemName(childData.type) + ']',
                    'value': childId
                });
            }
        });
        return itemList;
    }

    const generateApiCallParams = () => {
        const apiCallParams = [];
        buttonData['on-press-api-params'].forEach(param => {
            if (Object.keys(componentData.components).includes(param)) {
                apiCallParams.push(
                    <List.Item key={param} as='a'>
                        <List.Content floated='right'>
                            <List.Icon name='trash' verticalAlign='middle' onClick={() => { deleteButtonOnPressApiParam(buttonData.id, param); }} />
                        </List.Content>
                        <List.Icon name='circle outline' size='tiny' verticalAlign='middle' style={{'cursor': 'default'}} />
                        <List.Content verticalAlign='middle' style={{'cursor': 'default', 'color': 'black'}}>
                            <b>{componentData.components[param].name}</b> <i>[{getUIItemName(componentData.components[param].type)}]</i>
                        </List.Content>
                    </List.Item>
                );
            }
        });
        return apiCallParams;
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
                <Label className={'tucked-label'}>On Press Event</Label>
                <Segment className={'tucked-label-compat'}>
                    <Label className={'tucked-label'}>Action Type</Label>
                    <Table className={'tucked-label-compat'}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign='center' verticalAlign='middle'>
                                    <Radio 
                                        name={'on-press-action-type'} 
                                        label={'Switch Activity'}  
                                        value={'activity'}
                                        checked={buttonData['on-press-action-type'] === 'activity'}
                                        onChange={() => {
                                            setButtonOnPressActionType(selectedComponent.id, 'activity');
                                        }}
                                    />
                                </Table.Cell>
                                <Table.Cell textAlign='center' verticalAlign='middle'>
                                    <Radio 
                                        name={'on-press-action-type'} 
                                        label={'Make API Call'}  
                                        value={'api'}
                                        checked={buttonData['on-press-action-type'] === 'api'}
                                        onChange={() => {
                                            setButtonOnPressActionType(selectedComponent.id, 'api');
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    {buttonData['on-press-action-type'] === 'activity' &&
                        <>
                            <Label className={'tucked-label'}>Activity</Label>
                            <Dropdown
                                fluid
                                selection
                                placeholder='Select Activity'
                                value={buttonData['on-press-activity']}
                                options={generateDropdownItems()}
                                onChange={(e, data) => { setButtonOnPressActivity(selectedComponent.id, data.value); }}
                            />
                        </>
                    }
                    {buttonData['on-press-action-type'] === 'api' &&
                        <>
                            <Form.Field>
                                <Label className={'tucked-label'}>API Call Type</Label>
                                <Table className={'tucked-label-compat'}>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell textAlign='center' verticalAlign='middle'>
                                                <Radio 
                                                    name={'on-press-api-call-type'} 
                                                    label={'GET'}  
                                                    value={'activity'}
                                                    checked={buttonData['on-press-api-call-type'] === 'GET'}
                                                    onChange={() => {
                                                        setButtonOnPressApiCallType(selectedComponent.id, 'GET');
                                                    }}
                                                />
                                            </Table.Cell>
                                            <Table.Cell textAlign='center' verticalAlign='middle'>
                                                <Radio 
                                                    name={'on-press-api-call-type'} 
                                                    label={'POST'}  
                                                    value={'api'}
                                                    checked={buttonData['on-press-api-call-type'] === 'POST'}
                                                    onChange={() => {
                                                        setButtonOnPressApiCallType(selectedComponent.id, 'POST');
                                                    }}
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Form.Field>
                            
                            <Form.Field>
                                <Label className={'tucked-label'}>API URL/Endpoint</Label>
                                <Input 
                                    value={buttonData['on-press-api-url']}
                                    onChange={(e) => { 
                                        if (e.target.value !== '' && !e.target.value.startsWith('/'))
                                            setButtonOnPressApiUrl(selectedComponent.id, '/' + e.target.value);
                                        else
                                            setButtonOnPressApiUrl(selectedComponent.id, e.target.value); 
                                    }}
                                    placeholder='/apicall'
                                    fluid
                                />
                            </Form.Field>

                            <Form.Field>
                                <Label className={'tucked-label'}>API Call Parameters</Label>
                                <Segment className={'tucked-label-compat'}>
                                    
                                    {generateApiCallParams().length > 0 &&
                                        <List divided relaxed verticalAlign='middle' >
                                            {generateApiCallParams()}
                                        </List>
                                    }
                                    
                                    <Form.Field >
                                        <Dropdown
                                            button
                                            onChange={(e, data) => { addButtonOnPressApiParam(selectedComponent.id, data.value); }}
                                            options={generateSectionUserInputComponentItems()}
                                            text={'Add Parameter'}
                                            value=''
                                            fluid
                                            disabled={generateSectionUserInputComponentItems().length === 0}
                                        />
                                    </Form.Field>
                                </Segment>
                            </Form.Field>
                        </>
                        
                    }
                </Segment>
            </Form.Field>

            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Button Up' 
                        onClick={() => { shiftButtonUp(selectedComponent.id); }} 
                        disabled={!getMoveButtonButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Button Down' 
                        onClick={() => { shiftButtonDown(selectedComponent.id); }} 
                        disabled={!getMoveButtonButtonState('moveDown')}
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