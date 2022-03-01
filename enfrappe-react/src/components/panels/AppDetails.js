import { Image, Divider, Label, Input, Form, Button, Segment } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';

import './AppDetails.css';

import logo from '../../assets/logo.svg';

const AppDetails = () => {
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
                        />
                        <Button 
                            icon='save' 
                            data-tip='Save Application'
                            content='Save'
                        />
                    </Button.Group>
                </Form>

                <Divider horizontal>Application Details</Divider>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Label className={'tucked-label'}>Application ID</Label>
                            <Input 
                                action={{
                                    icon: 'refresh',
                                    onClick: () => { console.log("I'm supposed to generate a random ID") },
                                }}
                                placeholder='13-Digit App Identifier'
                                fluid
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label className={'tucked-label'}>Application Version</Label>
                            <Input
                                placeholder='Application Version'
                                fluid
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Label className={'tucked-label'}>Application Name</Label>
                        <Input 
                            placeholder='Application Name'
                            fluid
                        />
                    </Form.Field>
                    {/* <Form.Field>
                        <Segment>
                        <Label attached='top left'>Code</Label>
                            Pellentesque habitant morbi tristique senectus.</Segment>
                    </Form.Field> */}
                    
                    
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