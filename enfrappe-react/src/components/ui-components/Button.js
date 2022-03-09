import { Button as SemanticButton } from 'semantic-ui-react';

import './Button.css';

const Button = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const buttonData = componentManager.getComponent(componentId);

    return (
        <div>
            <SemanticButton fluid id={buttonData.id} className={'enfrappe-ui-button' + (selectedComponent.id === buttonData.id ? ' selected-component' : '')} style={{'background': buttonData.background, 'color': buttonData['text-color']}}>
                <h4 id={buttonData.id} className={'enfrappe-ui-buttonlabel'}>{buttonData.text}</h4>
            </SemanticButton>
        </div>
    );
}

export default Button;