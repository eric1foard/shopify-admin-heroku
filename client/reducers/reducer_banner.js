const initState = {
  visible: false,
  status: '',
  title: '',
  message: ''
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SHOW_BANNER':
      const { title, message, status } = action.payload;
      return { visible: true, title, message, status }
    case 'HIDE_BANNER':
      return initState;
  }
  return state;
}