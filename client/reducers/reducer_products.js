export default function reducer(state = [], action) {
  switch (action.type) {
    case 'NEXT_PAGE':
    case 'PREV_PAGE':
    case 'GET_PRODUCTS':
    case 'DELETE_PRODUCT':
    case 'ADD_SELECTED_PRODUCTS':
      // return action.payload.data.products;
      return [{ id: 123, title: 'test product' }]
    case 'EDIT_FORM_SAVE':
      console.log('from EDIT_FORM_SAVE!', action);
      return state; // TODO;
    case 'SET_FILTERS':
      return state; // TODO
  }
  return state;
}