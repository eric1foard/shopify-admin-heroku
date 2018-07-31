import { hasValidDimensions, isLowResolution } from '../../utils/image';

const initState = [{
  id: 'foo',
  title: 'Pink Floyd vintage concert poster',
  dimensions: {
    width: 12,
    height: 24
  },
  image: {
    resolution_dpi: 100,
    url: 'https://en.wikipedia.org/wiki/Pink_Floyd:_Live_at_Pompeii#/media/File:Pink-floyd-poster.jpg'
  }
},
{
  id: 'bar',
  title: 'Rolling Stores vintage concert poster',
  dimensions: {
    // width: 20,
    height: 40
  },
  image: {
    resolution_dpi: 350,
    url: 'https://en.wikipedia.org/wiki/The_Rolling_Stones_concerts#/media/File:Stones_ad_1965.JPG'
  }
}];

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'ADD_SELECTED_PRODUCTS':
      return state.concat(action.payload);
    case 'SET_FILTERS':
      if (!action.payload.length) {
        return initState; //TODO: should call out for all products here
      }
      let newState = state.slice();
      if (action.payload.find(f => f.value === "Low resolution")) {
        newState = newState.filter(i => isLowResolution(i.image));
      }
      if (action.payload.find(f => f.value === "Dimensions needed")) {
        newState = newState.filter(i => !hasValidDimensions(i.dimensions));
      }
      return newState;
  }
  return state;
}