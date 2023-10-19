import { Divider } from 'semantic-ui-react';

import SectionStatic from '../ui-components/ui-static-components/SectionStatic';
import ButtonStatic from '../ui-components/ui-static-components/ButtonStatic';
import TextStatic from '../ui-components/ui-static-components/TextStatic';
import InputStatic from '../ui-components/ui-static-components/InputStatic';
import CheckboxStatic from '../ui-components/ui-static-components/CheckboxStatic';

import { getUIItemName, isComponentBasic } from '../../utils/UIItemTypes';
import UIItemTypes from '../../utils/UIItemTypes';
import getComponentCompatibility from '../../utils/ComponentCompatibility';

import './Toolbar.css';
import RadioStatic from '../ui-components/ui-static-components/RadioStatic';
import DropdownStatic from '../ui-components/ui-static-components/DropdownStatic';
import DataViewerStatic from '../ui-components/ui-static-components/DataViewerStatic';
import ChartStatic from '../ui-components/ui-static-components/ChartStatic';
import ImageStatic from '../ui-components/ui-static-components/ImageStatic';

const Toolbar = (props) => {

    const { selectedComponent } = props;

    const generateToolbarComponents = () => {
        if (selectedComponent.type === UIItemTypes.NONE)
            return (
                <div id='toolbar-no-component'>
                    <h1>Toolbar</h1>
                    <p>No component is selected.</p>
                </div>
            );
        else {
            const compatibleComponents = getComponentCompatibility(selectedComponent.type);
            if (compatibleComponents.length === 0 || compatibleComponents[0] === UIItemTypes.NONE)
                return (
                    <div id='toolbar-no-component'>
                        <h1>Toolbar</h1>
                        <p>{getUIItemName(selectedComponent.type)} does not have a child component.</p>
                    </div>
                );
            else {
                const toolbarBasicComponents = [];
                const toolbarMiscComponents = [];

                compatibleComponents.forEach(component => {
                    var componentElement = null;
                    
                    if (component === UIItemTypes.SECTION)
                        componentElement = <SectionStatic key={component} />;
                    else if (component === UIItemTypes.BUTTON)
                        componentElement = <ButtonStatic key={component} />;
                    else if (component === UIItemTypes.TEXT)
                        componentElement = <TextStatic key={component} />;
                    else if (component === UIItemTypes.INPUT)
                        componentElement = <InputStatic key={component} />;
                    else if (component === UIItemTypes.CHECKBOX)
                        componentElement = <CheckboxStatic key={component} />;
                    else if (component === UIItemTypes.RADIO)
                        componentElement = <RadioStatic key={component} />;
                    else if (component === UIItemTypes.DROPDOWN)
                        componentElement = <DropdownStatic key={component} />;
                    else if (component === UIItemTypes.DATAVIEWER)
                        componentElement = <DataViewerStatic key={component} />;
                    else if (component === UIItemTypes.CHART)
                        componentElement = <ChartStatic key={component} />;
                    else if (component === UIItemTypes.IMAGE)
                        componentElement = <ImageStatic key={component} />;
                        
                    if (isComponentBasic(component) && componentElement !== null)
                        toolbarBasicComponents.push(componentElement);
                    else
                        toolbarMiscComponents.push(componentElement);
                });

                return (
                    <div className={'scrollable-div'}>
                        <div>
                        <h1 className={'panel-heading'}>Toolbar</h1>
                            <h3 className={'panel-subheading'}>Components for {getUIItemName(selectedComponent.type)}</h3>
                        </div>
                        <Divider />
                        <div className={'scrollable-section toolbar-component-container'}>
                            {toolbarBasicComponents.length > 0 ? <h3 className={'panel-subheading-alt'}>Basic Components</h3> : null}
                            {toolbarBasicComponents.length > 0 ? toolbarBasicComponents : null}
                            {toolbarMiscComponents.length > 0 ? <h3 className={'panel-subheading-alt'}>Miscellaneous Components</h3> : null}
                            {toolbarMiscComponents.length > 0 ? toolbarMiscComponents : null}
                            {/* {toolbarComponents} */}
                        </div>
                    </div>
                );
            }
        }
    }

    return (
        generateToolbarComponents()
    );
}

export default Toolbar;