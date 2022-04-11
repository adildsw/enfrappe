import { useState } from 'react';
import { Form, Label, Input, Button, Modal, Header, Icon } from "semantic-ui-react";
import { SketchPicker } from 'react-color';

import UIItemTypes from '../../utils/UIItemTypes';

const DataViewerProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, dataViewerManager } = componentManager;
    const { setDataViewerValue, setDataViewerColor, setDataViewerBold, setDataViewerItalic, setDataViewerUnderline, setDataViewerAlign, setDataViewerSize, setDataViewerTight, shiftDataViewerUp, shiftDataViewerDown, deleteDataViewer } = dataViewerManager;
    const textData = dataViewerManager.getDataViewerData(selectedComponent.id);
    
    const [textColorPickerDisplay, setDataViewerColorPickerDisplay] = useState(false);

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
                    onChange={(e) => { setDataViewerValue(textData.id, e.target.value); }}
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
                        onClick: () => { setDataViewerColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': textData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setDataViewerColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={textData['text-color']} 
                            onChange={(color) => { setDataViewerColor(textData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>

            <Form.Field>
                <Button.Group fluid>
                    <Button toggle content='Large' active={textData.size === 'large' ? true : false} onClick={() => { setDataViewerSize(textData.id, 'large'); }} />
                    <Button toggle content='Medium' active={textData.size === 'medium' ? true : false} onClick={() => { setDataViewerSize(textData.id, 'medium'); }} />
                    <Button toggle content='Small' active={textData.size === 'small' ? true : false} onClick={() => { setDataViewerSize(textData.id, 'small'); }} />
                </Button.Group>
            </Form.Field>

            <Form.Field>
                <Button.Group fluid>
                    <Button toggle icon='bold' active={textData.bold} onClick={() => { setDataViewerBold(textData.id, !textData.bold); }} />
                    <Button toggle icon='italic' active={textData.italic} onClick={() => { setDataViewerItalic(textData.id, !textData.italic); }} />
                    <Button toggle icon='underline' active={textData.underline} onClick={() => { setDataViewerUnderline(textData.id, !textData.underline); }} />
                    <Button toggle icon='text height' active={textData.tight} onClick={() => { setDataViewerTight(textData.id, !textData.tight); }} />
                </Button.Group>
            </Form.Field>

            <Form.Field>
                <Button.Group fluid>
                    <Button toggle icon='align left' active={textData.align === 'left' ? true : false} onClick={() => { setDataViewerAlign(textData.id, 'left'); }} />
                    <Button toggle icon='align center' active={textData.align === 'center' ? true : false} onClick={() => { setDataViewerAlign(textData.id, 'center'); }} />
                    <Button toggle icon='align right' active={textData.align === 'right' ? true : false} onClick={() => { setDataViewerAlign(textData.id, 'right'); }} />
                    <Button toggle icon='align justify' active={textData.align === 'justify' ? true : false} onClick={() => { setDataViewerAlign(textData.id, 'justify'); }} />
                </Button.Group>
            </Form.Field>

            {/* <Form.Field>
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
                                if (!e.target.value.startsWith('/'))
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
                                    onChange={(e, data) => { 
                                        if (data.value !== 'custom')
                                            addButtonOnPressApiParam(selectedComponent.id, data.value); 
                                        else  {
                                            validateCustomParam();
                                            setAddCustomParamModalState(true);
                                        }
                                    }}
                                    options={generateSectionUserInputComponentItems()}
                                    text={'Add Parameter'}
                                    value=''
                                    fluid
                                    disabled={generateSectionUserInputComponentItems().length === 0}
                                />
                            </Form.Field>
                        </Segment>
                    </Form.Field>

                    <Modal
                        size={'tiny'}
                        open={addCustomParamModalState}
                        onClose={() => { setAddCustomParamModalState(false); }}>
                        <Header icon='pencil' content='Add Custom Parameter' />
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <Label className={'tucked-label'}>Parameter Name</Label>
                                    <Form.Input 
                                        placeholder='Parameter Name'
                                        value={customParam.key}
                                        onChange={(e, data) => {
                                            const newParamkey = data.value.replace(/[^a-zA-Z0-9_]/g, '');
                                            setCustomParam({...customParam, 'key': newParamkey});
                                            validateCustomParam(newParamkey); 
                                        }}
                                        error={!customParamState.valid && {
                                            content: customParamState.message
                                        }}
                                        fluid
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Label className={'tucked-label'}>Parameter Value</Label>
                                    <Form.Input 
                                        placeholder='Parameter Value'
                                        value={customParam.value}
                                        onChange={(e, data) => { setCustomParam({...customParam, 'value': data.value}); }}
                                        fluid 
                                    />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button 
                                icon='cancel' 
                                onClick={() => { setAddCustomParamModalState(false); }} 
                            />
                            <Button 
                                icon='check'
                                content='Confirm Changes'
                                labelPosition='right' 
                                disabled={!customParamState.valid} 
                                onClick={() => { 
                                    if (customParamState.valid) {
                                        setAddCustomParamModalState(false);
                                        addButtonOnPressApiCustomParam(buttonData.id, customParam.key, customParam.value);
                                        setCustomParam({'key': '', 'value': ''});
                                    }
                                }} 
                            />
                        </Modal.Actions>
                    </Modal>

                    <Form.Field>
                        <Label className={'tucked-label'}>API Result Display Type</Label>
                        <Table className={'tucked-label-compat'}>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Radio
                                            name={'on-press-api-result-display-type'}
                                            label={'Toast'}
                                            value={'toast'}
                                            checked={buttonData['on-press-api-result-display-type'] === 'toast'}
                                            onChange={() => {
                                                setButtonOnPressApiResultDisplayType(selectedComponent.id, 'toast');
                                            }}
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Radio
                                            name={'on-press-api-result-display-type'}
                                            label={'Prompt'}
                                            value={'prompt'}
                                            checked={buttonData['on-press-api-result-display-type'] === 'prompt'}
                                            onChange={() => {
                                                setButtonOnPressApiResultDisplayType(selectedComponent.id, 'prompt');
                                            }}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Form.Field>
                </Segment>
            </Form.Field> */}

            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Text Up' 
                        onClick={() => { shiftDataViewerUp(textData.id); }} 
                        disabled={!getMoveTextButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Text Down' 
                        onClick={() => { shiftDataViewerDown(textData.id); }} 
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
                            deleteDataViewer(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default DataViewerProperties;