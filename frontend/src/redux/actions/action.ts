import * as constants from "../../constants/actions/myWalletActions";

export type ActionType =
    constants.FETCH_SAMPLE_DATA;

export interface Action<Type extends ActionType, Payload> {
    type: Type;
    payload?: Payload;
}
