import * as constants from "../../constants/actions/index";
import {Action, ActionType } from "../actions/action";
import {Web3NetworkStore} from "../store/web3NetworkStore";

const initialState: Web3NetworkStore = {
    networkFetched: false,
    networkId: 0,
};

export default function reducer(state: Web3NetworkStore = initialState, action: Action<ActionType, any>): Web3NetworkStore {
    switch (action.type) {
        case constants.FETCH_NETWORK_FULFILLED:
            return {
                ...state,
                networkFetched: true,
                networkId: action.payload,
            };
        case constants.FETCH_NETWORK_REJECTED:
            return {
                ...state,
                networkFetched: false,
                networkId: 0,
            };
        default:
            return state;
    }
}
