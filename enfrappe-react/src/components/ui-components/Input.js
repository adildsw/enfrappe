import { Form, Label } from 'semantic-ui-react';

import './Input.css';

const Input = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const inputData = componentManager.getComponent(componentId);

    return (
        <div>
            <Form.Field id={inputData.id} className={'enfrappe-ui-input' + (selectedComponent.id === inputData.id ? ' selected-component' : '')}>
                <Label id={inputData.id} className={'tucked-label enfrappe-ui-inputlabel'} style={{'color': inputData['text-color']}}>{inputData.label}</Label>
                <div id={inputData.id} className={"ui fluid input enfrappe-ui-inputmaindiv"} style={{'color': inputData['text-color']}}>
                    <input id={inputData.id} className={'enfrappe-ui-inputmain'} placeholder={inputData.placeholder} readOnly type='text' />
                </div>
            </Form.Field>
        </div>
    );
}

export default Input;