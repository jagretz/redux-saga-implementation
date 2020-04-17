import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as cat, fetchDataSaga, FETCH_DATA_REQUEST } from "./reducer";
import Saga from "./Saga";

// create a saga instance
const saga = new Saga();

// register sagas with actions
saga.registerAction(FETCH_DATA_REQUEST, fetchDataSaga);

// create the root reducer... one reducer to reduce them all!
const reducers = combineReducers({
    cat,
});

// add middlewares
const store = createStore(reducers, applyMiddleware(saga.middleware));

export default store;
