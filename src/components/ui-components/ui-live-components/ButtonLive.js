import { useState } from 'react';
import { Button as SemanticButton, Header, Modal } from 'semantic-ui-react';

import '../Button.css';

const ButtonLive = (props) => {
    const { appManager, componentManager, componentId, setCurrentActivity, liveData } = props;
    const buttonData = componentManager.getComponent(componentId);

    const [responseModalState, setResponseModalState] = useState(false);
    const [responseModalContent, setResponseModalContent] = useState({'status': 0, 'message': 'No request was made.'});

    const handleOnClick = () => {
        if (buttonData['on-press-action-type'] === 'activity' && buttonData['on-press-activity'] !== 'none') {
            setCurrentActivity(buttonData['on-press-activity']);
        }
        else if (buttonData['on-press-action-type'] === 'api') {
            var apiUrl = appManager.appData['server-address'];
            if (!apiUrl.startsWith('http://') && ! apiUrl.startsWith('https://'))
                apiUrl = 'http://' + apiUrl;
            if (apiUrl.endsWith(':'))
                apiUrl = apiUrl.slice(0, -1);
            apiUrl += ':' + appManager.appData['server-port'];
            if (apiUrl.endsWith('/'))
                apiUrl = apiUrl.substring(0, apiUrl.length - 1);
            apiUrl += buttonData['on-press-api-url'];

            var apiData = {};
            buttonData['on-press-api-params'].forEach(param => {
                apiData[componentManager.componentData.components[param].name] = liveData[param];
            });

            var requestInnit = {
                method: buttonData['on-press-api-call-type'],
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if (buttonData['on-press-api-call-type'] === 'POST')
                requestInnit.body = JSON.stringify(apiData);
            else if (buttonData['on-press-api-call-type'] === 'GET')
                apiUrl += '?' + Object.keys(apiData).map(key => key + '=' + apiData[key]).join('&');
            
            fetch(apiUrl, requestInnit)
                .then(response => {
                    if (response.ok) {
                        response.text().then(data => {
                            if (response.status === 299) {
                                const activity = componentManager.activityManager.getActivityId(response.statusText);
                                if (activity !== undefined)
                                    setCurrentActivity(activity);
                                else {
                                    setResponseModalContent({'status': 'Activity Not Found', 'message': 'Server responded with an invalid activity reference.'});
                                    reportResult('Activity Not Found', 'Server responded with an invalid activity reference.');
                                }
                            }
                            else {
                                setResponseModalContent({'status': response.status, 'message': data});
                                reportResult(response.status, data);
                            }
                            
                        });
                    }
                    else {
                        var statusText = response.statusText.toLowerCase();
                        statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1);
                        setResponseModalContent({'status': response.status, 'message': statusText});
                        reportResult(response.status, statusText);
                    }
                })
                .catch(error => {
                    setResponseModalContent({'status': 'Undefined', 'message': 'Something went wrong, please check the console for more details...'});
                    reportResult('Undefined', 'Something went wrong, please check the console for more details...');
                    console.log(error);
                });
        }
    }

    const reportResult = (status, message) => {
        const type = buttonData['on-press-api-result-display-type'];
        if (type === 'prompt')
            setResponseModalState(true);
        else if (type === 'toast')
            alert('Status: ' + status + '\nMessage: ' + message);
        else
            console.log('Status: ' + status + '\nMessage: ' + message);
    }

    return (
        <div>
            <SemanticButton 
                fluid id={buttonData.id} 
                className={'enfrappe-ui-buttonlive'} 
                style={{'background': buttonData.background, 'color': buttonData['text-color']}} 
                onClick={()=>{ 
                    handleOnClick();
                }}>
                <h4 id={buttonData.id}>{buttonData.text}</h4>
            </SemanticButton>
            <Modal
                open={responseModalState}
                onClose={() => setResponseModalState(false)}
                dimmer='blurring'
                size='tiny'
                header={
                    responseModalContent['status'] === 200 ?
                    <Header icon='check' content='API Call Successful!' /> :
                    <Header icon='warning sign' content='Error Making API Call' />
                }
                content={
                    <Modal.Content>
                        <h4>Server Response</h4>
                        Status: <i>{responseModalContent['status']}</i><br/>
                        Message: <i>{responseModalContent['message']}</i>
                    </Modal.Content>
                }
                actions={['Dismiss']}
            >
            </Modal>
        </div>
    );
}

export default ButtonLive;