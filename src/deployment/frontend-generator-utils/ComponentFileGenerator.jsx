const ComponentFileGenerator = () => {
    return {
        serverDetailsJs: serverDetailsJs,
        endpointBrowserJs: endpointBrowserJs,
        requestBrowserJs: requestBrowserJs,
        requestDetailsJs: requestDetailsJs,
        activityLogJs: activityLogJs,
    }
}

export default ComponentFileGenerator;

const serverDetailsJs = `
import { useState } from "react";
import { Image, Divider, Form, Header, Button, Modal, Icon } from "semantic-ui-react";

import logo from '../assets/server_logo.svg';

const ServerDetails = (props) => {
    const { appDetails, setTimestampData, clearServerData, setServerData } = props;
    const { appId, appVersion, appName, serverIp, serverPort } = appDetails;

    const [clearDataModalState, setClearDataModalState] = useState(false);

    return (
        <div className={'scrollable-div'}>
            <div>
                <Image src={logo} id='logo' centered />
            </div>
            <div className={'scrollable-section'}>
                <Divider horizontal>Application Details</Divider>
                <Form>
                    <Form.Field className={'details-form'}>
                        <Header as='h5'>Application ID</Header>
                        <p>{appId}</p>
                    </Form.Field>
                    <Form.Field className={'details-form'}>
                        <Header as='h5'>Application Version</Header>
                        <p>{appVersion}</p>
                    </Form.Field>
                    <Form.Field className={'details-form'}>
                        <Header as='h5'>Application Name</Header>
                        <p>{appName}</p>
                    </Form.Field>
                </Form>
                <Divider horizontal>Server Details</Divider>
                <Form>
                    <Form.Field className={'details-form'}>
                        <Header as='h5'>Server IP</Header>
                        <p>{serverIp}</p>
                    </Form.Field>
                    <Form.Field className={'details-form'}>
                        <Header as='h5'>Server Port</Header>
                        <p>{serverPort}</p>
                    </Form.Field>
                    <Form.Field>
                        <Button content='Refresh Data' icon='refresh' labelPosition='left' fluid onClick={()=>{
                            setTimestampData({'previous': 0, 'current': 0});
                        }} />
                    </Form.Field>
                    <Form.Field>
                        <Button content='Clear All Data' color='red' icon='trash' labelPosition='left' fluid onClick={()=>{
                            setClearDataModalState(true);
                        }} />
                    </Form.Field>
                    <Modal
                        basic
                        size='small'
                        open={clearDataModalState}
                        onClose={() => { setClearDataModalState(false); }}>
                        <Header as='h2' icon inverted>
                            <Icon name='trash' />
                            Clear All Data
                            <Header.Subheader>Are you sure you want to clear all server data?</Header.Subheader>
                        </Header>
                        <Modal.Actions style={{'textAlign': 'center'}}>
                            <Button basic icon='cancel' color='green' inverted onClick={() => { setClearDataModalState(false); }} />
                            <Button icon='trash' color='red' content='Clear All Data' inverted onClick={() => {
                                clearServerData();
                                setServerData({});
                                setTimestampData({'previous': 0, 'current': 0});
                                setClearDataModalState(false);
                            }} 
                        />
                        </Modal.Actions>
                    </Modal>
                </Form>
            </div>
        </div>
    );
}

export default ServerDetails;
`;

const endpointBrowserJs = `
import { Divider, List } from "semantic-ui-react";

const EndpointBrowser = (props) => {
    const { apiMapping, selectedApiEndpoint, setSelectedApiEndpoint } = props;

    const generateApiEndpointOptions = () => {
        const apiEndpointOptions = [];

        Object.keys(apiMapping).forEach(apiEndpointFunction => {
            const apiEndpoint = apiMapping[apiEndpointFunction];
            apiEndpointOptions.push(
                <List.Item as='a'
                    key={apiEndpointFunction}
                    id={apiEndpointFunction}
                    className={'component-option' + (selectedApiEndpoint === apiEndpointFunction ? ' selected-component-option' : '')}
                    onClick={(e) => { 
                        if (selectedApiEndpoint !== e.target.id)
                            setSelectedApiEndpoint(e.target.id);
                        else
                            setSelectedApiEndpoint(null);
                    }}>
                    <List.Icon id={apiEndpointFunction} name='circle outline' size='tiny' verticalAlign='middle' />
                    <List.Content id={apiEndpointFunction}>
                        <List.Header id={apiEndpointFunction} as='h3'>{apiEndpoint}</List.Header>
                    </List.Content>
                </List.Item>
            );
        });

        return apiEndpointOptions;
    }


    return (
        Object.keys(apiMapping).length === 0 ?
        <div className={'no-component'}>
            <h1>Server API</h1>
            <p>The application server does not have any API endpoint.</p>
        </div>
        :
        <div className={'scrollable-div'}>
            <div>
                <h1 className={'panel-heading'}>Server API</h1>
                <h3 className={'panel-subheading'}>Endpoint Browser</h3>
            </div>
            <Divider />
            <div className={'scrollable-section'}>
                <List divided relaxed>
                    {generateApiEndpointOptions()}
                </List>
            </div>
        </div>
    );
}

export default EndpointBrowser;
`;

const requestBrowserJs = `
import { Divider, List } from "semantic-ui-react";

const RequestBrowser = (props) => {
    const { apiMapping, selectedApiEndpoint, selectedRequest, setSelectedRequest, serverData } = props;

    const generateRequestOptions = () => {
        const requestOptions = [];

        Object.keys(serverData).reverse().forEach(requestId => {
            const formattedReqId = requestId.split('/')[1].split('_');
            const reqTime = new Date(parseInt(formattedReqId[0])).toLocaleString();
            const reqIp = formattedReqId[1].split('-').join('.');
            if (requestId.startsWith(selectedApiEndpoint)) {
                requestOptions.push(
                    <List.Item as='a'
                    key={requestId}
                    id={requestId}
                    className={'component-option' + (requestId === selectedRequest ? ' selected-component-option' : '')}
                    onClick={(e) => { 
                        if (selectedRequest !== e.target.id)
                            setSelectedRequest(e.target.id); 
                        else
                            setSelectedRequest(null);
                    }}>
                    <List.Icon id={requestId} name='circle outline' size='tiny' verticalAlign='middle' />
                    <List.Content id={requestId}>
                        <List.Header id={requestId} as='h4'>{reqIp}</List.Header>
                        <List.Description id={requestId} as='h5' style={{'marginTop': '0px'}}>{reqTime}</List.Description>
                    </List.Content>
                </List.Item>
                );
            }
        });

        return requestOptions;
    }


    return (
        selectedApiEndpoint === null ?
        <div className={'no-component'}>
            <h1>Request Browser</h1>
            <p>No server endpoint is selected.</p>
        </div>
        :
        <div className={'scrollable-div'}>
            <div>
                <h1 className={'panel-heading'}>Request Browser</h1>
                <h3 className={'panel-subheading'}>Endpoint: <i>{apiMapping[selectedApiEndpoint]}</i></h3>
            </div>
            <Divider />
            <div className={'scrollable-section'}>
                <List divided relaxed>
                    {generateRequestOptions()} 
                </List>
            </div>
        </div>
    );
}

export default RequestBrowser;
`;

const requestDetailsJs = `
import { Divider, Form, Header } from "semantic-ui-react";

const RequestDetails = (props) => {
    const { apiMapping, selectedRequest, serverData } = props;

	var reqApi = null;
    var formattedReqId = null;
    var reqTime = null;
    var reqIp = null;
    var requestData = null;

    if (selectedRequest !== null) {
		reqApi = apiMapping[selectedRequest.split('/')[0]];
        formattedReqId = selectedRequest.split('/')[1].split('_');
        reqTime = new Date(parseInt(formattedReqId[0])).toLocaleString();
        reqIp = formattedReqId[1].split('-').join('.');
        requestData = JSON.parse(serverData[selectedRequest]);
    }

    const generateRequestDetails = () => {
        const requestOptions = [];
        Object.keys(requestData).forEach(key => {
            const value = requestData[key];
            requestOptions.push(
                <Form.Field key={key} className={'details-form'}>
                    <Header as='h5'>{key}</Header>
                    <p>{value}</p>
                </Form.Field>
            );
        });
        return requestOptions;
    }

    return (
        selectedRequest === null ?
        <div className={'no-component'}>
            <h1>Request Details</h1>
            <p>No request is selected.</p>
        </div>
        :
        <div className={'scrollable-div'}>
            <div>
                <h1 className={'panel-heading'}>Request Details</h1>
                <h3 className={'panel-subheading'}>Endpoint: <i>{reqApi}</i></h3>
            </div>
            <Divider />
            <div className={'scrollable-section'}>
                <Form>
                    <Form.Field className={'details-form'}>
                        <Header as='h5'>IP Address</Header>
                        <p>{reqIp}</p>
                    </Form.Field>
                    <Form.Field className={'details-form'}>
                        <Header as='h5'>Request Time</Header>
                        <p>{reqTime}</p>
                    </Form.Field>
                    <Divider />
                    {generateRequestDetails()}
                </Form>
            </div>
        </div>
    );
}

export default RequestDetails;
`;

const activityLogJs = `
import { Divider, List } from "semantic-ui-react";

const ActivityLog = (props) => {
    const { serverData, setSelectedApiEndpoint, setSelectedRequest } = props;

    const generateActivityLog = () => {
        const actLog = [];

        var reqIdByTime = {};
        var allTimestamps = Object.keys(serverData).map(key => {
            const t = parseInt(key.split('/')[1].split('_')[0]);
            reqIdByTime[t] = key;
            return t;
        });
        allTimestamps.sort();
        allTimestamps.reverse();

        allTimestamps.forEach(ts => {
            const requestId = reqIdByTime[ts];
            const formattedReqId = requestId.split('/')[1].split('_');
            const reqTime = new Date(parseInt(formattedReqId[0])).toLocaleString();
            
            actLog.push(
                <List.Item as='a'
                    key={requestId}
                    id={requestId}
                    className={'component-option'}
                    onClick={(e) => { 
                        setSelectedApiEndpoint(requestId.split('/')[0]);
                        setSelectedRequest(e.target.id);
                    }}>
                <List.Icon id={requestId} name='circle outline' size='tiny' verticalAlign='middle' />
                <List.Content id={requestId}>
                    <List.Description id={requestId} as='h5' style={{'marginTop': '0px'}}>{reqTime}</List.Description>
                </List.Content>
            </List.Item>
            );
        });

        return actLog;
    }

    return (
        serverData === {} ?
        <div className={'no-component'}>
            <h1>Activity Log</h1>
            <p>There is no activity to show.</p>
        </div>
        :
        <div className={'scrollable-div'}>
            <div>
                <h1 className={'panel-heading'}>Activity Log</h1>
                <h3 className={'panel-subheading'}>Total Requests Made: <i>{Object.keys(serverData).length}</i></h3>
            </div>
            <Divider />
            <div className={'scrollable-section'}>
                <List divided relaxed>
                    {generateActivityLog()} 
                </List>
            </div>
        </div>
    );
}

export default ActivityLog;
`;