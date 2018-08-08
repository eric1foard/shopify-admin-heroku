export default function reducer(state = [], action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return action.payload.data;
      // return [{ id: 123, title: 'test product', metafields: [] }]
    case 'DELETE_PRODUCT':
      return state.filter(p => p.id !== action.payload);
    case 'ADD_SELECTED_PRODUCTS':
      return state.concat(action.payload.products.map(p => ({ ...p, metafields: [] })));
    case 'EDIT_FORM_SAVE':
      console.log('from EDIT_FORM_SAVE', action);
      return state; // TODO;
    case 'SET_FILTERS':
      return state; // TODO
  }
  return state;
}