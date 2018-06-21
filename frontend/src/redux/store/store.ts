import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import { SampleStore } from "./sampleStore";

import sampleReducer from "../reducers/sampleReducer";

const middleware =  applyMiddleware(createLogger());
const reducers = combineReducers({
    sample: sampleReducer,
});

export interface ApplicationStore {
    sample: SampleStore;
}

export default createStore(reducers, middleware) as Store<ApplicationStore>;
