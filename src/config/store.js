import { createStore, combineReducers } from "redux";
import { playerReducer } from "../features/player/reducer";
import { mapReducer } from "../features/map/reducer";

const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer
});

export const Store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
