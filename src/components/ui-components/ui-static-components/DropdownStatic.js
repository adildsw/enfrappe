import { useDrag } from "react-dnd";
import { Form, Label, Dropdown as SemanticDropdown } from "semantic-ui-react";

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Dropdown.css';

const DropdownStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.DROPDOWN,
        item: { 'type': UIItemTypes.DROPDOWN },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Dropdown</h3>
            <div ref={drag} className={'enfrappe-ui-dropdown enfrappe-ui-dropdownstatic'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <Form.Field>
                    <Label className={'tucked-label'}>Label</Label>
                    <SemanticDropdown className={'enfrappe-ui-dropdownmain'} placeholder='Dropdown Items' fluid selection options={[]} />
                </Form.Field>
            </div>
        </div>
    );
}

export default DropdownStatic;