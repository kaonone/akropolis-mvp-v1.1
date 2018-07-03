import {calculatePlanValuesService} from "../src/services/PlanService";
import {PlanAfterCalculate, PlanValues} from "../src/models/Onboarding";

test('PlanService calculates correct required savings when returns are 0%', () => {
    let planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 0,
        savingPerMonth: 10,
        projectedReturns: 0
    };
    let result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(80);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(0);
});

test('PlanService calculates correct required savings when initial savings is 0', () => {
    let planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 0,
        savingPerMonth: 10,
        projectedReturns: 0.05
    };
    let result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(45);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});

test('PlanService calculates uses default of 5% returns', () => {
    let planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 0,
        savingPerMonth: 10,
        projectedReturns: undefined
    };
    let result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(45);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});

test('PlanService calculates correct required savings when returns and initial savings are non zero', () => {
    let planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 1000,
        savingPerMonth: 10,
        projectedReturns: 0.05
    };
    let result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(39);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});

test('PlanService calculates correct required savings when only 1 year of savings remain', () => {
    let planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 64,
        desiredAnnualIncome: 1200,
        existingPension: 1000,
        savingPerMonth: 10,
        projectedReturns: 0.05
    };
    let result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(1913);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});