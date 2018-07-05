import * as constants from "../../constants/actions/index";
import {Action, ActionType } from "../actions/action";
import {Web3AccountsStore} from "../store/web3AccountsStore";

const initialState: Web3AccountsStore = {
    accountExists: false,
    accountSelected: "",
    accounts: [],
    accountsFetched: false
};

export default function reducer(state: Web3AccountsStore = initialState, action: Action<ActionType, any>): Web3AccountsStore {
    switch (action.type) {
        case constants.FETCH_ACCOUNT_FULFILLED:
            const exists = action.payload.length > 0;
            let selected = null;
            if (exists) { selected = action.payload[0]; }
            return {
                ...state,
                accountExists: exists,
                accountSelected: selected,
                accounts: action.payload,
                accountsFetched: true
            };
        case constants.FETCH_ACCOUNT_REJECTED:
            return {
                ...state,
                accountExists: false,
                accountSelected: "",
                accounts: [],
                accountsFetched: false
            };
        default:
            return state;
    }
}
