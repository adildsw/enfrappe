
import ButtonLive from "./ButtonLive";
import TextLive from "./TextLive";
import InputLive from "./InputLive";
import CheckboxLive from "./CheckboxLive";
import RadioLive from "./RadioLive";
import DropdownLive from "./DropdownLive";

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Section.css';
import DataViewerLive from "./DataViewerLive";
import ChartLive from "./ChartLive";

const SectionLive = (props) => {
    const { appManager, componentManager, componentId, liveData, updateLiveData, setCurrentActivity } = props;
    const sectionData = componentManager.getComponent(componentId);

    const generateSectionComponents = () => {
        const { children } = sectionData;
        const sectionComponents = [];
        children.forEach(child => {
            const childData = componentManager.getComponent(child);
            if (childData.type === UIItemTypes.BUTTON)
                sectionComponents.push(
                    <ButtonLive key={childData.id} appManager={appManager} componentManager={componentManager} componentId={childData.id} liveData={liveData} updateLiveData={updateLiveData} setCurrentActivity={setCurrentActivity} />
                );
            else if (childData.type === UIItemTypes.TEXT)
                sectionComponents.push(
                    <TextLive key={childData.id} componentManager={componentManager} componentId={childData.id} />
                );
            else if (childData.type === UIItemTypes.INPUT)
                sectionComponents.push(
                    <InputLive key={childData.id} componentManager={componentManager} componentId={childData.id} liveData={liveData} updateLiveData={updateLiveData} />
                );
            else if (childData.type === UIItemTypes.CHECKBOX)
                sectionComponents.push(
                    <CheckboxLive key={childData.id} componentManager={componentManager} componentId={childData.id} liveData={liveData} updateLiveData={updateLiveData} />
                );
            else if (childData.type === UIItemTypes.RADIO)
                sectionComponents.push(
                    <RadioLive key={childData.id} componentManager={componentManager} componentId={childData.id} liveData={liveData} updateLiveData={updateLiveData} />
                );
            else if (childData.type === UIItemTypes.DROPDOWN)
                sectionComponents.push(
                    <DropdownLive key={childData.id} componentManager={componentManager} componentId={childData.id} liveData={liveData} updateLiveData={updateLiveData} />
                );
            else if (childData.type === UIItemTypes.DATAVIEWER)
                sectionComponents.push(
                    <DataViewerLive key={childData.id} appManager={appManager} componentManager={componentManager} componentId={childData.id} liveData={liveData} updateLiveData={updateLiveData} />
                );
            else if (childData.type === UIItemTypes.CHART)
                sectionComponents.push(
                    <ChartLive key={childData.id} appManager={appManager} componentManager={componentManager} componentId={childData.id} liveData={liveData} updateLiveData={updateLiveData} />
                );
        });

        return sectionComponents;
    }

    return (
        <div id={sectionData['id']} className={'enfrappe-ui-section enfrappe-ui-sectionlive'} style={{'background': sectionData['background']}}>
            <h1 id={sectionData['id']} className={'panel-heading enfrappe-ui-sectionheader'} style={{'color': sectionData['text-color']}}>{sectionData['title']}</h1>
            <h3 id={sectionData['id']} className={'panel-subheading enfrappe-ui-sectionheader'} style={{'color': sectionData['text-color']}}>{sectionData['subtitle']}</h3>
            {generateSectionComponents()}
        </div>
    );
}

export default SectionLive;