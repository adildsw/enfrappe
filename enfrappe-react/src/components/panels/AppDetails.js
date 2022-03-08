import { Image, Divider, Label, Input, Form, Button, Checkbox, Table, Modal, Header, Icon } from 'semantic-ui-react';
import { useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import getAppTemplate from '../../utils/TemplateManager';

import './AppDetails.css';

import logo from '../../assets/logo.svg';

const AppDetails = (props) => {
    const { componentManager, appManager } = props;
    const { getAppMetadata, setAppMetadata, appData, setAppData } = appManager;
    const { componentData, setComponentData } = componentManager;

    const appLoadFileRef = useRef();
    const [unsavedBenchmark, setUnsavedBenchmark] = useState(getAppTemplate('EMPTY'));
    const [unsavedModalState, setUnsavedModalState] = useState({'state': false, 'action': 'new'});

    // Checks if there exists unsaved changes
    const areChangesUnsaved = () => {
        const currentProject = getCurrentProjectData();
        delete currentProject['app-data']['last-edited'];
        delete currentProject['component-data']['last-edited'];

        const unsavedBenchmarkNoTimestamp = {...unsavedBenchmark};
        delete unsavedBenchmarkNoTimestamp['app-data']['last-edited'];
        delete unsavedBenchmarkNoTimestamp['component-data']['last-edited'];

        return JSON.stringify(currentProject) !== JSON.stringify(unsavedBenchmarkNoTimestamp);
    }

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
    }

    const loadProject = (data) => {
        setAppData(data['app-data']);
        setComponentData(data['component-data'])
        setUnsavedBenchmark(data);
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
        setUnsavedBenchmark(app);
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
                                if (areChangesUnsaved())
                                    setUnsavedModalState({'state': true, 'action': 'new'});
                                else
                                    loadProject(getAppTemplate('EMPTY'));
                            }}
                        />
                        <Button 
                            icon='folder open' 
                            data-tip='Load Application'
                            content='Load'
                            onClick={() => {
                                if (areChangesUnsaved())
                                    setUnsavedModalState({'state': true, 'action': 'load'});
                                else
                                    appLoadFileRef.current.click();
                            }}
                        />
                        <input hidden type='file' accept='.enfrappe' id='file-input' ref={appLoadFileRef} onChange={loadProjectFromFile} />
                        <Button 
                            icon='save' 
                            data-tip='Save Application'
                            content='Save'
                            onClick={saveProject}
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
                            <Header.Subheader>There are unsaved changes. Are you sure you want to proceed?</Header.Subheader>
                        </Header>
                        <Modal.Actions style={{'textAlign': 'center'}}>
                            <Button basic icon='cancel' color='green' inverted onClick={() => { setUnsavedModalState({'state': false, 'action': 'new'}); }} />
                            <Button icon='check' color='red' content='Yes' inverted onClick={() => {
                                if (unsavedModalState.action === 'new')
                                    loadProject(getAppTemplate('EMPTY'));
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
                            />
                        </Form.Field>
                        <Form.Field width={'6'}>
                            <Label className={'tucked-label'}>App Version</Label>
                            <Input
                                placeholder='App Version'
                                fluid
                                onChange={(e, data) => { setAppMetadata('app-version', data.value); }}
                                value={getAppMetadata('app-version')}
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
                        />
                    </Form.Field>
                    <Form.Field>
                        <Table>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Checkbox 
                                            label='Single Use' 
                                            onChange={(e, data) => { setAppMetadata('single-use', data.checked); }}
                                            disabled={getCheckboxState('single-use')}
                                            checked={getAppMetadata('single-use')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Checkbox 
                                            label='Location-Linked' 
                                            onChange={(e, data) => { setAppMetadata('location-linked', data.checked); }}
                                            disabled={getCheckboxState('location-linked')}
                                            checked={getAppMetadata('location-linked')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' verticalAlign='middle'>
                                        <Checkbox 
                                            label='Notify User' 
                                            onChange={(e, data) => { setAppMetadata('notify-user', data.checked); }}
                                            disabled={getCheckboxState('notify-user')}
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
                                onChange={(e) => { setAppMetadata('server-address', e.target.value) }}
                                value={getAppMetadata('server-address')}
                            />
                        </Form.Field>
                        <Form.Field width={'6'}>
                            <Label className={'tucked-label'}>Server Port</Label>
                            <Input
                                placeholder='1803'
                                fluid
                                onChange={(e) => { setAppMetadata('server-port', e.target.value) }}
                                value={getAppMetadata('server-port')}
                            />
                        </Form.Field>
                    </Form.Group>
                    
                    
                </Form>

                <Divider horizontal>Deployment</Divider>
                <Form>
                    <Form.Field>
                        <Button.Group className={'centered-button-text'} vertical fluid>
                            <Button 
                                icon='game' 
                                labelPosition='left'
                                content='Test Application'
                            />
                            <Button 
                                icon='eye' 
                                labelPosition='left'
                                content='View QR Code'
                            />
                            <Button 
                                icon='print' 
                                labelPosition='left'
                                content='Print QR Code'
                            />
                            <Button 
                                icon='download' 
                                labelPosition='left'
                                content='Download Application Package'
                            />
                        </Button.Group>
                    </Form.Field>

                    <Form.Field>
                        <Button.Group className={'centered-button-text'} vertical fluid>
                            <Button 
                                icon='cogs' 
                                labelPosition='left'
                                content='Generate Backend Server'
                            />
                        </Button.Group>
                    </Form.Field>
                </Form>
                
            </div>
        </div>
    );
}

export default AppDetails;