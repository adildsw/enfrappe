import { useDrop } from 'react-dnd';

import UIItemTypes from '../../../utils/UIItemTypes';

import './DnDSpace.css';

const DnDSpace = (props) => {
    const { id, className, acceptedItems, centered, componentManager } = props;
    const { sectionManager } = componentManager;

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: acceptedItems, 
        drop: (item) => {
            if (item.type === UIItemTypes.SECTION) {
                sectionManager.addSection(id);
            }
            return {'droppedOn': id};
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }), [id]);
    const isActive = canDrop && isOver;
    
    const generateConcatenatedClassName = () => {
        let concatClasName = 'dnd-space ' + className;
        if (centered)
            concatClasName += ' dnd-space-centered';
        if (isActive)
            concatClasName += ' dnd-space-active';
        else if (canDrop)
            concatClasName += ' dnd-space-dragging';
        return concatClasName;
    };
    
    return (
        <div 
            className={generateConcatenatedClassName()} ref={drop} id={id}>
            { isActive || canDrop ?
                <h3 className={className} id={id}>Drop Component Here</h3>
                : <h3 className={className} id={id}>Drag and Drop Components Here</h3>
            }
        </div>
    );
}

export default DnDSpace;