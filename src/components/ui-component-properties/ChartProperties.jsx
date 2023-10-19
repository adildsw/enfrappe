import { useState } from 'react';
import { Form, Label, Input, Button, Modal, Header, Icon, List, Segment, Table, Radio, Dropdown } from "semantic-ui-react";
import { SketchPicker } from 'react-color';

import UIItemTypes from '../../utils/UIItemTypes';

const ChartProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, chartManager } = componentManager;
    const { setChartTitle, setChartXLabel, setChartYLabel, setChartTextColor, setChartLineColor, setChartBackground, shiftChartUp, shiftChartDown, deleteChart, setChartApiCallType, setChartApiUrl, addChartApiCustomParam, deleteChartApiCustomParam } = chartManager;
    const chartData = chartManager.getChartData(selectedComponent.id);
    
    const [backgroundColorPickerDisplay, setBackgroundColorPickerDisplay] = useState(false);
    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);
    const [lineColorPickerDisplay, setLineColorPickerDisplay] = useState(false);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const [addCustomParamModalState, setAddCustomParamModalState] = useState(false);
    const [customParam, setCustomParam] = useState({'key': '', 'value': ''})
    const [customParamState, setCustomParamState] = useState({'valid': false, 'message': 'Parameter key cannot be empty'});

    const validateCustomParam = (newParamKey) => {
        if (newParamKey === '' || newParamKey === undefined) {
            setCustomParamState({'valid': false, 'message': 'Parameter name cannot be empty'});
        } else {
            if (chartData['api-custom-params'].hasOwnProperty(newParamKey)) {
                setCustomParamState({'valid': false, 'message': 'Parameter name already exists'});
            }
            else {
                setCustomParamState({'valid': true, 'message': ''});
            }
        }
    }

    const getMoveTextButtonState = (chartId) => {
        const parentId = chartData.parent;
        const index = activityManager.getActivityData(parentId).children.indexOf(selectedComponent.id);
        if (chartId === 'moveUp') {
            if (index === 0) return false;
            else return true;
        }
        else if (chartId === 'moveDown') {
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
        Object.keys(chartData['api-custom-params']).forEach(param => {
            apiCallParams.push(
                <List.Item key={param} as='a'>
                    <List.Content floated='right'>
                        <List.Icon name='trash' verticalAlign='middle' onClick={() => { deleteChartApiCustomParam(chartData.id, param); }} />
                    </List.Content>
                    <List.Icon name='circle outline' size='tiny' verticalAlign='middle' style={{'cursor': 'default'}} />
                    <List.Content verticalAlign='middle' style={{'cursor': 'default', 'color': 'black'}}>
                        <b>{param}</b> <i>[Custom Data]</i><br />
                        Value: <i>{chartData['api-custom-params'][param]}</i>
                    </List.Content>
                </List.Item>
            )
        });
        return apiCallParams;
    }

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'}>Chart Title</Label>
                <Input 
                    value={chartData['title']}
                    onChange={(e) => { setChartTitle(selectedComponent.id, e.target.value); }}
                    placeholder='Chart Label'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>X-Axis Label</Label>
                <Input 
                    value={chartData['x-label']}
                    onChange={(e) => { setChartXLabel(selectedComponent.id, e.target.value); }}
                    placeholder='X-Axis Label'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Y-Axis Label</Label>
                <Input 
                    value={chartData['y-label']}
                    onChange={(e) => { setChartYLabel(selectedComponent.id, e.target.value); }}
                    placeholder='Y-Axis Label'
                    fluid
                />
            </Form.Field>

            <Form.Field>
                <Label className={'tucked-label'}>Background Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={chartData['background']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setBackgroundColorPickerDisplay(!backgroundColorPickerDisplay); },
                        style: {'background': chartData['background'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {backgroundColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setBackgroundColorPickerDisplay(!backgroundColorPickerDisplay); }} />
                        <SketchPicker 
                            color={chartData['background']} 
                            onChange={(color) => { setChartBackground(chartData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>

            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={chartData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': chartData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={chartData['text-color']} 
                            onChange={(color) => { setChartTextColor(chartData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>

            <Form.Field>
                <Label className={'tucked-label'}>Line Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={chartData['line-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setLineColorPickerDisplay(!lineColorPickerDisplay); },
                        style: {'background': chartData['line-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {lineColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setLineColorPickerDisplay(!lineColorPickerDisplay); }} />
                        <SketchPicker 
                            color={chartData['line-color']} 
                            onChange={(color) => { setChartLineColor(chartData.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
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
                                            checked={chartData['api-call-type'] === 'GET'}
                                            onChange={() => {
                                                setChartApiCallType(selectedComponent.id, 'GET');
                                            }}
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Radio 
                                            name={'api-call-type'} 
                                            label={'POST'}  
                                            value={'api'}
                                            checked={chartData['api-call-type'] === 'POST'}
                                            onChange={() => {
                                                setChartApiCallType(selectedComponent.id, 'POST');
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
                            value={chartData['api-url']}
                            onChange={(e) => { 
                                if (!e.target.value.startsWith('/'))
                                    setChartApiUrl(selectedComponent.id, '/' + e.target.value);
                                else
                                    setChartApiUrl(selectedComponent.id, e.target.value);
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
                                        addChartApiCustomParam(chartData.id, customParam.key, customParam.value);
                                        setCustomParam({'key': '', 'value': ''});
                                    }
                                }} 
                            />
                        </Modal.Actions>
                    </Modal>
                    
                    <div>
                        <span className={'panel-subheading'}>
                            <Icon name='info circle' />
                            Ensure that the API returns a JSON object with keys 'x' and 'y', each containing an array of values.
                        </span>
                    </div>
                </Segment>
            </Form.Field>

            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Chart Up' 
                        onClick={() => { shiftChartUp(chartData.id); }} 
                        disabled={!getMoveTextButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Chart Down' 
                        onClick={() => { shiftChartDown(chartData.id); }} 
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
                    content='Delete Chart' 
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
                        Delete Chart
                        <Header.Subheader>Are you sure you want to delete this chart?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Chart' inverted onClick={() => {
                            const toBeDeleted = chartData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteChart(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default ChartProperties;