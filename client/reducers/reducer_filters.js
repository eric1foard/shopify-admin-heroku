export default function reducer(state = [], action) {
    switch (action.type) {
        case 'SET_FILTERS':
            return action.payload;
    }
    return state;
  }