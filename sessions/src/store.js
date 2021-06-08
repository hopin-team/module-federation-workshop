import { createStore, combineReducers } from "redux";

function sessionsReducer(state = [], action) {
  switch (action.type) {
    case "RECEIVE_SESSIONS":
      return [...state, ...action.payload];
    default:
      return state;
  }
}

function viewerReducer(state = null, action) {
  switch (action.type) {
    case "RECEIVE_VIEWER":
      return action.payload;
    default:
      return state;
  }
}

export function configureStore(initialState) {
  return createStore(
    combineReducers({ sessions: sessionsReducer, viewer: viewerReducer }),
    initialState
  );
}
