import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './type';
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// setAlert() is a JS simple function called action creator to generate an action!
// Actions are payloads of information that send data from our application to our store.
// since Actions are the only source of information for the store.
// We send them to the reducer using dispatch().
// For example the setAlert() which has three parameters msg, alertType, id
// Which calls the callback function that holds the dispatch function as a parameter.
// The callback function returns an id with uuid.v4()
// and calls the dispatch function which dispatch an object that holds the type of the action
// and payload object with three values to the reducer.
// The reducer takes the action and checks the type of the action, takes the payload and the id
// that we want to delete from the state and it makes that change to original state.
// With that changes we got the updated props.
