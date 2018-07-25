export default function reducer(state = false, action) {
    switch (action.type) {
        case 'SET_PICKER_MODAL_STATE':
            return action.payload;
    }
    return state;
  }