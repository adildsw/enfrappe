import { useDrag } from "react-dnd";
import { Form, Radio as SemanticRadio, Segment, Label } from "semantic-ui-react";

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Radio.css';

const RadioStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.RADIO,
        item: { 'type': UIItemTypes.RADIO },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Radio Group</h3>
            <div ref={drag} className={'enfrappe-ui-radio enfrappe-ui-radiostatic draggable-enfrappe-ui'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <Label className={'tucked-label'}>Label</Label>
                <Segment className={'tucked-label-compat'}>
                    <Form.Field>
                        <SemanticRadio className={'enfrappe-ui-radiomain'} name={'enfrappe-ui-radiomain'} label='Option A' readOnly checked />
                    </Form.Field>
                    <Form.Field>
                        <SemanticRadio className={'enfrappe-ui-radiomain'} name={'enfrappe-ui-radiomain'} label='Option B' readOnly />
                    </Form.Field>
                </Segment>
            </div>
        </div>
    );
}

export default RadioStatic;