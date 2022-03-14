import { Form, Label, Dropdown as SemanticDropdown } from "semantic-ui-react";

import '../Dropdown.css';

const DropdownLive = (props) => {
    const { componentManager, componentId, liveData, updateLiveData } = props;
    const dropdownData = componentManager.getComponent(componentId);
    const optionIds = dropdownData['option-ids'];
    const options = dropdownData['options'];

    const generateDropdownOptions = () => {
        const dropdownOptions = [];
        optionIds.forEach(id => {
            dropdownOptions.push(
                {
                    key: options[id]['value'],
                    text: options[id]['label'],
                    value: options[id]['value']
                }
            );
        });
        return dropdownOptions;
    }

    return (
        <div>
            <div id={dropdownData.id} className={'enfrappe-ui-dropdown, enfrappe-ui-dropdownlive'}>
                <Form.Field id={dropdownData.id} className={'enfrappe-ui-dropdownform'} style={{'color': dropdownData['text-color']}}>
                    <Label id={dropdownData.id} className={'tucked-label enfrappe-ui-dropdownlabel'} style={{'color': dropdownData['text-color']}}>{dropdownData.label}</Label>
                    <SemanticDropdown 
                        id={dropdownData.id} 
                        className={'enfrappe-ui-dropdownmainlive'} 
                        placeholder='Dropdown Items' 
                        fluid 
                        selection 
                        options={generateDropdownOptions()} 
                        defaultValue={liveData[dropdownData.id]}
                        onChange={(e, data)=>{
                            console.log(dropdownData.id, data.value);
                            updateLiveData(dropdownData.id, data.value);
                        }}
                    />
                </Form.Field>
            </div>

        </div>
    );
}

export default DropdownLive;