const initState = {
  value: '',
  typingTimeout: null
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_FIELD':
      return { ...state, value: action.payload };
    case 'CLEAR_TYPING_TIMEOUT':
      clearTimeout(state.typingTimeout);
      return { ...state, typingTimeout: null };
    case 'SET_TYPING_TIMEOUT':
      return {
        ...state,
        typingTimeout: setTimeout(action.payload.fn, action.payload.delay)
      }
  }
  return state;
}