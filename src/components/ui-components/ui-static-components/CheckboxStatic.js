import { useDrag } from "react-dnd";
import { Checkbox as SemanticCheckbox } from "semantic-ui-react";

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Checkbox.css';

const CheckboxStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.CHECKBOX,
        item: { 'type': UIItemTypes.CHECKBOX },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Checkbox</h3>
            <div ref={drag} className={'enfrappe-ui-checkbox enfrappe-ui-checkboxstatic'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <SemanticCheckbox className={'enfrappe-ui-checkboxmain'} label='Label' readOnly checked />
            </div>
        </div>
    );
}

export default CheckboxStatic;