import * as constants from "../../constants/actions";

export type ActionType = 
    constants.FETCH_SAMPLE_DATA |
    constants.SAVE_ONBOARDING_DATA |
    constants.FETCH_NETWORK |
    constants.FETCH_NETWORK_FULFILLED |
    constants.FETCH_NETWORK_REJECTED |
    constants.FETCH_ETH_BALANCE |
    constants.FETCH_ETH_BALANCE_FULFILLED |
    constants.FETCH_ETH_BALANCE_REJECTED |
    constants.FETCH_AKT_BALANCE |
    constants.FETCH_AKT_BALANCE_FULFILLED |
    constants.FETCH_AKT_BALANCE_REJECTED |
    constants.FETCH_ACCOUNT |
    constants.FETCH_ACCOUNT_FULFILLED |
    constants.SELECT_PRODUCT |
    constants.FETCH_PRODUCTS_DATA |
    constants.FETCH_ACCOUNT_REJECTED;

export interface Action<Type extends ActionType, Payload> {
    type: Type;
    payload?: Payload;
}
