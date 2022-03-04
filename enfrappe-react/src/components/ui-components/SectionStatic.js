import { useDrag } from "react-dnd";

import DnDSpaceStatic from "./ui-component-utils/DnDSpaceStatic";
import DropItemTypes from "../../utils/DropItemTypes";

import './Section.css';

const SectionStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DropItemTypes.SECTION,
        item: { 'type': DropItemTypes.SECTION },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Section</h3>
            <div ref={drag} className={'enfrappe-ui-section'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <h1 className={'panel-heading'}>Title</h1>
                <h3 className={'panel-subheading'}>Subtitle</h3>
                <DnDSpaceStatic />
            </div>
        </div>
    );
}

export default SectionStatic;