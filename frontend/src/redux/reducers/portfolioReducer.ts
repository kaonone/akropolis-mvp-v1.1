import * as constants from "../../constants/actions/index";
import {Action, ActionType } from "../actions/action";
import {PortfolioStore} from "../store/portfolioStore";

const initialState: PortfolioStore = {
    portfolioExist: false,
    portfolioFetched: false,
};

export default function reducer(state: PortfolioStore = initialState, action: Action<ActionType, any>): PortfolioStore {
    switch (action.type) {
        case constants.FETCH_PORTFOLIO_FULFILLED:
            const newState = {...state};
            newState.portfolioExist = action.payload === 1;
            return {
                ...state,
                portfolioExist: action.payload === 1,
                portfolioFetched: true,
            };
        case constants.FETCH_PORTFOLIO_REJECTED:
            return {
                ...state,
                portfolioExist: false,
                portfolioFetched: true,
            };
        default:
            return state;
    }
}
