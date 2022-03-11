import { useState } from "react";
import { Form, Label, Input, Button, Modal, Header, Icon } from "semantic-ui-react";
import { SketchPicker } from "react-color";
import UIItemTypes from "../../utils/UIItemTypes";

const SectionProperties = (props) => {
    const { selectedComponent, setSelectedComponent, sectionManager, activityManager } = props;
    const { getSectionData, setSectionTitle, setSectionSubtitle, setSectionBackground, setSectionTextColor, shiftSectionUp, shiftSectionDown, deleteSection } = sectionManager;
    const sectionData = getSectionData(selectedComponent.id);

    const [textColorPickerDisplay, setTextColorPickerDisplay] = useState(false);
    const [backgroundColorPickerDisplay, setBackgroundColorPickerDisplay] = useState(false);

    const [deleteSectionModalState, setDeleteSectionModalState] = useState(false);

    const getMoveSectionButtonState = (buttonId) => {
        const parentId = sectionData.parent;
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
                <Label className={'tucked-label'}>Section Title</Label>
                <Input 
                    value={sectionData['title']}
                    onChange={(e) => { setSectionTitle(selectedComponent.id, e.target.value); }}
                    placeholder='Section Title'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Section Subtitle</Label>
                <Input 
                    value={sectionData['subtitle']}
                    onChange={(e) => { setSectionSubtitle(selectedComponent.id, e.target.value); }}
                    placeholder='Section Subtitle'
                    fluid
                />
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Text Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={sectionData['text-color']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setTextColorPickerDisplay(!textColorPickerDisplay); },
                        style: {'background': sectionData['text-color'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Text Color'
                    fluid
                    readOnly 
                />
                {textColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setTextColorPickerDisplay(!textColorPickerDisplay); }} />
                        <SketchPicker 
                            color={sectionData['text-color']} 
                            onChange={(color) => { setSectionTextColor(selectedComponent.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>
            <Form.Field>
                <Label className={'tucked-label'}>Background Color</Label>
                <Input 
                    className={'button-based-input-only'}
                    value={sectionData['background']}
                    action={{
                        icon: 'paint brush',
                        onClick: () => { setBackgroundColorPickerDisplay(!backgroundColorPickerDisplay); },
                        style: {'background': sectionData['background'], 'border': '1px solid #ccc'}
                    }}
                    placeholder='Background Color'
                    fluid
                    readOnly 
                />
                {backgroundColorPickerDisplay &&
                    <div className={'color-picker-popover'}>
                        <div className={'color-picker-cover'} onClick={() => { setBackgroundColorPickerDisplay(!backgroundColorPickerDisplay); }} />
                        <SketchPicker 
                            color={sectionData['background']} 
                            onChange={(color) => { setSectionBackground(selectedComponent.id, color.hex); }} 
                            disableAlpha 
                        />
                    </div>
                }
            </Form.Field>
            <Form.Field>
                <Button.Group vertical fluid>
                <Button 
                    type='button'
                    icon='up arrow' 
                    labelPosition='left' 
                    content='Move Section Up' 
                    onClick={() => { shiftSectionUp(selectedComponent.id); }} 
                    disabled={!getMoveSectionButtonState('moveUp')}
                />
                <Button 
                    type='button'
                    icon='down arrow' 
                    labelPosition='left' 
                    content='Move Section Down' 
                    onClick={() => { shiftSectionDown(selectedComponent.id); }} 
                    disabled={!getMoveSectionButtonState('moveDown')}
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
                    content='Delete Section' 
                    onClick={() => { 
                        setDeleteSectionModalState(true);
                    }} 
                />

                <Modal
                    basic
                    size='small'
                    open={deleteSectionModalState}
                    onClose={() => { setDeleteSectionModalState(false); }}>
                    <Header as='h2' icon inverted>
                        <Icon name='trash' />
                        Delete Section
                        <Header.Subheader>Are you sure you want to delete this section?</Header.Subheader>
                    </Header>
                    <Modal.Actions style={{'textAlign': 'center'}}>
                        <Button basic icon='cancel' color='green' inverted onClick={() => { setDeleteSectionModalState(false); }} />
                        <Button icon='trash' color='red' content='Delete Section' inverted onClick={() => {
                            const sectionIdToBeDeleted = sectionData['id'];
                            setSelectedComponent({id: 'None', type: UIItemTypes.NONE});
                            deleteSection(sectionIdToBeDeleted);
                            setDeleteSectionModalState(false);
                        }} 
                    />
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </Form>
    );
};

export default SectionProperties;