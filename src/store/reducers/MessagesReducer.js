import {
  ADD_MESSAGE,
  DELETE_MESSAGES,
} from '../actions/MessageActions';

const DEFAULT_STATE = {
  messages: [],
};

const MessageReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages].concat({ ...action.payload }),
      };
    case DELETE_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};

export default MessageReducer;
