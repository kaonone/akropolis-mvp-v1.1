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
