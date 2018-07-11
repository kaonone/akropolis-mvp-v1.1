import * as constants from "../../constants/actions/index";
import {PrepareCommitment} from "../../models/Commitment";
import {Action, ActionType} from "../actions/action";
import {PortfolioStore} from "../store/portfolioStore";

const initialState: PortfolioStore = {
    commitment: {
        amountToPay: 0,
        createdAt: 0,
        durationInYears: 0,
        fundAddress: "",
        fundName: "",
        pastAnnualReturns: 0,
        period: 0,
    },
    commitmentFetched: false,
    commitmentFetching: false,

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
        case constants.FETCH_COMMITMENT_PENDING:
            return {
                ...state,
                commitmentFetching: true,
            };
        case constants.FETCH_COMMITMENT_REJECTED:
            return {
                ...state,
                commitmentFetched: false,
                commitmentFetching: false,
            };
        case constants.FETCH_COMMITMENT_FULFILLED:
            const commitment = PrepareCommitment(action.payload);
            return {
                ...state,
                commitment,
                commitmentFetched: true,
                commitmentFetching: false,
            };
        default:
            return state;
    }
}
