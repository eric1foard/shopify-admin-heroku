export function setProductPickerOpen(isOpen) {
    return {
        type: 'SET_PICKER_MODAL_STATE',
        payload: isOpen
    };
}

export function addSelectedProducts(products) {
    return {
        type: 'ADD_SELECTED_PRODUCTS',
        payload: products
    };
}

export function onFiltersChange(filters) {
    return {
        type: 'SET_FILTERS',
        payload: filters
    };
}