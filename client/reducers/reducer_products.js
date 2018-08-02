// const initState = [{
//   id: 'foo',
//   title: 'Pink Floyd vintage concert poster',
//   dimensions: {
//     width: 12,
//     height: 24
//   },
//   image: {
//     resolution_dpi: 100,
//     url: 'https://en.wikipedia.org/wiki/Pink_Floyd:_Live_at_Pompeii#/media/File:Pink-floyd-poster.jpg'
//   }
// },
// {
//   id: 'bar',
//   title: 'Rolling Stores vintage concert poster',
//   dimensions: {
//     // width: 20,
//     height: 40
//   },
//   image: {
//     resolution_dpi: 350,
//     url: 'https://en.wikipedia.org/wiki/The_Rolling_Stones_concerts#/media/File:Stones_ad_1965.JPG'
//   }
// }];
const initState = [];

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return action.payload.data;
    case 'DELETE_PRODUCT':
      return state.filter(p => p.id !== action.payload);
    case 'ADD_SELECTED_PRODUCTS':
      return state.concat(action.payload.data);
    case 'SET_FILTERS':
      return state; // TODO
  }
  return state;
}