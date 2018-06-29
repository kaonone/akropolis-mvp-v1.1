import {PlanAfterCalculate, PlanValues} from "../models/Onboarding";

export function calculatePlanValuesService(planValues: PlanValues): PlanAfterCalculate {
    const yearsOfSavingLeft = planValues.ageAtRetirement - planValues.currentAge;
    if (yearsOfSavingLeft < 1) {
        return {
            needToSave: 0,
            pensionValue: 0,
            projectReturns: 0,
        };
    }
    const projectedAnnualReturn = 0.07;
    const yearsOnPension = 20;
    const sumOfNeededSavings = yearsOnPension * planValues.desiredAnnualIncome;
    const needToSaveAnnually = Math.max(0, sumOfNeededSavings - planValues.existingPension
        * Math.pow(1 + projectedAnnualReturn, yearsOfSavingLeft))
        * (-projectedAnnualReturn) / (1 - Math.pow(1 + projectedAnnualReturn, yearsOfSavingLeft - 1));
    return {
        needToSave: Math.round(needToSaveAnnually / 12),
        pensionValue: planValues.desiredAnnualIncome,
        projectReturns: Math.round(projectedAnnualReturn * 100),
    };
}
