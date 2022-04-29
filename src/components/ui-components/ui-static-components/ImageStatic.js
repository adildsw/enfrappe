import { useDrag } from "react-dnd";
import { Image as SemanticImage } from 'semantic-ui-react'

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Image.css';
import imagePlaceholder from '../../../assets/image_placeholder.png';

const ImageStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.IMAGE,
        item: { 'type': UIItemTypes.IMAGE },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Image</h3>
            <div ref={drag} className={'enfrappe-ui-image enfrappe-ui-imagestatic draggable-enfrappe-ui'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <SemanticImage src={imagePlaceholder} fluid />
            </div>
        </div>
    );
}

export default ImageStatic;