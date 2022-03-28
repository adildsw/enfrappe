import { useDrag } from "react-dnd";

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Text.css';

const TextStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.TEXT,
        item: { 'type': UIItemTypes.TEXT },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Text</h3>
            <div ref={drag} className={'enfrappe-ui-text enfrappe-ui-textstatic draggable-enfrappe-ui'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <p>Text content here.</p>
            </div>
        </div>
    );
}

export default TextStatic;