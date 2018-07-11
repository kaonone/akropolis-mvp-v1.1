import * as React from "react";

import SlideOneComponent from "../../components/onboarding/SlideOneComponent";
import SlideTwoComponent from "../../components/onboarding/SlideTwoComponent";
import { PlanAfterCalculate, PlanValues } from "../../models/Onboarding";
import { calculatePlanValuesService } from "../../services/PlanService";

import "./v-onboarding.css";

interface State {
    numberOfSlide: 1 | 2;
    plan: PlanAfterCalculate;
    planValues: PlanValues;
}

export interface Props {
    changeSlide: (value: number) => void;
    calculatePlanValuesServiceProps?: (value: any) => PlanAfterCalculate | void;
    planAfterCalculate?: PlanAfterCalculate;
}

export interface PropsFromDispatch {
    saveData: (plan: PlanAfterCalculate) => void;
}

export default class OnboardingView extends React.Component<PropsFromDispatch, State> {

    public readonly initStateOfPlan: PlanAfterCalculate = {
        moreSavingsNeeded: false,
        needToSave: 0,
        pensionValue: 0,
        projectReturns: 5
    };

    public readonly initStateOfPlanValues: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 0,
        desiredAnnualIncome: 15000,
        existingPension: 0,
        fees: 0.0105,
    inflation: 0.025,
        projectedReturns: undefined,
        savingPerMonth: 0
    };

    public readonly state: State = {
        numberOfSlide: 1,
        plan: { ...this.initStateOfPlan },
        planValues: { ...this.initStateOfPlanValues },
    };

    constructor(props: any) {
        super(props);

        this.handleSlideUpdate = this.handleSlideUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    public componentWillMount() {
        const plan = calculatePlanValuesService(this.state.planValues);
        this.setState({
            ...this.state,
            plan
        });
    }

    public render() {
        return (
            <div className="v-onboarding">
                {
                    this.state.numberOfSlide === 1 &&
                    <SlideOneComponent changeSlide={this.changeSlide} />
                }

                {
                    this.state.numberOfSlide === 2 &&
                    <SlideTwoComponent
                        planValues={this.state.planValues}
                        plan={this.state.plan}
                        onChange={this.handleSlideUpdate}
                        onSave={this.handleSave}
                    />
                }
            </div>
        );
    }

    private changeSlide = (value: 1 | 2) => {
        this.setState({
            ...this.state,
            numberOfSlide: value,
            planValues: value === 2 ? { ...this.initStateOfPlanValues } : { ...this.state.planValues },
        });
    }

    private handleSlideUpdate(planValues: PlanValues) {
        const plan = calculatePlanValuesService(planValues);
        this.setState({
            ...this.state,
            plan,
            planValues
        });
    }

    private handleSave() {
        localStorage.setItem("userData", JSON.stringify(this.state.plan));
        this.props.saveData(this.state.plan);
    }
}
