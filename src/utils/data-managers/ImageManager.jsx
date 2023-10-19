import nextId from "react-id-generator";

import getDefaultComponentData from '../DefaultComponentData';

import UIItemTypes from "../UIItemTypes";

const ImageManager = (componentData, setComponentData) => {

    const addImage = (parentId) => {
        const newId = nextId();
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[newId] = getDefaultComponentData(UIItemTypes.IMAGE);
        newComponentData.components[newId]['id'] = newId;
        newComponentData.components[newId]['parent'] = parentId;
        newComponentData.components[parentId]['children'].push(newId);
        setComponentData(newComponentData);
    }

    const deleteImage = (imageId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[imageId]['parent'];
        newComponentData.components[parentId]['children'] = newComponentData.components[parentId]['children'].filter(childId => childId !== imageId);
        delete newComponentData.components[imageId];
        setComponentData(newComponentData);
    }

    const shiftImageUp = (imageId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[imageId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(imageId);
        if (index === 0) return;
        const temp = newComponentData.components[parentId]['children'][index - 1];
        newComponentData.components[parentId]['children'][index - 1] = imageId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const shiftImageDown = (imageId) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        const parentId = newComponentData.components[imageId]['parent'];
        const index = newComponentData.components[parentId]['children'].indexOf(imageId);
        if (index === newComponentData.components[parentId]['children'].length - 1) return;
        const temp = newComponentData.components[parentId]['children'][index + 1];
        newComponentData.components[parentId]['children'][index + 1] = imageId;
        newComponentData.components[parentId]['children'][index] = temp;
        setComponentData(newComponentData);
    }

    const getImageData = (imageId) => {
        return componentData.components[imageId];
    }

    const setImageSrcUrl = (imageId, srcUrl) => {
        const newComponentData = {
            ...componentData,
            'last-edited': Date.now()
        }
        newComponentData.components[imageId]['src-url'] = srcUrl;
        setComponentData(newComponentData);
    }

    return {
        addImage,
        deleteImage,
        getImageData,
        shiftImageUp,
        shiftImageDown,
        setImageSrcUrl
    }

}

export default ImageManager;