import {PlanAfterCalculate, PlanValues} from "../models/Onboarding";

export function calculatePlanValuesService(planValues: PlanValues): PlanAfterCalculate {
    return {
        needToSave: 777,
        pensionValue: 15000,
        projectReturns: 7,
    };
}
