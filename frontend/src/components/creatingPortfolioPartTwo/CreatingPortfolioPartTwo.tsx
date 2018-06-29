import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/images/info-icon.svg";
import { Props } from "../../views/onboarding/OnboardingView";

import InputRange from "../inputRange/InputRangeComponent";

export default class CreatingPortfolioPartTwo extends React.Component<Props, {}> {

    public render() {

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
                            <span className="v-onboarding__final-value-currency">£</span>
                            <div className="v-onboarding__value">777</div>
                            <span className="v-onboarding__period">/mo</span>
                        </div>
                    </div>
                    <div className="v-onboarding__wrapper-final-value-item">
                        <p className="v-onboarding__describe-value">
                            <FormattedMessage id="onboarding.toEndUpWithAPensionValueOf" />
                        </p>
                        <div className="v-onboarding__wrapper-final-value">
                            <span className="v-onboarding__final-value-currency">£</span>
                            <div className="v-onboarding__value v-onboarding__value--smaller">15 000</div>
                        </div>
                    </div>
                    <div className="v-onboarding__wrapper-final-value-item">
                        <p className="v-onboarding__describe-value">
                            <FormattedMessage id="onboarding.projectedReturns" />
                        </p>
                        <div className="v-onboarding__wrapper-final-value">
                            <div className="v-onboarding__value v-onboarding__value--smaller">7</div>
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
                    <InputRange value={0} max={20000} min={0} symbol="£" onChange={this.handleRangeChange("range1")}/>
                </div>
                <div className="v-onboarding__section v-onboarding__section--inline">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.annualReturnAssumption"/>
                        <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                    </div>
                    <span className="v-onboarding__symbol">%</span>
                    <input className="o-form__input v-onboarding__input" type="text" />
                </div>
                <div className="v-onboarding__section v-onboarding__section--inline">
                    <div className="v-onboarding__section-title">
                        <FormattedMessage id="onboarding.inflationCalculationValue"/>
                        <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                    </div>
                    <span className="v-onboarding__symbol">%</span>
                    <input className="o-form__input v-onboarding__input" type="text" />
                </div>

                <button className="o-btn v-onboarding__btn">
                    <FormattedMessage id="onboarding.startSaving" />
                </button>
            </div>
        );
    }

    private handleRangeChange(field: string) {
        return (value: number) => {
            // const form = this.state.form;
            // form[field] = value;
            // this.setState({
            //     ...this.state,
            //     form,
            // });
        };
    }
}
