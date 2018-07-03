import {PlanAfterCalculate, PlanValues} from "../src/models/Onboarding";
import {calculatePlanValuesService} from "../src/services/PlanService";

test("PlanService calculates correct required savings when returns are 0%", () => {
    const planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 0,
        projectedReturns: 0,
        savingPerMonth: 10
    };
    const result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(80);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(0);
});

test("PlanService calculates correct required savings when initial savings is 0", () => {
    const planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 0,
        projectedReturns: 0.05,
        savingPerMonth: 10
    };
    const result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(45);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});

test("PlanService calculates uses default of 5% returns", () => {
    const planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 0,
        projectedReturns: undefined,
        savingPerMonth: 10
    };
    const result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(45);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});

test("PlanService calculates correct required savings when returns and initial savings are non zero", () => {
    const planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 40,
        desiredAnnualIncome: 1200,
        existingPension: 1000,
        projectedReturns: 0.05,
        savingPerMonth: 10
    };
    const result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(39);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});

test("PlanService calculates correct required savings when only 1 year of savings remain", () => {
    const planValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 64,
        desiredAnnualIncome: 1200,
        existingPension: 1000,
        projectedReturns: 0.05,
        savingPerMonth: 10
    };
    const result: PlanAfterCalculate = calculatePlanValuesService(planValues);
    expect(result.needToSave).toBe(1913);
    expect(result.pensionValue).toBe(planValues.desiredAnnualIncome);
    expect(result.projectReturns).toBe(5);
});