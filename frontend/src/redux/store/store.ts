import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import { MyWalletStore } from "./myWalletStore";

import myWalletReducer from "../reducers/myWalletReducer";

const middleware =  applyMiddleware(promise(), thunk, createLogger());
const reducers = combineReducers({
    myWallet: myWalletReducer,
});

export interface ApplicationStore {
    myWallet: MyWalletStore;
}

export default createStore(reducers, middleware) as Store<ApplicationStore>;
