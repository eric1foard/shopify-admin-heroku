import { MAIN_PAGE_NAME } from '../../utils/constants';
import config from 'config';
const url = config.get('breadcrumbURL');

const initState = {
  title: MAIN_PAGE_NAME,
  breadcrumbs: []
};

export default function reducer(state = initState, action) {
  switch (action.type) {
      case 'CHANGE_PAGE':
        const { title } = action.payload;
          return {
            title,
            breadcrumbs: title === MAIN_PAGE_NAME ? [] :
            [{content: MAIN_PAGE_NAME, url, accessibilityLabel: `Back to ${MAIN_PAGE_NAME}`}]
          };
  }
  return state;
}