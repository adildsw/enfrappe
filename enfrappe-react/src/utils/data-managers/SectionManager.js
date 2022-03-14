import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const SectionManager = (componentData, setComponentData) => {

    const addSection = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.SECTION);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteSection = (sectionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[sectionId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== sectionId);

        // Deleting child components
        newComponentData.components[sectionId].children.forEach(childId => {
            delete newComponentData.components[childId];
        });

        delete newComponentData.components[sectionId];
        setComponentData(newComponentData);
    }

    const shiftSectionUp = (sectionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[sectionId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(sectionId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = sectionId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftSectionDown = (sectionId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[sectionId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(sectionId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = sectionId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getSectionData = (sectionId) => {
        return componentData.components[sectionId];
    }

    const setSectionTitle = (sectionId, title) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[sectionId]['title'] = title;
        setComponentData(newComponentData);
    }

    const setSectionSubtitle = (sectionId, subtitle) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[sectionId]['subtitle'] = subtitle;
        setComponentData(newComponentData);
    }

    const setSectionTextColor = (sectionId, textColor) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[sectionId]['text-color'] = textColor;
        setComponentData(newComponentData);
    }

    const setSectionBackground = (sectionId, background) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        };
        newComponentData.components[sectionId]['background'] = background;
        setComponentData(newComponentData);
    }

    return {
        addSection,
        deleteSection,
        getSectionData,
        setSectionTitle,
        setSectionSubtitle,
        setSectionTextColor,
        setSectionBackground,
        shiftSectionUp,
        shiftSectionDown
    }

}

export default SectionManager;