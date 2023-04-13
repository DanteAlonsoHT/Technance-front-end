import {
  getCitations,
} from '../../services/CitationsService';
import {
  CONFIRMED_GET_CITATIONS,
} from './PostTypes';


export function getCitationsAction() {
  return (dispatch, getState) => {
    getCitations().then((response) => {
    //console.log('RESPONSE', response);
          let citations = response.data;
          dispatch(confirmedGetCitationsAction(citations));
      });
  };
}

export function confirmedGetCitationsAction(citations) {
  return {
      type: CONFIRMED_GET_CITATIONS,
      payload: citations,
  };
}
