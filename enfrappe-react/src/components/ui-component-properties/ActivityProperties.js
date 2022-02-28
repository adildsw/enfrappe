import { Form, Input, Label } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

import '../ui-component-properties/ActivityProperties.css';
import { useState } from 'react';

const ActivityProperties = (props) => {

    const { activityManager, currentActivity } = props;
    const { getActivity, activityEditor } = activityManager;
    const activityData = getActivity(currentActivity);

    // const [selectedColor, setSelectedColor] = useState({ hex: activityData.background });
    const [colorPickerDisplay, setColorPickerDisplay] = useState(false);

    const toggleColorPicker = () => {
        setColorPickerDisplay(!colorPickerDisplay);
    };

    const onColorChange = (color) => {
        // setSelectedColor(color);
        activityEditor.editActivityBackground(currentActivity, color.hex);
    };

    const modifyActivityName = () => {
    };

    return (
        <div>
            <Form>
                <Form.Field>
                    <Label className={'tucked-label'}>Activity Name</Label>
                    <Input 
                        value={activityData.name}
                        action={{
                            icon: 'refresh',
                            onClick: modifyActivityName,
                        }}
                        placeholder='Actvity Name'
                        fluid
                        readOnly
                    />
                </Form.Field>

                <Form.Field>
                    <Label className={'tucked-label'}>Background Color</Label>
                    <Input 
                        value={activityData.background}
                        action={{
                            icon: 'paint brush',
                            onClick: toggleColorPicker,
                            style: {backgroundColor: activityData.background, border: '1px solid #D4D4D4'},
                            
                        }}
                        placeholder='Background Color'
                        fluid
                        readOnly
                    />
                    {colorPickerDisplay ? (
                        <div className={'color-picker-popover'}>
                            <div className={'color-picker-cover'} onClick={toggleColorPicker} />
                            <SketchPicker color={activityData.background} onChange={onColorChange} disableAlpha/>
                        </div>
                    ) : null}
                </Form.Field>
            </Form>
        </div>
    );
}

export default ActivityProperties;