import * as constants from "../../constants/actions/index";
import {Action, ActionType} from "../actions/action";

import {PlanAfterCalculate} from "../../models/Onboarding";

const initialState: PlanAfterCalculate = {
    moreSavingsNeeded: true,
    needToSave: 0,
    pensionValue: 0,
    projectReturns: 0
};

export default function reducer(state: PlanAfterCalculate = initialState, action: Action<ActionType, any>): PlanAfterCalculate {
    switch (action.type) {
        case constants.SAVE_ONBOARDING_DATA:
            const result = {...state, ...action.payload, moreSavingsNeeded: action.payload.needToSave > 0};
            console.log("OH", result, action.payload.needToSave > 0);
            return result;
        default:
            return state;
    }
}
