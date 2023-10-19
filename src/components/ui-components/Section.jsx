
import Button from "./Button";
import Text from "./Text";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Dropdown from "./Dropdown";
import DataViewer from "./DataViewer";
import Chart from "./Chart";
import Image from "./Image";

import DnDSpace from "./DnDSpace";
import UIItemTypes from "../../utils/UIItemTypes";

import getComponentCompatibility from "../../utils/ComponentCompatibility";

import './Section.css';

const Section = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const sectionData = componentManager.getComponent(componentId);

    const generateSectionComponents = () => {
        const { children } = sectionData;
        const sectionComponents = [];
        children.forEach(child => {
            const childData = componentManager.getComponent(child);
            if (childData.type === UIItemTypes.BUTTON)
                sectionComponents.push(
                    <Button key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.TEXT)
                sectionComponents.push(
                    <Text key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.INPUT)
                sectionComponents.push(
                    <Input key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.CHECKBOX)
                sectionComponents.push(
                    <Checkbox key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.RADIO)
                sectionComponents.push(
                    <Radio key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.DROPDOWN)
                sectionComponents.push(
                    <Dropdown key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.DATAVIEWER)
                sectionComponents.push(
                    <DataViewer key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.CHART)
                sectionComponents.push(
                    <Chart key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.IMAGE)
                sectionComponents.push(
                    // <Chart key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                    <Image key={childData.id} selectedComponent={selectedComponent} componentManager={componentManager} componentId={childData.id} />
                    // <p>Image Here</p>
                );
        });
        return sectionComponents;
    }

    return (
        <div id={sectionData['id']} className={'enfrappe-ui-section' + (selectedComponent.id === sectionData['id'] ? ' selected-component' : '')} style={{'background': sectionData['background']}}>
            <h1 id={sectionData['id']} className={'panel-heading enfrappe-ui-sectionheader'} style={{'color': sectionData['text-color']}}>{sectionData['title']}</h1>
            <h3 id={sectionData['id']} className={'panel-subheading enfrappe-ui-sectionheader'} style={{'color': sectionData['text-color']}}>{sectionData['subtitle']}</h3>
            {generateSectionComponents()}
            <DnDSpace id={sectionData['id']} className={'enfrappe-ui-sectiondndspace'} acceptedItems={getComponentCompatibility(UIItemTypes.SECTION)} componentManager={componentManager} />
        </div>
    );
}

export default Section;