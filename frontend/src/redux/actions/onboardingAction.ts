import * as constants from "../../constants/actions";
import {PlanAfterCalculate} from "../../models/Onboarding";
import {Action} from "./action";

export function saveAction(plan: PlanAfterCalculate): Action<constants.SAVE_ONBOARDING_DATA, PlanAfterCalculate> {
    return {
        payload: plan,
        type: constants.SAVE_ONBOARDING_DATA,
    };
}
