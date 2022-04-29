import { Image as SemanticImage } from 'semantic-ui-react'

import './Image.css';
import imagePlaceholder from '../../assets/image_placeholder.png';

const Image = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const imageData = componentManager.getComponent(componentId);

    return (
        <div>
            <div id={imageData.id} className={'enfrappe-ui-image' + (selectedComponent.id === imageData.id ? ' selected-component' : '')}>
                <SemanticImage id={imageData.id} className={'enfrappe-ui-imagemain'} src={imagePlaceholder} fluid />
            </div>
        </div>
    );
}

export default Image;