const initialState = {
  id: 0,
  title: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
      case 'OPEN_DELETE_ALERT':
          const { id, title } = action.payload;
          return { id, title };
  }
  return state;
}