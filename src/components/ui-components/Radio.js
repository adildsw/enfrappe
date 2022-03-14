import { Form, Radio as SemanticRadio, Label, Segment } from "semantic-ui-react";

import './Radio.css';

const Radio = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const radioData = componentManager.getComponent(componentId);
    const optionIds = radioData['option-ids'];
    const options = radioData['options'];

    const generateRadioOptions = () => {
        const radioOptions = [];
        optionIds.forEach(id => {
            radioOptions.push(
                <Form.Field id={radioData.id} className={'enfrappe-ui-radiosubmain'} key={id} style={{'color': radioData['text-color']}}>
                    <SemanticRadio id={radioData.id} className={'enfrappe-ui-radiomain enfrappe-ui-radiooption'} name={radioData.id} label={options[id]['label']} value={options[id]['value']} readOnly />
                </Form.Field>
            )
        });
        return radioOptions;
    }

    return (
        <div>
            <div id={radioData.id} className={'enfrappe-ui-radio' + (selectedComponent.id === radioData.id ? ' selected-component' : '')}>
                <Label id={radioData.id} className={'enfrappe-ui-radiolabel tucked-label'} style={{'color': radioData['text-color']}}>{radioData.label}</Label>
                <Segment id={radioData.id} className={'enfrappe-ui-radiosegment tucked-label-compat'}>
                    {generateRadioOptions()}
                </Segment>
            </div>
        </div>
    );
}

export default Radio;