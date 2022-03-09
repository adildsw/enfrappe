import { Checkbox as SemanticCheckbox } from "semantic-ui-react";

const Checkbox = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const checkboxData = componentManager.getComponent(componentId);

    return (
        <div>
            <div id={checkboxData.id} className={'enfrappe-ui-checkbox' + (selectedComponent.id === checkboxData.id ? ' selected-component' : '')}>
                <SemanticCheckbox id={checkboxData.id} className={'enfrappe-ui-checkboxmain'} label={checkboxData.label} style={{'color': checkboxData['text-color']}} readOnly checked />
            </div>
        </div>
    );
}

export default Checkbox;