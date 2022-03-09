import { useDrag } from "react-dnd";
import { Button as SemanticButton } from "semantic-ui-react";

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Button.css';

const ButtonStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.BUTTON,
        item: { 'type': UIItemTypes.BUTTON },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Button</h3>
            <div ref={drag}>
                <SemanticButton fluid className={'enfrappe-ui-button enfrappe-ui-buttonstatic'} style={{'background': '#CCCCCC', 'opacity': isDragging ? '0.4' : '0.7'}}>
                    <h4 className={'enfrappe-ui-buttonlabel'}>Button</h4>
                </SemanticButton>
            </div>
           
        </div>
    );
}

export default ButtonStatic;