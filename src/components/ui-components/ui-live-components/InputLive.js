import { Form, Label } from 'semantic-ui-react';

import '../Input.css';

const InputLive = (props) => {
    const { componentManager, componentId, liveData, updateLiveData } = props;
    const inputData = componentManager.getComponent(componentId);

    return (
        <div>
            <Form.Field id={inputData.id} className={'enfrappe-ui-inputlive'}>
                <Label id={inputData.id} className={'tucked-label enfrappe-ui-inputlabel'} style={{'color': inputData['text-color']}}>{inputData.label}</Label>
                <div id={inputData.id} className={"ui fluid input enfrappe-ui-inputmaindiv"} style={{'color': inputData['text-color']}}>
                    <input 
                        id={inputData.id} 
                        className={'enfrappe-ui-inputmain'} 
                        placeholder={inputData.placeholder} 
                        type='text' 
                        defaultValue={liveData[inputData.id]}
                        onChange={(e)=>{ 
                            console.log(inputData.id, e.target.value); 
                            updateLiveData(inputData.id, e.target.value);
                        }} 
                    />
                </div>
            </Form.Field>
        </div>
    );
}

export default InputLive;