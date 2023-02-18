import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { CarouselReducer } from "./Reducers/CarouselReducer";
import { ManageLotteriesReducer } from "./Reducers/ManageLotteriesReducer";
import { ManageStationsReducer } from "./Reducers/ManageStationsReducer";
import { ManageUserReducer } from "./Reducers/ManageUserReducer";
import { LoadingReducer } from "./Reducers/LoadingReducer";
import { ErrorReducer } from "./Reducers/ErrorReducer";

const rootReducer = combineReducers({
  // States of application
  CarouselReducer,
  ManageLotteriesReducer,
  ManageStationsReducer,
  ManageUserReducer,
  LoadingReducer,
  ErrorReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
