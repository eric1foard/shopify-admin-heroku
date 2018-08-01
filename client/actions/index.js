import axios from 'axios';

export function setProductPickerOpen(isOpen) {
    return {
        type: 'SET_PICKER_MODAL_STATE',
        payload: isOpen
    };
}

export function addSelectedProducts(products) {
    return {
        type: 'ADD_SELECTED_PRODUCTS',
        payload: axios.post('/api/products', products)
    };
}

export function onFiltersChange(filters) {
    return {
        type: 'SET_FILTERS',
        payload: filters
    };
}

export function getProducts() {
    return {
        type: 'GET_PRODUCTS',
        payload: axios.get('/api/products')
    };
}

export function setEditModalOpen(isOpen) {
    return {
        type: 'OPEN_EDIT_MODAL',
        payload: isOpen
    };
}

export function setDeleteAlertOpen(opts) {
    return {
        type: 'OPEN_DELETE_ALERT',
        payload: opts
    };
}

const deleteProduct = id => axios.delete(`/api/products/${id}`);

export function updateProductsAfterDelete(id) {
    return {
        type: 'DELETE_PRODUCT',
        payload: id
    }
}

// TODO: add behavior to display modal
export function deleteProductAndCloseModal(id) {
    return dispatch =>
        deleteProduct(id)
        .then(() => dispatch(updateProductsAfterDelete(id)))
        .then(() => dispatch(setDeleteAlertOpen({ isOpen: false, id: 0, title: '' })))
        .catch((err) => dispatch(console.log(err)))
}