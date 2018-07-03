import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import infoIcon from "../../assets/images/info-icon.svg";
import {PlanValues} from "../../models/Onboarding";
import {calculatePlanValuesService} from "../../services/PlanService";
import {Props} from "../../views/onboarding/OnboardingView";

import InputRange from "../inputRange/InputRangeComponent";

export default class CreatingPortfolioPartOneComponent extends React.Component<Props, PlanValues> {

    public readonly state: PlanValues = {
        ageAtRetirement: 66,
        currentAge: 65,
        desiredAnnualIncome: 15000,
        existingPension: 0,
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
                    <FormattedMessage id="onboarding.letSCreateYourFirstPortfolio"/>
                </h2>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.myDesiredAnnualIncomeAfterRetirement"/>
                    </div>
                    <InputRange value={this.state.desiredAnnualIncome} max={200000} min={0} symbol="$"
                                onChange={this.handleRangeChange("desiredAnnualIncome")}/>
                </div>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.valueOfMyExistingPensionPots"/>
                    </div>
                    <InputRange value={this.state.existingPension} max={2000000} min={0} symbol="$"
                                onChange={this.handleRangeChange("existingPension")}/>
                </div>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.howMuchIAmSavingPerMonth"/>
                    </div>
                    <InputRange value={this.state.savingPerMonth} max={20000} min={0} symbol="$"
                                onChange={this.handleRangeChange("savingPerMonth")}/>
                </div>
                <div className="v-onboarding__wrapper-age-inputs">
                    <div className="v-onboarding__wrapper-age-input">
                        <p>
                            <FormattedMessage id="onboarding.myCurrentAge"/>
                        </p>
                        <FormattedMessage id="onboarding.enterAge">
                            {(enterAge: string) => <input
                                min="0"
                                max="100"
                                value={this.state.currentAge}
                                onChange={this.onChange}
                                onKeyDown={this.onKeyDown}
                                className="o-form__input v-onboarding__input"
                                type="number"
                                name="currentAge"
                                placeholder={enterAge}/>}
                        </FormattedMessage>
                    </div>
                    <div className="v-onboarding__wrapper-age-input">
                        <div className="v-onboarding__wrappper-input-label">
                            <p>
                                <FormattedMessage id="onboarding.ageAtRetirement"/>
                            </p>
                            <Link to=""><img className="v-onboarding__icon--info" src={infoIcon}/></Link>
                        </div>
                        <FormattedMessage id="onboarding.ageAtRetirement">
                            {(ageAtRetirement: string) => <input
                                min="0"
                                max="100"
                                value={this.state.ageAtRetirement}
                                onChange={this.onChange}
                                onKeyDown={this.onKeyDown}
                                className="o-form__input v-onboarding__input"
                                type="number"
                                name="ageAtRetirement"
                                placeholder={ageAtRetirement}/>}
                        </FormattedMessage>
                    </div>
                </div>
                <button
                    onClick={() => {
                        this.props.changeSlide(3);
                        if (calculatePlanValuesService(this.state) && this.props.calculatePlanValuesServiceProps) {
                            this.props.calculatePlanValuesServiceProps(calculatePlanValuesService(this.state));
                        }
                    }}
                    className="o-btn v-onboarding__btn"
                >
                    <FormattedMessage id="onboarding.continue"/>
                </button>
            </div>
        );
    }

    private handleRangeChange(field: string) {
        return (value: number) => {
            const newState = {
                ...this.state,
            };
            newState[field] = value;
            this.setState({
                ...this.state,
                ...newState,
            });
        };

    }

    private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 69) {
            event.preventDefault();
        }
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {
            ...this.state,
        };
        if (event.target.value) {
            const min = parseInt(event.target.min, 0);
            const max = parseInt(event.target.max, 0);
            const parsedValue = parseFloat(event.target.value) || 0;

            newState[event.target.name] = parsedValue > max ? max : (parsedValue < min ? min : parsedValue);
            if (newState.currentAge && newState.ageAtRetirement && newState.currentAge >= newState.ageAtRetirement ||
                newState.currentAge && !newState.ageAtRetirement) {
                newState.ageAtRetirement = newState.currentAge + 1;
            }
            this.setState({
                ...this.state,
                ...newState,
            });
        } else {
            newState[event.target.name] = undefined;
            this.setState({
                ...this.state,
                ...newState,
            });
        }
    }
}
