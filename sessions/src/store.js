import { createStore, combineReducers } from "redux";

function sessionsReducer(state = [], action) {
  switch (action.type) {
    case "RECEIVE_SESSIONS":
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export function configureStore() {
  return createStore(combineReducers({ sessions: sessionsReducer }));
}
