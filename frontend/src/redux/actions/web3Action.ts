import * as constants from "../../constants/actions";
import { fetchATMBalance, fetchETHBalance, fetchPortfolio } from "../../services/DataService";
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

export function fetchAKTBalanceAction(account: string): Action<constants.FETCH_AKT_BALANCE, any> {
    return {
        payload: fetchATMBalance(account),
        type: constants.FETCH_AKT_BALANCE,
    };
}

export function fetchETHBalanceAction(account: string): Action<constants.FETCH_ETH_BALANCE, any> {
    return {
        payload: fetchETHBalance(account),
        type: constants.FETCH_ETH_BALANCE,
    };
}

export function fetchPortfolioAction(account: string): Action<constants.FETCH_PORTFOLIO, any> {
    return {
        payload: fetchPortfolio(account),
        type: constants.FETCH_PORTFOLIO,
    };
}
