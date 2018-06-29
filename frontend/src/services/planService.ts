export interface PlanValues {
    ageAtRetirement: number;
    currentAge: number;
    desiredAnnualIncome: number;
    existingPension: number;
    savingPerMonth: number;
}

export interface PlanAfterCalculate {
    needToSave: number;
    pensionValue: number;
    projectReturns: number;
}

export function calculatePlanValuesService(planValues: PlanValues): PlanAfterCalculate {
    return {
        needToSave: 777,
        pensionValue: 15000,
        projectReturns: 7,
    };
}