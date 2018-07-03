import * as React from "react";

import CreatingPortfolioPartOneComponent from "../../components/creatingPortfolioPartOne/CreatingPortfolioPartOneComponent";
import CreatingPortfolioPartTwo from "../../components/creatingPortfolioPartTwo/CreatingPortfolioPartTwoComponent";
import SlideOneComponent from "../../components/onboarding/SlideOneComponent";
import {PlanAfterCalculate} from "../../models/Onboarding";

import logoAkropolis from "../../assets/images/logo-akropolis.svg";
import "./v-onboarding.css";

interface State {
    desiredAnnualIncome: string;
    numberOfSlide: 1 | 2 | 3;
    plan: PlanAfterCalculate;
    secondForm: {};
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

    public initStateOfPlan = {
        needToSave: 0,
        pensionValue: 0,
        projectReturns: 5,
    };
    
    public readonly state: State = {
        desiredAnnualIncome: "",
        numberOfSlide: 1,
        plan: this.initStateOfPlan,
        secondForm: {}
    };

    constructor(props: any) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    public render() {
        
        return (
            <div className="v-onboarding">
                <img className="v-onboarding__logo" src={logoAkropolis}/>

                {this.state.numberOfSlide === 1 &&
                <SlideOneComponent changeSlide={this.changeSlide}/>
                }

                {this.state.numberOfSlide === 2 &&
                <CreatingPortfolioPartOneComponent
                    changeSlide={this.changeSlide}
                    calculatePlanValuesServiceProps={this.handleCalculatePlanValuesService}
                />
                }

                {this.state.numberOfSlide === 3 &&
                <CreatingPortfolioPartTwo plan={this.state.plan} changeSlide={this.changeSlide} onSave={this.handleSave}/>
                }
            </div>
        );
    }

    private changeSlide = (value: 1 | 2 | 3) => {
        this.setState({numberOfSlide: value, plan: this.initStateOfPlan});
    }

    private handleCalculatePlanValuesService = (val: PlanAfterCalculate) => {
        this.setState({plan: val});
    }

    private handleSave() {
        localStorage.setItem("userData", JSON.stringify(this.state.plan));
        this.props.saveData(this.state.plan);
    }
}
