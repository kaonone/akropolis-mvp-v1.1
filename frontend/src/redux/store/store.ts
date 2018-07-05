import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware"; 
import thunk from "redux-thunk";

import {PlanAfterCalculate} from "../../models/Onboarding";

import { MyProductsStore } from "./myProductsStore";
import { MyWalletStore } from "./myWalletStore";
import { Web3AccountsStore } from "./web3AccountsStore";
import { Web3NetworkStore } from "./web3NetworkStore";
import { Web3Store } from "./web3Store";

import myProductsReducer from "../reducers/myProductsReducer";
import myWalletReducer from "../reducers/myWalletReducer";
import onboardingReducer from "../reducers/onboardingReducer";
import web3AccountsReducer from "../reducers/web3AccountsReducer";
import web3NetworkReducer from "../reducers/web3NetworkReducer";
import web3Reducer from "../reducers/web3Reducer";

const middleware =  applyMiddleware(promise(), thunk, createLogger());
const reducers = combineReducers({
    myProducts: myProductsReducer,
    myWallet: myWalletReducer,
    userData: onboardingReducer,
    web3: web3Reducer,
    web3Accounts: web3AccountsReducer,
    web3Network: web3NetworkReducer,
});

export interface ApplicationStore {
    myWallet: MyWalletStore;
    myProducts: MyProductsStore;
    userData: PlanAfterCalculate;
    web3: Web3Store;
    web3Accounts: Web3AccountsStore;
    web3Network: Web3NetworkStore;
}

export default createStore(reducers, middleware) as Store<ApplicationStore>;
