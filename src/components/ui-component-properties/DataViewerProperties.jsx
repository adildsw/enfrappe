import { useState } from 'react';
import { Form, Label, Input, Button, Modal, Header, Icon, List, Segment, Table, Radio, Dropdown } from "semantic-ui-react";
import { SketchPicker } from 'react-color';

import UIItemTypes from '../../utils/UIItemTypes';

const DataViewerProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, dataViewerManager } = componentManager;
    const { setDataViewerColor, setDataViewerBold, setDataViewerItalic, setDataViewerUnderline, setDataViewerAlign, setDataViewerSize, setDataViewerTight, shiftDataViewerUp, shiftDataViewerDown, deleteDataViewer, setDataViewerRefreshInterval, setDataViewerApiCallType, setDataViewerApiUrl, addDataViewerApiCustomParam, deleteDataViewerApiCustomParam } = dataViewerManager;
    const dataViewerData = dataViewerManager.getDataViewerData(selectedComponent.id);

    const [refreshIntervalTempState, setRefreshIntervalTempState] = useState(dataViewerData.refreshInterval);
    
    const [textColorPickerDisplay, setDataViewerColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const [addCustomParamModalState, setAddCustomParamModalState] = useState(false);
    const [customParam, setCustomParam] = useState({'key': '', 'value': ''})
    const [customParamState, setCustomParamState] = useState({'valid': false, 'message': 'Parameter key cannot be empty'});

    const validateCustomParam = (newParamKey) => {
        if (newParamKey === '' || newParamKey === undefined) {
            setCustomParamState({'valid': false, 'message': 'Parameter name cannot be empty'});
        } else {
            if (dataViewerData['api-custom-params'].hasOwnProperty(newParamKey)) {
                setCustomParamState({'valid': false, 'message': 'Parameter name already exists'});
            }
            else {
                setCustomParamState({'valid': true, 'message': ''});
            }
        }
    }

    const getMoveTextButtonState = (dataViewerId) => {
        const parentId = dataViewerData.parent;
        const index = activityManager.getActivityData(parentId).children.indexOf(selectedComponent.id);
        if (dataViewerId === 'moveUp') {
            if (index === 0) return false;
            else return true;
        }
        else if (dataViewerId === 'moveDown') {
            if (index === activityManager.getActivityData(parentId).children.length - 1) return false;
            else return true;
        }
    }

    const generateSectionUserInputComponentItems = () => {
        var itemList = [];
        itemList.push({
            'key': 'custom',
            'text': 'Custom Data',
            'value': 'custom'
        });
        return itemList;
    }

    const generateApiCallParams = () => {
        const apiCallParams = [];
        Object.keys(dataViewerData['api-custom-params']).forEach(param => {
            apiCallParams.push(
                <List.Item key={param} as='a'>
                    <List.Content floated='right'>
                        <List.Icon name='trash' verticalAlign='middle' onClick={() => { deleteDataViewerApiCustomParam(dataViewerData.id, param); }} />
                    </List.Content>
                    <List.Icon name='circle outline' size='tiny' verticalAlign='middle' style={{'cursor': 'default'}} />
                    <List.Content verticalAlign='middle' style={{'cursor': 'default', 'color': 'black'}}>
                        <b>{param}</b> <i>[Custom Data]</i><br />
                        Value: <i>{dataViewerData['api-custom-params'][param]}</i>
                    </List.Content>
                </List.Item>
            )
        });
        return apiCallParams;
    }

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={dataViewerData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setDataViewerColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': dataViewerData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setDataViewerColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={dataViewerData['text-color']} 
                            onChange={(color) => { setDataViewerColor(dataViewerData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>

            <Form.Field>
                <Button.Group fluid>
                    <Button toggle content='Large' active={dataViewerData.size === 'large' ? true : false} onClick={() => { setDataViewerSize(dataViewerData.id, 'large'); }} />
                    <Button toggle content='Medium' active={dataViewerData.size === 'medium' ? true : false} onClick={() => { setDataViewerSize(dataViewerData.id, 'medium'); }} />
                    <Button toggle content='Small' active={dataViewerData.size === 'small' ? true : false} onClick={() => { setDataViewerSize(dataViewerData.id, 'small'); }} />
                </Button.Group>
            </Form.Field>

            <Form.Field>
                <Button.Group fluid>
                    <Button toggle icon='bold' active={dataViewerData.bold} onClick={() => { setDataViewerBold(dataViewerData.id, !dataViewerData.bold); }} />
                    <Button toggle icon='italic' active={dataViewerData.italic} onClick={() => { setDataViewerItalic(dataViewerData.id, !dataViewerData.italic); }} />
                    <Button toggle icon='underline' active={dataViewerData.underline} onClick={() => { setDataViewerUnderline(dataViewerData.id, !dataViewerData.underline); }} />
                    <Button toggle icon='text height' active={dataViewerData.tight} onClick={() => { setDataViewerTight(dataViewerData.id, !dataViewerData.tight); }} />
                </Button.Group>
            </Form.Field>

            <Form.Field>
                <Button.Group fluid>
                    <Button toggle icon='align left' active={dataViewerData.align === 'left' ? true : false} onClick={() => { setDataViewerAlign(dataViewerData.id, 'left'); }} />
                    <Button toggle icon='align center' active={dataViewerData.align === 'center' ? true : false} onClick={() => { setDataViewerAlign(dataViewerData.id, 'center'); }} />
                    <Button toggle icon='align right' active={dataViewerData.align === 'right' ? true : false} onClick={() => { setDataViewerAlign(dataViewerData.id, 'right'); }} />
                    <Button toggle icon='align justify' active={dataViewerData.align === 'justify' ? true : false} onClick={() => { setDataViewerAlign(dataViewerData.id, 'justify'); }} />
                </Button.Group>
            </Form.Field>

            <Form.Field>
                <Label className={'tucked-label'}>Data Source</Label>
                <Segment className={'tucked-label-compat'}>
                    <Form.Field>
                        <Label className={'tucked-label'}>API Call Type</Label>
                        <Table className={'tucked-label-compat'}>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Radio 
                                            name={'api-call-type'} 
                                            label={'GET'}  
                                            value={'activity'}
                                            checked={dataViewerData['api-call-type'] === 'GET'}
                                            onChange={() => {
                                                setDataViewerApiCallType(selectedComponent.id, 'GET');
                                            }}
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Radio 
                                            name={'api-call-type'} 
                                            label={'POST'}  
                                            value={'api'}
                                            checked={dataViewerData['api-call-type'] === 'POST'}
                                            onChange={() => {
                                                setDataViewerApiCallType(selectedComponent.id, 'POST');
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
                            value={dataViewerData['api-url']}
                            onChange={(e) => { 
                                if (!e.target.value.startsWith('/'))
                                    setDataViewerApiUrl(selectedComponent.id, '/' + e.target.value);
                                else
                                    setDataViewerApiUrl(selectedComponent.id, e.target.value);
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
                                        validateCustomParam();
                                        setAddCustomParamModalState(true);
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
                                        addDataViewerApiCustomParam(dataViewerData.id, customParam.key, customParam.value);
                                        setCustomParam({'key': '', 'value': ''});
                                    }
                                }} 
                            />
                        </Modal.Actions>
                    </Modal>
                    
                    <Form.Field>
                        <Label className={'tucked-label'}>Refresh Interval (Seconds)</Label>
                        <Input 
                            value={refreshIntervalTempState}
                            onChange={(e) => { 
                                var refint = e.target.value.replace(/[^0-9_]/g, '');
                                setRefreshIntervalTempState(refint);
                                if (refint.length === 0)
                                    refint = '0';
                                setDataViewerRefreshInterval(selectedComponent.id, refint);
                            }}
                            placeholder='Leave Blank to Prevent Refresh'
                            fluid
                        />
                    </Form.Field>
                </Segment>
            </Form.Field>

            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Data Viewer Up' 
                        onClick={() => { shiftDataViewerUp(dataViewerData.id); }} 
                        disabled={!getMoveTextButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Data Viewer Down' 
                        onClick={() => { shiftDataViewerDown(dataViewerData.id); }} 
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
                    content='Delete Data Viewer' 
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
                        Delete Data Viewer
                        <Header.Subheader>Are you sure you want to delete this data viewer?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Data Viewer' inverted onClick={() => {
                            const toBeDeleted = dataViewerData.id;
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