const initState = [];

export default function reducer(state = initState, action) {
    switch (action.type) {
      case ADD_SELECTED_PRODUCTS:
        return state.concat(action.payload);
    }
    return state;
  }