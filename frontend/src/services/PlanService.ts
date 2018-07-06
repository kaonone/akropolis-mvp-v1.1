import {PlanAfterCalculate, PlanValues} from "../models/Onboarding";

export function calculatePlanValuesService(planValues: PlanValues): PlanAfterCalculate {
    const annuityRate = 0.05454;
    const ageAtRetirement = planValues.ageAtRetirement ? planValues.ageAtRetirement : 0;
    const currentAge = planValues.currentAge ? planValues.currentAge : 0;
    const desiredAnnualIncome = planValues.desiredAnnualIncome ? planValues.desiredAnnualIncome : 0;
    const existingPension = planValues.existingPension ? planValues.existingPension : 0;
    const yearsOfSavingLeft = ageAtRetirement - currentAge;
    if (yearsOfSavingLeft < 1) {
        return {
            moreSavingsNeeded : true,
            needToSave: 0,
            pensionValue: 0,
            projectReturns: 0
        };
    }
    const projectedReturns = planValues.projectedReturns == null ? 0.05 : planValues.projectedReturns;
    const inflationAdjustedReturn = (1 + projectedReturns - planValues.fees) / (1 + planValues.inflation) - 1;
    const growthCoef = (1 + inflationAdjustedReturn) * (1 + planValues.inflation);
    let coefficient = inflationAdjustedReturn > 0 ?
        (1 - Math.pow(growthCoef, yearsOfSavingLeft - 1)) / (1 - growthCoef)
        : yearsOfSavingLeft;
    if (coefficient === 0) {
        coefficient = 1;
    }
    const needToSaveAnnually = Math.max(0, desiredAnnualIncome / annuityRate - existingPension
        * Math.pow(1 + inflationAdjustedReturn, yearsOfSavingLeft))
        / coefficient;
    return {
        moreSavingsNeeded : needToSaveAnnually > 0,
        needToSave: Math.round(needToSaveAnnually / 12),
        pensionValue: desiredAnnualIncome,
        projectReturns: Math.round(projectedReturns * 100),
    };
}
