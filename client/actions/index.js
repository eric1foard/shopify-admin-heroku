import axios from 'axios';

export function showBanner(payload) {
    return {
        type: 'SHOW_BANNER',
        payload
    };
}

export function hideBanner() {
    return {
        type: 'HIDE_BANNER'
    };
}

export function setProductPickerOpen(isOpen) {
    return {
        type: 'SET_PICKER_MODAL_STATE',
        payload: isOpen
    };
}

const addProducts = products => axios.post('/api/products', products);

export function productsAddedSuccess(products) {
    return {
        type: 'ADD_SELECTED_PRODUCTS',
        payload: products
    };
}

export function addSelectedProducts(products) {
    return dispatch =>
        addProducts(products)
        .then(() => dispatch(productsAddedSuccess(products)))
        .then(() => {
            const bannerOpts = {
                status: 'success',
                title: 'Products added',
                message: 'The products you selected are now enabled for viewing in AR'
            };
            return dispatch(showBanner(bannerOpts));
        })
        .catch((err) => {
            console.log(err);
            const bannerOpts = {
                status: 'critical',
                title: 'Products could not be added',
                message: 'There was a problem adding these products. Please try again'
            };
            return dispatch(showBanner(bannerOpts));
        });
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
        .then(() => {
            const bannerOpts = {
                status: 'success',
                title: 'Delete Successful',
                message: 'Product Successfully deleted'
            };
            return dispatch(showBanner(bannerOpts));
        })
        .catch((err) => {
            console.log(err);
            const bannerOpts = {
                status: 'critical',
                title: 'Delete Failure',
                message: 'There was a problem deleting this product. Please try again'
            };
            return dispatch(showBanner(bannerOpts));
        });
}

export function saveEditForm(event) {
    console.log('from saveEditForm!!!!', event);
    return {
        type: 'EDIT_FORM_SAVE',
        payload: event
    };
}