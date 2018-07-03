import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/images/info-icon.svg";
import {PlanAfterCalculate} from "../../models/Onboarding";

import InputRange from "../inputRange/InputRangeComponent";

interface Props {
    changeSlide: (value: 1 | 2 | 3) => void;
    plan: PlanAfterCalculate;
    onSave: () => void;
}

interface State {
    form: {
        age: number;
        annualReturn: number;
        inflation: number;
    };
}

export default class CreatingPortfolioPartTwo extends React.Component<Props, State> {
    public readonly state: State = {
        form: {
            age: 65,
            annualReturn: 0,
            inflation: 0,
        }
    };

    constructor(props: any) {
        super(props);

        this.save = this.save.bind(this);
    }

    public render() {

        const {plan} = this.props;

        return (
            <div className="v-onboarding__create-portfolio-second-step-slide">
                <h2 className="v-onboarding__headline">
                    <FormattedMessage id="onboarding.letSCreateYourFirstPortfolio" />
                </h2>
                <div className="v-onboarding__wrapper-final-values">
                    <div className="v-onboarding__wrapper-final-value-item">
                        <p className="v-onboarding__describe-value">
                            <FormattedMessage id="onboarding.youNeedToSave" />
                        </p>
                        <div className="v-onboarding__wrapper-final-value">
                            <span className="v-onboarding__final-value-currency">$</span>
                            <div className="v-onboarding__value">{plan.needToSave}</div>
                            <span className="v-onboarding__period">/mo</span>
                        </div>
                    </div>
                    <div className="v-onboarding__wrapper-final-value-item">
                        <p className="v-onboarding__describe-value">
                            <FormattedMessage id="onboarding.toEndUpWithAnAnnualPensionOf" />
                        </p>
                        <div className="v-onboarding__wrapper-final-value">
                            <span className="v-onboarding__final-value-currency">$</span>
                            <div className="v-onboarding__value v-onboarding__value--smaller">{plan.pensionValue}</div>
                        </div>
                    </div>
                    <div className="v-onboarding__wrapper-final-value-item">
                        <p className="v-onboarding__describe-value">
                            <FormattedMessage id="onboarding.projectedReturns" />
                        </p>
                        <div className="v-onboarding__wrapper-final-value">
                            <div className="v-onboarding__value v-onboarding__value--smaller">
                                {plan.projectReturns}
                            </div>
                            <span className="v-onboarding__period">%</span>
                        </div>
                    </div>
                </div>
                <Link onClick={this.props.changeSlide.bind(this, 2)} className="v-onboarding__correct-basics" to="">&#60;
                    <FormattedMessage id="onboarding.correctBasics" />
                </Link>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.retirementAge"/>
                        <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                    </div>
                    <InputRange value={this.state.form.age} max={100} min={0} onChange={this.handleRangeChange("age")}/>
                </div>
                <div className="v-onboarding__section v-onboarding__section--inline">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.annualReturnAssumption"/>
                        <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                    </div>
                    <span className="v-onboarding__symbol">%</span>
                    <input className="o-form__input v-onboarding__input" type="number" min="0" max="100"
                           value={this.state.form.annualReturn} onChange={this.handleChange("annualReturn")} />
                </div>
                <div className="v-onboarding__section v-onboarding__section--inline">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.inflationCalculationValue"/>
                        <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                    </div>
                    <span className="v-onboarding__symbol">%</span>
                    <input className="o-form__input v-onboarding__input" type="number" min="0" max="100"
                           value={this.state.form.inflation} onChange={this.handleChange("inflation")} />
                </div>

                <button className="o-btn v-onboarding__btn" onClick={this.save}>
                    <FormattedMessage id="onboarding.startSaving" />
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
    
    private handleChange(field: string) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const min = parseInt(event.target.min, 0);
            const max = parseInt(event.target.max, 0);
            const parsedValue = parseFloat(event.target.value) || 0;
            const form = this.state.form;
            form[field] = parsedValue > max ? max : (parsedValue < min ? min : parsedValue);
            this.setState({
                ...this.state,
                form,
            });
        };
    }

    private save() {
        this.props.onSave();
    }
}
