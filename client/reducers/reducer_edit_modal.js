export default function reducer(state = false, action) {
    switch (action.type) {
        case 'OPEN_EDIT_MODAL':
            return action.payload;
    }
    return state;
  }