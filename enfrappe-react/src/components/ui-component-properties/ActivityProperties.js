import { Form, Input, Label } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

import '../ui-component-properties/ActivityProperties.css';
import { useState } from 'react';

const ActivityProperties = (props) => {

    const [selectedColor, setSelectedColor] = useState({ hex: "#ffffff" });
    const [colorPickerDisplay, setColorPickerDisplay] = useState(false);

    const toggleColorPicker = () => {
        setColorPickerDisplay(!colorPickerDisplay);
    };

    const onChangeMethod = (color) => {
        setSelectedColor(color);
    };

    return (
        <div>
            <Form>
                <Form.Field>
                    <Label className={'tucked-label'}>Activity Name</Label>
                    <Input 
                        action={{
                            icon: 'cog',
                        }}
                        placeholder='Actvity Name'
                        fluid
                        readOnly
                    />
                </Form.Field>

                <Form.Field>
                    <Label className={'tucked-label'}>Background Color</Label>
                    <Input 
                        action={{
                            icon: 'paint brush',
                            onClick: toggleColorPicker,
                            style: {backgroundColor: selectedColor.hex, border: '1px solid #D4D4D4'},
                            
                        }}
                        placeholder='Background Color'
                        fluid
                        value={selectedColor.hex}
                        readOnly
                    />
                    {colorPickerDisplay ? (
                        <div className={'color-picker-popover'}>
                            <div className={'color-picker-cover'} onClick={toggleColorPicker} />
                            <SketchPicker color={selectedColor} onChange={onChangeMethod} disableAlpha/>
                        </div>
                    ) : null}
                </Form.Field>
            </Form>
        </div>
    );
}

export default ActivityProperties;