import { useState } from 'react';
import { Form, Label, Input, Button, Modal, Header, Icon } from "semantic-ui-react";

import UIItemTypes from '../../utils/UIItemTypes';

const ImageProperties = (props) => {
    const { componentManager, selectedComponent, setSelectedComponent } = props;
    const { activityManager, imageManager } = componentManager;
    const { shiftImageUp, shiftImageDown, deleteImage, setImageSrcUrl} = imageManager;
    const imageData = imageManager.getImageData(selectedComponent.id);

    const [deleteButtonModalState, setDeleteButtonModalState] = useState(false);

    const getMoveTextButtonState = (imageId) => {
        const parentId = imageData.parent;
        const index = activityManager.getActivityData(parentId).children.indexOf(selectedComponent.id);
        if (imageId === 'moveUp') {
            if (index === 0) return false;
            else return true;
        }
        else if (imageId === 'moveDown') {
            if (index === activityManager.getActivityData(parentId).children.length - 1) return false;
            else return true;
        }
    }

    return (
        <Form>
            <Form.Field>
                <Label className={'tucked-label'}>Source URL</Label>
                <Input 
                    value={imageData['src-url']}
                    onChange={(e) => { 
                        setImageSrcUrl(selectedComponent.id, e.target.value);
                    }}
                    placeholder='http://localhost:3000/image.png'
                    fluid
                />
            </Form.Field>

            <Form.Field>
                <Button.Group vertical fluid>
                    <Button 
                        type='button'
                        icon='up arrow' 
                        labelPosition='left' 
                        content='Move Image Up' 
                        onClick={() => { shiftImageUp(imageData.id); }} 
                        disabled={!getMoveTextButtonState('moveUp')}
                    />
                    <Button 
                        type='button'
                        icon='down arrow' 
                        labelPosition='left' 
                        content='Move Image Down' 
                        onClick={() => { shiftImageDown(imageData.id); }} 
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
                    content='Delete Image' 
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
                        Delete Image
                        <Header.Subheader>Are you sure you want to delete this image?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteButtonModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Image' inverted onClick={() => {
                            const toBeDeleted = imageData.id;
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteImage(toBeDeleted);
                            setDeleteButtonModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
}

export default ImageProperties;