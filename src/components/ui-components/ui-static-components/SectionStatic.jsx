import { useDrag } from "react-dnd";

import DnDSpaceStatic from "./DnDSpaceStatic";
import UIItemTypes from "../../../utils/UIItemTypes";

import '../Section.css';

const SectionStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.SECTION,
        item: { 'type': UIItemTypes.SECTION },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Section</h3>
            <div ref={drag} className={'enfrappe-ui-section draggable-enfrappe-ui'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <h1 className={'panel-heading'}>Title</h1>
                <h3 className={'panel-subheading'}>Subtitle</h3>
                <DnDSpaceStatic />
            </div>
        </div>
    );
}

export default SectionStatic;