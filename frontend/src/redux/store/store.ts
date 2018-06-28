import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import { MyWalletStore } from "./myWalletStore";
import { Web3AccountsStore } from "./web3AccountsStore";
import { Web3NetworkStore } from "./web3NetworkStore";

import myWalletReducer from "../reducers/myWalletReducer";
import web3AccountsReducer from "../reducers/web3AccountsReducer";
import web3NetworkReducer from "../reducers/web3NetworkReducer";

const middleware =  applyMiddleware(promise(), thunk, createLogger());
const reducers = combineReducers({
    myWallet: myWalletReducer,
    web3Accounts: web3AccountsReducer,
    web3Network: web3NetworkReducer,
});

export interface ApplicationStore {
    myWallet: MyWalletStore;
    web3Accounts: Web3AccountsStore;
    web3Network: Web3NetworkStore;
}

export default createStore(reducers, middleware) as Store<ApplicationStore>;
