import * as constants from "../../constants/actions";
import { fetchAccounts, fetchNetwork } from "../../services/Web3Service";
import { Action } from "./action";

export function fetchAccountAction(): Action<constants.FETCH_ACCOUNT, any> {
    return {
        payload: fetchAccounts(),
        type: constants.FETCH_ACCOUNT,
    };
}

export function fetchNetworkAction(): Action<constants.FETCH_NETWORK, any> {
    return {
        payload: fetchNetwork(),
        type: constants.FETCH_NETWORK,
    };
}
