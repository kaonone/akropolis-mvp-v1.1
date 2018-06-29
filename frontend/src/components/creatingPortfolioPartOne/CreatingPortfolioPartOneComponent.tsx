import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/images/info-icon.svg";
import { calculatePlanValuesService } from "../../services/planService";
import { Props } from "../../views/onboarding/OnboardingView";

import InputRange from "../inputRange/InputRangeComponent";

interface State {
    ageAtRetirement: number;
    currentAge: number;
    desiredAnnualIncome: number;
    existingPension: number;
    savingPerMonth: number;
    form: {
        range1: number;
        range2: number;
        range3: number;
    };
}

export default class CreatingPortfolioPartOneComponent extends React.Component<Props, State> {

    public readonly state: State = {
        ageAtRetirement: 0,
        currentAge: 0,
        desiredAnnualIncome: 0,
        existingPension: 0,
        form: {
            range1: 0,
            range2: 0,
            range3: 0,
        },
        savingPerMonth: 0
    };

    constructor(props: any) {
        super(props);

        this.handleRangeChange = this.handleRangeChange.bind(this);
    }

    public render() {
        return (
            <div className="v-onboarding__create-portfolio-first-step-slide">
                <h2 className="v-onboarding__headline">
                    <FormattedMessage id="onboarding.letSCreateYourFirstPortfolio" />
                </h2>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.myDesiredAnnualIncomeAfterRetirement" />
                    </div>
                    <InputRange value={this.state.form.range1} max={20000} min={0} symbol="£" onChange={this.handleRangeChange("range1")} />
                </div>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.valueOfMyExistingPensionPots" />
                    </div>
                    <InputRange value={this.state.form.range2} max={20000} min={0} symbol="£" onChange={this.handleRangeChange("range2")} />
                </div>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.howMuchIAmSavingPerMonth" />
                    </div>
                    <InputRange value={this.state.form.range3} max={20000} min={0} symbol="£" onChange={this.handleRangeChange("range3")} />
                </div>
                <div className="v-onboarding__wrapper-age-inputs">
                    <div className="v-onboarding__wrapper-age-input">
                        <p>
                            <FormattedMessage id="onboarding.myCurrentAge" />
                        </p>
                        <FormattedMessage id="onboarding.enterAge">
                            {(enterAge: string) => <input className="o-form__input v-onboarding__input" type="text" placeholder={enterAge} />}
                        </FormattedMessage>
                    </div>
                    <div className="v-onboarding__wrapper-age-input">
                        <div className="v-onboarding__wrappper-input-label">
                            <p>
                                <FormattedMessage id="onboarding.ageAtRetirement" />
                            </p>
                            <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                        </div>
                        <input className="o-form__input v-onboarding__input" type="text" />
                    </div>
                </div>
                <button
                    onClick={() => {
                        this.props.changeSlide(3);
                        if (calculatePlanValuesService(this.state) && this.props.calcultePlanValuesServiceProps) {
                            this.props.calcultePlanValuesServiceProps(calculatePlanValuesService(this.state));
                        }
                    }}
                    className="o-btn v-onboarding__btn"
                >
                    <FormattedMessage id="onboarding.tweakGoals" />
                </button>
            </div>
        );
    }

    private handleRangeChange(field: string) {
        return (value: number) => {
            const form = this.state.form;
            form[field] = value;
            this.setState({
                ...this.state,
                form,
            });
        };
    }
}
