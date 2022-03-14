import { Checkbox as SemanticCheckbox } from "semantic-ui-react";

const Checkbox = (props) => {
    const { componentManager, componentId, liveData, updateLiveData } = props;
    const checkboxData = componentManager.getComponent(componentId);

    return (
        <div>
            <div className={'enfrappe-ui-checkboxlive'}>
                <SemanticCheckbox 
                    id={checkboxData.id} 
                    label={checkboxData.label} 
                    style={{'color': checkboxData['text-color']}} 
                    defaultChecked={liveData[checkboxData.id]}
                    onClick={(e)=>{ 
                        console.log(checkboxData.id, e.target.checked); 
                        updateLiveData(checkboxData.id, e.target.checked);
                    }} 
                />
            </div>
        </div>
    );
}

export default Checkbox;