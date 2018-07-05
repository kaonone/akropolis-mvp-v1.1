import * as constants from "../../constants/actions/index";
import {Action, ActionType } from "../actions/action";
import {Web3Store} from "../store/web3Store";

const initialState: Web3Store = {
    AKTBalance: 0,
    ETHBalance: 0,
};

export default function reducer(state: Web3Store = initialState, action: Action<ActionType, any>): Web3Store {
    switch (action.type) {
        case constants.FETCH_ETH_BALANCE_FULFILLED:
            return {
                ...state,
                ETHBalance: action.payload,
            };
        case constants.FETCH_AKT_BALANCE_FULFILLED:
            return {
                ...state,
                AKTBalance: action.payload,
            };
        case constants.FETCH_ETH_BALANCE_REJECTED:
            return {
                ...state,
                ETHBalance: 0,
            };
        case constants.FETCH_AKT_BALANCE_REJECTED:
            return {
                ...state,
                AKTBalance: 0,
            };
        default:
            return state;
    }
}
