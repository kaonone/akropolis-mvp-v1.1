import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import infoIcon from "../../assets/images/info-icon.svg";
import { NAVIGATION } from "../../constants";
import {PlanAfterCalculate, PlanValues} from "../../models/Onboarding";
import InputRange from "../inputRange/InputRangeComponent";

interface Props {
    changeSlide: (value: 1 | 2 | 3) => void;
    plan: PlanAfterCalculate;
    planValues: PlanValues;
    onChange: (planValues: PlanValues) => void;
    onSave: () => void;
}

export default class CreatingPortfolioPartTwo extends React.Component<Props, PlanValues> {
    public readonly state: PlanValues = {
        ageAtRetirement: 65,
        currentAge: 0,
        desiredAnnualIncome: 15000,
        existingPension: 0,
        projectedReturns: undefined,
        savingPerMonth: 0
    };

    constructor(props: any) {
        super(props);

        this.save = this.save.bind(this);
    }

    public componentWillMount() {
        this.setState({ ...this.props.planValues });
    }

    public render() {

        const { plan } = this.props;
        const minAgeAtRetirement = this.state.currentAge ? this.state.currentAge + 1 : 0;

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
                        <FormattedMessage id="onboarding.itSeemsYouDonTNeedToSaveAnything" />
                    </span>
                </div>
            );

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
                        {planNeedToSave}
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
                <Link onClick={this.props.changeSlide.bind(this, 2)} className="v-onboarding__correct-basics"
                    to="">&#60;
                    <FormattedMessage id="onboarding.correctBasics" />
                </Link>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.retirementAge" />
                        <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                    </div>
                    <InputRange value={this.state.ageAtRetirement} max={100} min={minAgeAtRetirement}
                        onChange={this.handleRangeChange("ageAtRetirement")} />
                </div>
                <Link to={`/${NAVIGATION.myProducts}`} onClick={this.save}
                className={`o-btn v-onboarding__btn ${plan.needToSave === 0 ? "o-btn--disabled" : ""}`}>
                    <FormattedMessage id="onboarding.startSaving" />
                </Link>
            </div>
        );
    }

    private handleRangeChange(field: string) {
        return (value: number) => {
            const newState = { ...this.state };
            newState[field] = value;
            this.props.onChange(newState);
        };
    }

    private save() {
        this.props.onSave();
    }
}
