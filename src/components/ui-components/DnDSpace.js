import { useDrop } from 'react-dnd';

import UIItemTypes from '../../utils/UIItemTypes';

import './DnDSpace.css';

const DnDSpace = (props) => {
    const { id, className, acceptedItems, centered, componentManager } = props;
    const { sectionManager, buttonManager, textManager, inputManager, checkboxManager, radioManager, dropdownManager, dataViewerManager, chartManager } = componentManager;

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: acceptedItems, 
        drop: (item) => {
            if (item.type === UIItemTypes.SECTION)
                sectionManager.addSection(id);
            else if (item.type === UIItemTypes.BUTTON)
                buttonManager.addButton(id);
            else if (item.type === UIItemTypes.TEXT)
                textManager.addText(id);
            else if (item.type === UIItemTypes.INPUT)
                inputManager.addInput(id);
            else if (item.type === UIItemTypes.CHECKBOX)
                checkboxManager.addCheckbox(id);
            else if (item.type === UIItemTypes.RADIO)
                radioManager.addRadio(id);
            else if (item.type === UIItemTypes.DROPDOWN)
                dropdownManager.addDropdown(id);
            else if (item.type === UIItemTypes.DATAVIEWER)
                dataViewerManager.addDataViewer(id);
            else if (item.type === UIItemTypes.CHART)
                chartManager.addChart(id);
                
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