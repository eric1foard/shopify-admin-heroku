export default function reducer(state = false, action) {
  switch (action.type) {
      case 'OPEN_DELETE_ALERT':
          return action.payload.isOpen;
  }
  return state;
}