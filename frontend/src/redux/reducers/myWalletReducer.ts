import * as constants from "../../constants/actions/myWalletActions";
import {Action, ActionType } from "../actions/action";
import {MyWalletStore} from "../store/myWalletStore";

const initialState: MyWalletStore = {
    fetched: false,
    fetching: false,
    sampleData: "",
};

export default function reducer(state: MyWalletStore = initialState, action: Action<ActionType, any>): MyWalletStore {
    switch (action.type) {
        case constants.FETCH_SAMPLE_DATA:
            const newState = {...state};
            newState.sampleData = action.payload;
            return newState;
        default:
            return state;
    }
}
