import DnDSpace from "./ui-component-utils/DnDSpace";

import componentCompatibility from "../../utils/componentCompatibility";

import './Section.css';

const Section = (props) => {
    const { sectionData, activityManager, selectedComponent } = props;
    const { id, title, subtitle, background, data } = sectionData;

    const generateSectionComponents = () => {
        const { sequence, components } = data;
        let subComponents = [];
        sequence.forEach(comp => {
            const componentData = components[comp];
            if (componentData.type === 'section') {
                console.log("there's stuff in here");
                subComponents.push(
                    <p key={comp}>asd</p>
                    // <Section key={comp} sectionData={componentData} selectedComponent={selectedComponent} activityManager={activityManager} />
                );
            }
        });
        return subComponents;
    }

    return (
        <div id={id} className={'enfrappe-ui-section' + (selectedComponent.id === id ? ' selected-component' : '')} style={{'background': {background}}}>
            <h1 id={id} className={'panel-heading enfrappe-ui-sectionheader'}>{title}</h1>
            <h3 id={id} className={'panel-subheading enfrappe-ui-sectionheader'}>{subtitle}</h3>
            {generateSectionComponents()}
            <DnDSpace id={id} className={'enfrappe-ui-sectiondndspace'} acceptedItems={componentCompatibility('activity')} activityManager={activityManager} />
        </div>
    );
}

export default Section;