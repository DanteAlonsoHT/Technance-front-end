// Action types
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGES = 'DELETE_MESSAGES';

// Action creators
export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const deleteMessages = () => ({
  type: DELETE_MESSAGES,
});
