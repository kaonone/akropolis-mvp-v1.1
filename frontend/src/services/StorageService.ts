import {Commitment} from "../models/Commitment";
import {PlanAfterCalculate} from "../models/Onboarding";
import {Product} from "../models/Products";

export function storeCommitment(commitment: Commitment) {
    localStorage.setItem("commitment", JSON.stringify(commitment));
}

export function storeSelectedFund(product: Product) {
    localStorage.setItem("product", JSON.stringify(product));
}

export function storeOnboardingData(plan: PlanAfterCalculate) {
    localStorage.setItem("userData", JSON.stringify(plan));
}

export function clearStorage() {
    localStorage.clear();
}

export function isEmpty(commitment: Commitment) {
    return !commitment || commitment.createdAt === 0;
}

export function getStoredCommitment() {
    return getObjectFromStorage("commitment");
}

export function getSelectedFund() {
    return getObjectFromStorage("product");
}

function getObjectFromStorage(key: string) {
    const rawJson = localStorage.getItem(key);
    if (rawJson) {
        return JSON.parse(rawJson);
    } else {
        return null;
    }
}

export function getOnboardingData() {
    return getObjectFromStorage("userData");
}