import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import InputRange from "../inputRange/InputRangeComponent";

import { NAVIGATION } from "../../constants";
import { PlanAfterCalculate, PlanValues } from "../../models/Onboarding";

import infoIcon from "../../assets/images/info-icon.svg";

interface Props {
    onSave: () => void;
    onChange: (planValues: PlanValues) => void;
    plan: PlanAfterCalculate;
    planValues: PlanValues;
}

export default class SlideTwoComponent extends React.Component<Props, PlanValues> {

    public readonly state: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 0,
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
        this.setState({...this.props.planValues});
    }

    public render() {

        const {plan} = this.props;
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
                    <span className="v-onboarding__final-value-currency">
                        <FormattedMessage id="onboarding.itSeemsYouDonTNeedToSaveAnything"/>
                    </span>
                </div>
            );

        return (
            <div className="v-onboarding__create-portfolio-first-step-slide">
                <h2 className="v-onboarding__headline">
                    <FormattedMessage id="onboarding.letSCreateYourFirstPortfolio"/>
                </h2>
                <div className="v-onboarding__wrapper-final-values">
                    <div
                        className="v-onboarding__wrapper-final-value-item v-onboarding__wrapper-final-value-item--first">
                        <p className="v-onboarding__describe-value">
                            <FormattedMessage id="onboarding.youNeedToSave"/>
                        </p>
                        {planNeedToSave}
                    </div>
                </div>
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
                {/*<div className="v-onboarding__section">*/}
                    {/*<div className="v-onboarding__section-title">*/}
                        {/*<FormattedMessage id="onboarding.howMuchIAmSavingPerMonth"/>*/}
                    {/*</div>*/}
                    {/*<InputRange value={this.state.savingPerMonth} max={20000} min={0} symbol="$"*/}
                                {/*onChange={this.handleRangeChange("savingPerMonth")}/>*/}
                {/*</div>*/}
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
                <Link to={`/${NAVIGATION.selectAFund}`} onClick={this.save}
                       className="o-btn v-onboarding__btn">
                    <FormattedMessage id="onboarding.startSaving"/>
                </Link>
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
