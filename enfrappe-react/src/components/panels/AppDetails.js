import { Image, Divider, Label, Input, Form, Button, Checkbox, Table } from 'semantic-ui-react';
import { useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import templateManager from '../../utils/templateManager';

import './AppDetails.css';

import logo from '../../assets/logo.svg';

const AppDetails = (props) => {
    const { activityManager, appManager } = props;
    const { getAppMeta, setAppMeta, loadAppData } = appManager;
    const { loadActivityData } = activityManager;

    const appIdRef = useRef();
    const appVersionRef = useRef();
    const appNameRef = useRef();
    const appSingleUseRef = useRef();
    const appLocationLinkedRef = useRef();
    const appNotifyUserref = useRef();
    const appServerAddressRef = useRef();
    const appServerPortRef = useRef();

    const appLoadFileRef = useRef();
    const [unsavedBenchmark, setUnsavedBenchmark] = useState(templateManager.empty);

    // Checks fi there exists unsaved changes
    const areChangesUnsaved = () => {
        const currentProject = getCurrentProjectData();
        delete currentProject['app-data']['last-edited'];
        delete currentProject['activity-data']['last-edited'];
        return JSON.stringify(currentProject) !== JSON.stringify(unsavedBenchmark);
    }

    // Loads project from file
    const loadProjectFromFile = (event) => {
        console.log(appIdRef.current['value']);
        appIdRef.current['value'] = 'lololol';
        console.log(appIdRef.current['value']);
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
        loadAppData(data['app-data']);
        loadActivityData(data['activity-data'])

        appIdRef.current.value = data['app-data']['app-id'];
        appVersionRef.current.value = data['app-data']['app-version'];
        appNameRef.current.value = data['app-data']['app-name'];
        appSingleUseRef.current.checked = data['app-data']['single-use'];
        appLocationLinkedRef.current.checked = data['app-data']['location-linked'];
        appNotifyUserref.current.checked = data['app-data']['notify-user'];
        appServerAddressRef.current.value = data['app-data']['server-address'];
        appServerPortRef.current.value = data['app-data']['server-port'];

        delete data['app-data']['last-edited'];
        delete data['activity-data']['last-edited'];
        setUnsavedBenchmark(data);
    }

    // Fetches the current project data
    const getCurrentProjectData = () => {
        return {
            'app-data': appManager.appData, 
            'activity-data': activityManager.activityData
        };
    }

    // Saves project to file
    const saveProject = () => {
        const app = getCurrentProjectData();
        const blob = new Blob([JSON.stringify(app)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getAppMeta('app-id') + '_' + getAppMeta('app-version') + '.enfrappe';
        a.click();
    };

    // Controls state for app detail checkboxes
    const getCheckboxState = (key) => {
        switch(key) {
            case 'single-use':
                return getAppMeta('location-linked');
            
            case 'location-linked':
                return getAppMeta('single-use');
            
            case 'notify-user':
                return getAppMeta('single-use') || !getAppMeta('location-linked');
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
                        />
                        <Button 
                            icon='folder open' 
                            data-tip='Load Application'
                            content='Load'
                            onClick={() => appLoadFileRef.current.click()}
                        />
                        <input hidden type='file' accept='.enfrappe' id='file-input' ref={appLoadFileRef} onChange={loadProjectFromFile} />
                        <Button 
                            icon='save' 
                            data-tip='Save Application'
                            content='Save'
                            onClick={saveProject}
                        />
                    </Button.Group>
                </Form>

                <Divider horizontal>Application Details</Divider>
                <Form>
                    <Form.Group>
                        <Form.Field width={'10'}>
                            <Label className={'tucked-label'}>App ID</Label>
                            <Input 
                                placeholder='App Identifier'
                                defaultValue='com.me.frappeapp'
                                onChange={(e, data) => { setAppMeta('app-id', data.value); }}
                                fluid
                                ref={appIdRef}
                            />
                        </Form.Field>
                        <Form.Field width={'6'}>
                            <Label className={'tucked-label'}>App Version</Label>
                            <Input
                                placeholder='App Version'
                                fluid
                                defaultValue='1.0.0'
                                onChange={(e, data) => { setAppMeta('app-version', data.value); }}
                                ref={appVersionRef}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Label className={'tucked-label'}>App Name</Label>
                        <Input 
                            placeholder='App Name'
                            fluid
                            defaultValue='My Awesome Frappe App'
                            onChange={(e, data) => { setAppMeta('app-name', data.value); }}
                            ref={appNameRef}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Table>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Checkbox 
                                            label='Single Use' 
                                            ref={appSingleUseRef}
                                            onChange={(e, data) => { setAppMeta('single-use', data.checked); }}
                                            disabled={getCheckboxState('single-use')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox 
                                            label='Location-Linked' 
                                            ref={appLocationLinkedRef}
                                            onChange={(e, data) => { setAppMeta('location-linked', data.checked); }}
                                            disabled={getCheckboxState('location-linked')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox 
                                            label='Notify User' 
                                            ref={appNotifyUserref}
                                            onChange={(e, data) => { setAppMeta('notify-user', data.checked); }}
                                            disabled={getCheckboxState('notify-user')}
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
                                defaultValue='127.0.0.1'
                                onChange={(e) => { setAppMeta('server-address', e.target.value) }}
                                ref={appServerAddressRef}
                            />
                        </Form.Field>
                        <Form.Field width={'6'}>
                            <Label className={'tucked-label'}>Server Port</Label>
                            <Input
                                placeholder='1803'
                                fluid
                                defaultValue='1803'
                                onChange={(e) => { setAppMeta('server-port', e.target.value) }}
                                ref={appServerPortRef}
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