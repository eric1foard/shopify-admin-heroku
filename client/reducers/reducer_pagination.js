const initState = {
  pageNum: 0,
  pageSize: 50,
  hasNextPage: false
};

export default function reducer(state = initState, action) {
  switch (action.type) {
      case 'NEXT_PAGE':
        return {
          ...state,
          pageNum: state.pageNum+1,
          hasNextPage: action.payload.data.hasNextPage
        };
      case 'PREV_PAGE':
        return {
          ...state,
          pageNum: Math.max(state.pageNum-1, 0),
          hasNextPage: action.payload.data.hasNextPage
        };
      case 'GET_PRODUCTS':
      case 'DELETE_PRODUCT':
      case 'ADD_SELECTED_PRODUCTS':
        return { ...state, hasNextPage: action.payload.data.hasNextPage };
  }
  return state;
}