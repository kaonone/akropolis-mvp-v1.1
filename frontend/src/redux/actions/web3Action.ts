import * as constants from "../../constants/actions";
import {Commitment} from "../../models/Commitment";
import {fetchATMBalance, fetchETHBalance, fetchPortfolio, getCommitment} from "../../services/DataService";
import {fetchAccounts, fetchNetwork} from "../../services/Web3Service";
import {Action} from "./action";

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

export function fetchCommitmentAction(account: string): Action<constants.FETCH_COMMITMENT, any> {
    return {
        payload: getCommitment(account),
        type: constants.FETCH_COMMITMENT,
    };
}

export function commitmentCreatedAction(commitment: Commitment): Action<constants.COMMITMENT_CREATED, any> {
    return {
        payload: commitment,
        type: constants.COMMITMENT_CREATED,
    };
}
