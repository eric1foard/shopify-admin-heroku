export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return action.payload.data;
      // return [{ id: 123, title: 'test product' }]
    case 'DELETE_PRODUCT':
      return state.filter(p => p.id !== action.payload);
    case 'ADD_SELECTED_PRODUCTS':
      // TODO: need to call out for metadata in case the product has been added before
      return state.concat(action.payload.products);
    case 'EDIT_FORM_SAVE':
      console.log('from EDIT_FORM_SAVE', action);
      return state; // TODO;
    case 'SET_FILTERS':
      return state; // TODO
  }
  return state;
}