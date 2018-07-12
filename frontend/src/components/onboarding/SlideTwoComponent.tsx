/* tslint:disable:no-implicit-dependencies */
import PiktoBg from "-!svg-react-loader?name=Icon!../../assets/images/pikto-bg.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import InputRange from "../inputRange/InputRangeComponent";

import { NAVIGATION } from "../../constants";
import { PlanAfterCalculate, PlanValues } from "../../models/Onboarding";

interface Props {
    onSave: () => void;
    onChange: (planValues: PlanValues) => void;
    plan: PlanAfterCalculate;
    planValues: PlanValues;
}

export default class SlideTwoComponent extends React.Component<Props, PlanValues> {

    public readonly state: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 30,
        desiredAnnualIncome: 15000,
        existingPension: 0,
        fees: 0.0105,
        inflation: 0.025,
        projectedReturns: undefined,
        savingPerMonth: 0
    };

    constructor(props: any) {
        super(props);

        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.save = this.save.bind(this);
    }

    public componentWillMount() {
        this.setState({ ...this.props.planValues });
    }

    public render() {

        const { plan } = this.props;
        // const minAgeAtRetirement = this.state.currentAge ? this.state.currentAge + 1 : 0;

        const planNeedToSave = plan.needToSave > 0 ?
            (
                <div className="v-onboarding__wrapper-final-value">
                    <span className="v-onboarding__final-value-currency">$</span>
                    <div className="v-onboarding__value">{plan.needToSave}</div>
                    <span className="v-onboarding__period">/mo</span>
                </div>
            )
            :
            (
                <div className="v-onboarding__wrapper-final-value">
                    <span className="v-onboarding__final-value-currency v-onboarding__final-value-currency--message">
                        <FormattedMessage id="onboarding.itSeemsYouDonTNeedToSaveAnything" />
                    </span>
                </div>
            );

        return (
            <div className="v-onboarding__create-portfolio-first-step-slide">
                <div className="v-onboarding__wrapper-final-values">
                    <div
                        className="v-onboarding__wrapper-final-value-item">
                        <h4 className="v-onboarding__describe-value">
                            <FormattedMessage id="onboarding.youNeedToSave" />
                        </h4>
                        {planNeedToSave}
                    </div>
                    <PiktoBg className="v-onboarding__pikto-bg" />
                </div>
                <div className="v-onboarding__box-content">
                    <div className="v-onboarding__section">
                        <div className="v-onboarding__section-title">
                            <FormattedMessage id="onboarding.desiredAnnualIncomeAfterRetirement" />
                        </div>
                        <InputRange value={this.state.desiredAnnualIncome} max={200000} min={0} symbol="$"
                            onChange={this.handleRangeChange("desiredAnnualIncome")} />
                    </div>
                    <div className="v-onboarding__section">
                        <div className="v-onboarding__section-title">
                            <FormattedMessage id="onboarding.valueOfMyExistingPensionPots" />
                        </div>
                        <InputRange value={this.state.existingPension} max={1000000} min={0} symbol="$"
                            onChange={this.handleRangeChange("existingPension")} />
                    </div>
                    <div className="v-onboarding__wrapper-age-inputs">
                        <div className="v-onboarding__wrapper-age-input">
                            <FormattedMessage id="onboarding.enterAge">
                                {(enterAge: string) => <input
                                    min="0"
                                    max="100"
                                    value={this.state.currentAge}
                                    onChange={this.onChange}
                                    onKeyDown={this.onKeyDown}
                                    className="o-form__input o-form__input--number"
                                    type="number"
                                    name="currentAge"
                                    placeholder={enterAge} />}
                            </FormattedMessage>
                            <label className="o-form__input-label">
                                <FormattedMessage id="onboarding.myCurrentAge" />
                            </label>
                        </div>
                        <div className="v-onboarding__wrapper-age-input">
                            <FormattedMessage id="onboarding.ageAtRetirement">
                                {(ageAtRetirement: string) => <input
                                    min="0"
                                    max="100"
                                    value={this.state.ageAtRetirement}
                                    onChange={this.onChange}
                                    onKeyDown={this.onKeyDown}
                                    className="o-form__input o-form__input--number"
                                    type="number"
                                    name="ageAtRetirement"
                                    placeholder={ageAtRetirement} />}
                            </FormattedMessage>
                            <label className="o-form__input-label">
                                <FormattedMessage id="onboarding.ageAtRetirement" />
                            </label>
                        </div>
                    </div>
                    <Link to={`/${NAVIGATION.selectAFund}`} onClick={this.save}
                        className="o-btn o-btn--wide v-onboarding__btn">
                        <FormattedMessage id="onboarding.startSaving" />
                    </Link>
                </div>
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
            this.props.onChange(newState);
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
        this.props.onChange(newState);
    }

    private save() {
        this.props.onSave();
    }
}
