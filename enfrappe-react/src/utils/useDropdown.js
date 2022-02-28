import { useState } from 'react';

// Custom hook for using Semantic-UI dropdown component with single-value options
const useDropdown = (initialValues, defaultSelection) => {

    // Converts array of values to array of single-valued Semantic-UI dropdown items
    const valuesToDropdownItems = (values) => (
        values.map((value) => ({
            key: value,
            text: value,
            value: value
        }))
    );
    
    // Converts array of single-valued Semantic-UI dropdown items to array of values
    const DropdownItemsToValues = (items) => (
        items.map(item => item.value)
    );

    const [items, setItems] = useState(valuesToDropdownItems(initialValues));
    const [selectedValue, setSelectedValue] = useState(defaultSelection);

    // Function for adding new dropdown item
    const addValue = (value) => (
        setItems([...items, valuesToDropdownItems([value])[0]])
    );

    // Function for removing dropdown item
    const removeValue = (value) => {
        setItems(items.filter(item => item.value !== value));
    }

    const setDropdownItems = (items) => {
        setItems(valuesToDropdownItems(items));
    }

    // Function for setting default selection of dropdown
    if (typeof defaultSelection === 'undefined') {
        setSelectedValue(DropdownItemsToValues(items)[0]);
    }

    return [DropdownItemsToValues(items), items, addValue, removeValue, selectedValue, setSelectedValue, setDropdownItems];
}

export default useDropdown;