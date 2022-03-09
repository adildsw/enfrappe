import { useDrag } from "react-dnd";
import { Form, Label, Input } from 'semantic-ui-react';

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Input.css';

const TextInputStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.INPUT,
        item: { 'type': UIItemTypes.INPUT },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Input Field</h3>
            <div ref={drag} className={'enfrappe-ui-input enfrappe-ui-inputstatic'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <Form.Field>
                    <Label className={'tucked-label'}>Label</Label>
                    <Input 
                        placeholder='Placeholder'
                        fluid
                        readOnly
                    />
                </Form.Field>
            </div>
            
        </div>
    );
}

export default TextInputStatic;