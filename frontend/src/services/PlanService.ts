import {PlanAfterCalculate, PlanValues} from "../models/Onboarding";

export function calculatePlanValuesService(planValues: PlanValues): PlanAfterCalculate {
    const ageAtRetirement = planValues.ageAtRetirement ? planValues.ageAtRetirement : 0;
    const currentAge = planValues.currentAge ? planValues.currentAge : 0;
    const desiredAnnualIncome = planValues.desiredAnnualIncome ? planValues.desiredAnnualIncome : 0;
    const existingPension = planValues.existingPension ? planValues.existingPension : 0;
    const yearsOfSavingLeft = ageAtRetirement - currentAge;
    if (yearsOfSavingLeft < 1) {
        return {
            needToSave: 0,
            pensionValue: 0,
            projectReturns: 0,
        };
    }
    const projectedAnnualReturn = planValues.projectedReturns == null ? 0.05 : planValues.projectedReturns;
    const yearsOnPension = 20;
    const sumOfNeededSavings = yearsOnPension * desiredAnnualIncome;
    let coefficient = projectedAnnualReturn > 0 ?
        (1 - Math.pow(1 + projectedAnnualReturn, yearsOfSavingLeft - 1)) / (-projectedAnnualReturn)
        : yearsOfSavingLeft;
    if (coefficient === 0) {
        coefficient = 1;
    }
    const needToSaveAnnually = Math.max(0, sumOfNeededSavings - existingPension
        * Math.pow(1 + projectedAnnualReturn, yearsOfSavingLeft))
        / coefficient;
    return {
        needToSave: Math.round(needToSaveAnnually / 12),
        pensionValue: desiredAnnualIncome,
        projectReturns: Math.round(projectedAnnualReturn * 100),
    };
}
