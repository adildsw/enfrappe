import { Divider } from 'semantic-ui-react';

import UIItemTypes from '../../utils/UIItemTypes';
import { getUIItemName } from '../../utils/UIItemTypes';
import ActivityProperties from '../ui-component-properties/ActivityProperties';
import ButtonProperties from '../ui-component-properties/ButtonProperties';
import InputProperties from '../ui-component-properties/InputProperties';
import SectionProperties from '../ui-component-properties/SectionProperties';
import TextProperties from '../ui-component-properties/TextProperties';
import CheckboxProperties from '../ui-component-properties/CheckboxProperties';
import RadioProperties from '../ui-component-properties/RadioProperties';
import DropdownProperties from '../ui-component-properties/DropdownProperties';

import './Properties.css';
import DataViewerProperties from '../ui-component-properties/DataViewerProperties';

const Properties = (props) => {
    const { selectedComponent, setSelectedComponent, componentManager, currentActivity, setCurrentActivity } = props;
    const { activityManager, sectionManager } = componentManager;

    return (
        selectedComponent.type === UIItemTypes.NONE ?
            <div id='properties-no-component'>
                <h1>Properties</h1>
                <p>No component is selected.</p>
            </div>
            : 
            <div className={'scrollable-div'}>
                <div>
                    <h1 className={'panel-heading'}>Properties</h1>
                    <h3 className={'panel-subheading'}>{getUIItemName(selectedComponent.type)}</h3>
                </div>
                <Divider />
                <div className={'scrollable-section'}>
                    { selectedComponent.type === UIItemTypes.ACTIVITY && 
                        <ActivityProperties 
                            activityManager={activityManager} 
                            currentActivity={currentActivity} 
                            setCurrentActivity={setCurrentActivity}
                            setSelectedComponent={setSelectedComponent} 
                        /> 
                    }
                    {
                        selectedComponent.type === UIItemTypes.SECTION &&
                        <SectionProperties
                            activityManager={activityManager} 
                            sectionManager={sectionManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                    {
                        selectedComponent.type === UIItemTypes.BUTTON &&
                        <ButtonProperties
                            componentManager={componentManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                    {
                        selectedComponent.type === UIItemTypes.TEXT &&
                        <TextProperties
                            componentManager={componentManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                    {
                        selectedComponent.type === UIItemTypes.INPUT &&
                        <InputProperties
                            componentManager={componentManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                    {
                        selectedComponent.type === UIItemTypes.CHECKBOX &&
                        <CheckboxProperties
                            componentManager={componentManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                    {
                        selectedComponent.type === UIItemTypes.RADIO &&
                        <RadioProperties
                            componentManager={componentManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                    {
                        selectedComponent.type === UIItemTypes.DROPDOWN &&
                        <DropdownProperties
                            componentManager={componentManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                    {
                        selectedComponent.type === UIItemTypes.DATAVIEWER &&
                        <DataViewerProperties
                            componentManager={componentManager}
                            selectedComponent={selectedComponent}
                            setSelectedComponent={setSelectedComponent}
                        />
                    }
                </div>
            </div>
    );
}

export default Properties;