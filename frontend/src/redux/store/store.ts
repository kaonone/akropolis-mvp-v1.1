import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import {PlanAfterCalculate} from "../../models/Onboarding";

import onboardingReducer from "../reducers/onboardingReducer";
import portfolioReducer from "../reducers/portfolioReducer";
import selectAFundReducer from "../reducers/selectAFundReducer";
import web3AccountsReducer from "../reducers/web3AccountsReducer";
import web3NetworkReducer from "../reducers/web3NetworkReducer";
import web3Reducer from "../reducers/web3Reducer";
import {PortfolioStore} from "./portfolioStore";
import {SelectAFundStore} from "./selectAFundStore";
import {Web3AccountsStore} from "./web3AccountsStore";
import {Web3NetworkStore} from "./web3NetworkStore";
import {Web3Store} from "./web3Store";

const middleware = process.env.REACT_APP_STAGE !== "prod" ? applyMiddleware(promise(), thunk, createLogger()) : applyMiddleware(promise(), thunk);
const reducers = combineReducers({
    portfolio: portfolioReducer,
    selectAFund: selectAFundReducer,
    userData: onboardingReducer,
    web3: web3Reducer,
    web3Accounts: web3AccountsReducer,
    web3Network: web3NetworkReducer,
});

export interface ApplicationStore {
    portfolio: PortfolioStore;
    selectAFund: SelectAFundStore;
    userData: PlanAfterCalculate;
    web3: Web3Store;
    web3Accounts: Web3AccountsStore;
    web3Network: Web3NetworkStore;
}

export default createStore(reducers, middleware) as Store<ApplicationStore>;
