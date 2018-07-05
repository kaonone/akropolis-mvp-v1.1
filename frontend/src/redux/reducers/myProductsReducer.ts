import * as constants from "../../constants/actions/index";
import {Action, ActionType } from "../actions/action";
import {MyProductsStore} from "../store/myProductsStore";

const initialState: MyProductsStore = {
    fetched: false,
    fetching: false,
    productSelected: null,
    products: [],
};

export default function reducer(state: MyProductsStore = initialState, action: Action<ActionType, any>): MyProductsStore {
    switch (action.type) {
        case constants.FETCH_PRODUCTS_DATA:
            return {
                ...state,
                products: action.payload
            };
        case constants.SELECT_PRODUCT:
            return {
                ...state,
                productSelected: action.payload
            };
        default:
            return state;
    }
}
