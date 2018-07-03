export interface PlanValues {
    ageAtRetirement: number | undefined;
    currentAge: number | undefined;
    desiredAnnualIncome: number | undefined;
    existingPension: number | undefined;
    savingPerMonth: number | undefined;
}

export interface PlanAfterCalculate {
    needToSave: number;
    pensionValue: number;
    projectReturns: number;
}
