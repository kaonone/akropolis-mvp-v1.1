import * as constants from "../../constants/actions/index";
import {Action, ActionType } from "../actions/action";
import {MyProductsStore} from "../store/myProductsStore";

const initialState: MyProductsStore = {
    fetched: false,
    fetching: false,
    sampleData: [],
};

export default function reducer(state: MyProductsStore = initialState, action: Action<ActionType, any>): MyProductsStore {
    switch (action.type) {
        case constants.FETCH_PRODUCTS_DATA:
            const newState = {...state};
            newState.sampleData = action.payload;
            return newState;
        default:
            return state;
    }
}
