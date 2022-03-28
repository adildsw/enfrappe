import { Image, Divider, Label, Input, Form, Button, Checkbox, Table, Modal, Header, Icon } from 'semantic-ui-react';
import { useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { resetId } from "react-id-generator";
import nextId from 'react-id-generator';

import { enfrappifyData, generateAndPrintQRCodePdf, generateQRCode, generateQRCodePdf } from '../../utils/DataUtils';

import getAppTemplate from '../../utils/TemplateManager';
import CustomServerUtils from '../../deployment/CustomServerUtils';

import './AppDetails.css';

import logo from '../../assets/logo.svg';
import UIItemTypes from '../../utils/UIItemTypes';

const AppDetails = (props) => {
    const { componentManager, appManager, simulationState, setSimulationState, setCurrentActivity, setSelectedComponent, resetLiveData } = props;
    const { getAppMetadata, setAppMetadata, appData, setAppData } = appManager;
    const { componentData, setComponentData } = componentManager;

    const customServerUtils = CustomServerUtils(appManager, componentManager);

    const appLoadFileRef = useRef();
    const [unsavedModalState, setUnsavedModalState] = useState({'state': false, 'action': 'new'});
    const [customServerModalState, setCustomServerModalState] = useState(false);
    const [customServerDetails, setCustomServerDetails] = useState({'ip': '127.0.0.1', 'port': '1804'});

    // Checks if there exists unsaved changes [NOT WORKING]
    // const [unsavedBenchmark, setUnsavedBenchmark] = useState(getAppTemplate('EMPTY'));
    // const areChangesUnsaved = () => {
    //     const currentProject = getCurrentProjectData();
    //     delete currentProject['app-data']['last-edited'];
    //     delete currentProject['component-data']['last-edited'];
    //     const unsavedBenchmarkNoTimestamp = {...unsavedBenchmark};
    //     delete unsavedBenchmarkNoTimestamp['app-data']['last-edited'];
    //     delete unsavedBenchmarkNoTimestamp['component-data']['last-edited'];
    //     console.log(currentProject, unsavedBenchmarkNoTimestamp);
    //     console.log(JSON.stringify(currentProject) !== JSON.stringify(unsavedBenchmarkNoTimestamp))
    //     return JSON.stringify(currentProject) !== JSON.stringify(unsavedBenchmarkNoTimestamp);
    // }

    // Loads project from file
    const loadProjectFromFile = (event) => {
        const file = event.target.files[0];
        if (file === undefined) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const loadedProject = JSON.parse(e.target.result);
            loadProject(loadedProject);
        };
        reader.readAsText(file);
        appLoadFileRef.current.value = "";
    }

    const loadProject = (data) => {
        setSelectedComponent({'id': 'None', 'type': UIItemTypes.NONE});
        resetIdGeneratorToLastMax(data);
        setAppData(data['app-data']);
        setComponentData(data['component-data']);
        // setUnsavedBenchmark(data);

        // Workaround for fixing app-loading bug
        setSimulationState(true);
        setSimulationState(false);
    }

    const resetIdGeneratorToLastMax = (data) => {
        var maxId = 0;
        data = JSON.stringify(data);
        var matches = data.matchAll(/id[0-9]+/g);
        matches = Array.from(matches);
        var extractedIds = matches.map(match => match[0]);
        extractedIds.forEach(id => {
            var idNumber = parseInt(id.substring(2));
            if (idNumber > maxId) maxId = idNumber;
        });
        resetId();
        for (let i = 0; i < maxId; i++) 
            nextId();
        return maxId;
    }

    // Fetches the current project data
    const getCurrentProjectData = () => {
        return {
            'app-data': appData, 
            'component-data': componentData
        };
    }

    // Saves project to file
    const saveProject = () => {
        const app = getCurrentProjectData();
        const blob = new Blob([JSON.stringify(app)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getAppMetadata('app-id') + '_' + getAppMetadata('app-version') + '.enfrappe';
        a.click();
        // setUnsavedBenchmark(app);
    };

    // Controls state for app detail checkboxes
    const getCheckboxState = (key) => {
        switch(key) {
            case 'single-use':
                return getAppMetadata('location-linked');
            
            case 'location-linked':
                return getAppMetadata('single-use');
            
            case 'notify-user':
                return getAppMetadata('single-use') || !getAppMetadata('location-linked');
            
            default:
                return false;
        }
    };

    const downloadQRCode = () => {
        const enfrappefiedData = enfrappifyData(appManager.appData['app-id'], getCurrentProjectData());
        // generateQRCode(appManager.appData['app-id'], appManager.appData['app-version'], enfrappefiedData);
        generateQRCodePdf(appManager.appData['app-id'], appManager.appData['app-name'], appManager.appData['app-version'], enfrappefiedData);
    };

    const printQRCode = () => {
        const enfrappefiedData = enfrappifyData(appManager.appData['app-id'], getCurrentProjectData());
        generateAndPrintQRCodePdf(appManager.appData['app-id'], appManager.appData['app-name'], appManager.appData['app-version'], enfrappefiedData);
    }

    return (
        <div className={'scrollable-div'}>
            <div>
                <Image src={logo} id='logo' centered />
            </div>
            <div className={'scrollable-section'}>
                <Divider horizontal>General</Divider>
                <Form>
                    <ReactTooltip effect='solid' place='bottom' type='dark'/>
                    <Button.Group className={'centered-button-text'} fluid>
                        <Button 
                            icon='file' 
                            data-tip='Create New Application'
                            content='New'
                            onClick={() => {
                                setUnsavedModalState({'state': true, 'action': 'new'});
                                // if (areChangesUnsaved())
                                //     setUnsavedModalState({'state': true, 'action': 'new'});
                                // else
                                    // loadProject(getAppTemplate('EMPTY'));
                            }}
                            disabled={simulationState}
                        />
                        <Button 
                            icon='folder open' 
                            data-tip='Load Application'
                            content='Load'
                            onClick={() => {
                                setUnsavedModalState({'state': true, 'action': 'load'});
                                // if (areChangesUnsaved())
                                //     setUnsavedModalState({'state': true, 'action': 'load'});
                                // else
                                    // appLoadFileRef.current.click();
                            }}
                            disabled={simulationState}
                        />
                        <input hidden type='file' accept='.enfrappe' id='file-input' ref={appLoadFileRef} onChange={loadProjectFromFile} />
                        <Button 
                            icon='save' 
                            data-tip='Save Application'
                            content='Save'
                            onClick={saveProject}
                            disabled={simulationState}
                        />
                    </Button.Group>

                    <Modal
                        basic
                        size='small'
                        open={unsavedModalState.state}
                        onClose={() => { setUnsavedModalState({'state': false, 'action': 'new'}); }}>
                        <Header as='h2' icon inverted>
                            <Icon name='warning sign' />
                            Unsaved Changes
                            <Header.Subheader>Any unsaved changes will be lost. Are you sure you want to proceed?</Header.Subheader>
                        </Header>
                        <Modal.Actions style={{'textAlign': 'center'}}>
                            <Button basic icon='cancel' color='green' inverted onClick={() => { setUnsavedModalState({'state': false, 'action': 'new'}); }} />
                            <Button icon='check' color='red' content='Yes' inverted onClick={() => {
                                if (unsavedModalState.action === 'new')
                                    window.location.reload(false);
                                else if (unsavedModalState.action === 'load')
                                    appLoadFileRef.current.click();
                                setUnsavedModalState({'state': false, 'action': 'new'});
                            }} 
                        />
                        </Modal.Actions>
                    </Modal>
                </Form>

                <Divider horizontal>Application Details</Divider>
                <Form>
                    <Form.Group>
                        <Form.Field width={'10'}>
                            <Label className={'tucked-label'}>App ID</Label>
                            <Input 
                                placeholder='App Identifier'
                                onChange={(e, data) => { setAppMetadata('app-id', data.value); }}
                                fluid
                                value={getAppMetadata('app-id')}
                                disabled={simulationState}
                            />
                        </Form.Field>
                        <Form.Field width={'6'}>
                            <Label className={'tucked-label'}>App Version</Label>
                            <Input
                                placeholder='App Version'
                                fluid
                                onChange={(e, data) => { setAppMetadata('app-version', data.value); }}
                                value={getAppMetadata('app-version')}
                                disabled={simulationState}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Label className={'tucked-label'}>App Name</Label>
                        <Input 
                            placeholder='App Name'
                            fluid
                            onChange={(e, data) => { setAppMetadata('app-name', data.value); }}
                            value={getAppMetadata('app-name')}
                            disabled={simulationState}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label className={'tucked-label'}>App Features</Label>
                        <Table className={'tucked-label-compat'}>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Checkbox 
                                            label='Single Use' 
                                            onChange={(e, data) => { setAppMetadata('single-use', data.checked); }}
                                            disabled={getCheckboxState('single-use') || simulationState}
                                            checked={getAppMetadata('single-use')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Checkbox 
                                            label='Location-Linked' 
                                            onChange={(e, data) => { setAppMetadata('location-linked', data.checked); }}
                                            disabled={getCheckboxState('location-linked') || simulationState}
                                            checked={getAppMetadata('location-linked')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Checkbox 
                                            label='Notify User' 
                                            onChange={(e, data) => { setAppMetadata('notify-user', data.checked); }}
                                            disabled={getCheckboxState('notify-user') || simulationState}
                                            checked={getAppMetadata('notify-user')}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={'10'}>
                            <Label className={'tucked-label'}>Server Address</Label>
                            <Input
                                placeholder='127.0.0.1'
                                fluid
                                onChange={(e) => { setAppMetadata('server-address', e.target.value); }}
                                value={getAppMetadata('server-address')}
                                disabled={simulationState}
                            />
                        </Form.Field>
                        <Form.Field width={'6'}>
                            <Label className={'tucked-label'}>Server Port</Label>
                            <Input
                                placeholder='1803'
                                fluid
                                onChange={(e) => { 
                                    const port = e.target.value.replace(/[^0-9]/g, '');
                                    setAppMetadata('server-port', port); 
                                }}
                                value={getAppMetadata('server-port')}
                                disabled={simulationState}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>

                <Divider horizontal>Deployment</Divider>
                <Form>
                    <Form.Field>
                        <Button.Group className={'centered-button-text'} vertical fluid>
                        <Button 
                                icon={simulationState ? 'stop' : 'play'}
                                labelPosition='left'
                                color={simulationState ? 'red' : 'green'}
                                content={simulationState ? 'Stop Simulation' : 'Start Simulation'}
                                onClick={() => { 
                                    resetLiveData();
                                    setCurrentActivity('main-activity');
                                    setSimulationState(!simulationState);
                                    setSelectedComponent({'id': 'None', 'type': UIItemTypes.NONE});
                                }}
                            />
                        </Button.Group>
                    </Form.Field>
                    <Form.Field>
                        <Button.Group className={'centered-button-text'} vertical fluid>
                            <Button 
                                icon='qrcode' 
                                labelPosition='left'
                                content='Download QR Code'
                                disabled={simulationState}
                                onClick={() => { downloadQRCode(); }}
                            />
                            <Button 
                                icon='print' 
                                labelPosition='left'
                                content='Print QR Code'
                                disabled={simulationState}
                                onClick={() => { printQRCode(); }}
                            />
                            <Button 
                                icon='cogs' 
                                labelPosition='left'
                                content='Generate Custom Server'
                                onClick={() => { 
                                    // Setting custom frontend server ip/port
                                    // setCustomServerModalState(true); 
                                    customServerUtils.generateCustomServer(customServerDetails.ip, customServerDetails.port);
                                }}
                                disabled={simulationState}
                            />
                        </Button.Group>
                    </Form.Field>
                    <Form.Field>
                        <Button.Group className={'centered-button-text'} vertical fluid>
                        <Button 
                                icon={'download'}
                                labelPosition='left'
                                content={'Download Application Package'}
                                onClick={() => { 
                                    // TODO: Download Application Package
                                }}
                            />
                        </Button.Group>
                    </Form.Field>
                    <Modal
                        size={'tiny'}
                        open={customServerModalState}
                        onClose={() => { setCustomServerModalState(false); }}>
                        <Header icon='cogs' content='Custom Frontend Server Details' />
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <Label className={'tucked-label'}>Frontend IP</Label>
                                    <Form.Input 
                                        value={customServerDetails.ip}
                                        placeholder={'127.0.0.1'}
                                        fluid
                                        onChange={(e, data) => { setCustomServerDetails({...customServerDetails, 'ip': data.value}); }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Label className={'tucked-label'}>Frontend Port</Label>
                                    <Form.Input 
                                        value={customServerDetails.port}
                                        placeholder={'1804'}
                                        fluid 
                                        onChange={(e, data) => { 
                                            const port = e.target.value.replace(/[^0-9]/g, '');
                                            setCustomServerDetails({...customServerDetails, 'port': port});
                                        }}
                                    />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button 
                                icon='cancel' 
                                onClick={() => { setCustomServerModalState(false); }} 
                            />
                            <Button 
                                icon='check'
                                content='Create Custom Server'
                                labelPosition='right' 
                                onClick={() => { 
                                    setCustomServerModalState(false);
                                    customServerUtils.generateCustomServer(customServerDetails.ip, customServerDetails.port);
                                }} 
                            />
                        </Modal.Actions>
                    </Modal>
                </Form>
                
            </div>
        </div>
    );
}

export default AppDetails;