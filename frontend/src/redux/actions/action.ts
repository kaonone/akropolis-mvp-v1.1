import * as constants from "../../constants/actions";

export type ActionType =
    constants.FETCH_SAMPLE_DATA |
    constants.FETCH_NETWORK |
    constants.FETCH_NETWORK_FULFILLED |
    constants.FETCH_NETWORK_REJECTED |
    constants.FETCH_ACCOUNT |
    constants.FETCH_ACCOUNT_FULFILLED |
    constants.FETCH_ACCOUNT_REJECTED;

export interface Action<Type extends ActionType, Payload> {
    type: Type;
    payload?: Payload;
}
