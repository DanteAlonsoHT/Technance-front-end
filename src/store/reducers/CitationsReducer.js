import {
  CONFIRMED_GET_CITATIONS,
} from '../actions/PostTypes';

const initialState = {
  citations: [],
};

export default function CitationsReducer(state = initialState, actions) {
  if (actions.type === CONFIRMED_GET_CITATIONS) {
      console.log("CONFIRMED_GET_CITATIONS", actions.payload);
      return {
          ...state,
          citations: actions.payload,
      };
  }
  return state;
}
