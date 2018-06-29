export interface PlanValues {
    ageAtRetirement: number;
    currentAge: number;
    desiredAnualIncome: number;
    existingPension: number;
    savingPerMonth: number;
}

export interface PlanAfterCalculate {
    needToSave: number;
    pensionValue: number;
    projectReturns: number;
}

export function calcultePlanValuesService(planValues: PlanValues): PlanAfterCalculate {
    return {
        needToSave: 777,
        pensionValue: 15000,
        projectReturns: 7,
    };
}