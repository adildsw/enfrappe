import DnDSpace from "./ui-component-utils/DnDSpace";

import componentCompatibility from "../../utils/ComponentCompatibility";

import './Section.css';

const Section = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const sectionData = componentManager.getComponent(componentId);

    return (
        <div id={sectionData['id']} className={'enfrappe-ui-section' + (selectedComponent.id === sectionData['id'] ? ' selected-component' : '')} style={{'background': sectionData['background']}}>
            <h1 id={sectionData['id']} className={'panel-heading enfrappe-ui-sectionheader'} style={{'color': sectionData['text-color']}}>{sectionData['title']}</h1>
            <h3 id={sectionData['id']} className={'panel-subheading enfrappe-ui-sectionheader'} style={{'color': sectionData['text-color']}}>{sectionData['subtitle']}</h3>
            <DnDSpace id={sectionData['id']} className={'enfrappe-ui-sectiondndspace'} acceptedItems={componentCompatibility('section')} componentManager={componentManager} />
        </div>
    );
}

export default Section;