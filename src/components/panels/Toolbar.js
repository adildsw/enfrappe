import { Divider } from 'semantic-ui-react';

import SectionStatic from '../ui-components/ui-static-components/SectionStatic';
import ButtonStatic from '../ui-components/ui-static-components/ButtonStatic';
import TextStatic from '../ui-components/ui-static-components/TextStatic';
import InputStatic from '../ui-components/ui-static-components/InputStatic';
import CheckboxStatic from '../ui-components/ui-static-components/CheckboxStatic';

import { getUIItemName } from '../../utils/UIItemTypes';
import UIItemTypes from '../../utils/UIItemTypes';
import getComponentCompatibility from '../../utils/ComponentCompatibility';

import './Toolbar.css';
import RadioStatic from '../ui-components/ui-static-components/RadioStatic';
import DropdownStatic from '../ui-components/ui-static-components/DropdownStatic';
import DataViewerStatic from '../ui-components/ui-static-components/DataViewerStatic';

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
                const toolbarComponents = [];
                compatibleComponents.forEach(component => {
                    if (component === UIItemTypes.SECTION)
                        toolbarComponents.push(<SectionStatic key={component} />);
                    else if (component === UIItemTypes.BUTTON)
                        toolbarComponents.push(<ButtonStatic key={component} />);
                    else if (component === UIItemTypes.TEXT)
                        toolbarComponents.push(<TextStatic key={component} />)
                    else if (component === UIItemTypes.INPUT)
                        toolbarComponents.push(<InputStatic key={component} />)
                    else if (component === UIItemTypes.CHECKBOX)
                        toolbarComponents.push(<CheckboxStatic key={component} />)
                    else if (component === UIItemTypes.RADIO)
                        toolbarComponents.push(<RadioStatic key={component} />)
                    else if (component === UIItemTypes.DROPDOWN)
                        toolbarComponents.push(<DropdownStatic key={component} />)
                    else if (component === UIItemTypes.DATAVIEWER)
                        toolbarComponents.push(<DataViewerStatic key={component} />)
                });

                return (
                    <div className={'scrollable-div'}>
                        <div>
                        <h1 className={'panel-heading'}>Toolbar</h1>
                            <h3 className={'panel-subheading'}>Components for {getUIItemName(selectedComponent.type)}</h3>
                        </div>
                        <Divider />
                        <div className={'scrollable-section toolbar-component-container'}>
                            {toolbarComponents}
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