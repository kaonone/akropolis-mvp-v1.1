import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/images/info-icon.svg";
import { Props } from "../../views/onboarding/OnboardingView";

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
                    <div className="v-onboarding__wrapper-inputs">
                        <div className="v-onboarding__wrapper-range">
                            <div className="v-onboarding__wrappper-input-label">
                                <p>
                                    <FormattedMessage id="onboarding.retirementAge" />
                                </p>
                                <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                            </div>
                            <input className="v-onboarding__input-range o-form__input" type="range" />
                        </div>
                        <input className="o-form__input" type="text" />
                    </div>
                </div>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__wrapper-inputs v-onboarding__wrapper-inputs--align-center">
                        <div className="v-onboarding__wrapper-range">
                            <div className="v-onboarding__wrappper-input-label">
                                <p>
                                    <FormattedMessage id="onboarding.annualReturnAssumption" />
                                </p>
                                <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                            </div>
                        </div>
                        <span className="v-onboarding__currency">%</span>
                        <input className="o-form__input" type="text" />
                    </div>
                </div>
                <div className="v-onboarding__section v-onboarding__section--last">
                    <div className="v-onboarding__wrapper-inputs v-onboarding__wrapper-inputs--align-center">
                        <div className="v-onboarding__wrapper-range">
                            <div className="v-onboarding__wrappper-input-label">
                                <p>
                                    <FormattedMessage id="onboarding.inflationCalculationValue" />
                                </p>
                                <Link to=""><img className="v-onboarding__icon--info" src={infoIcon} /></Link>
                            </div>
                        </div>
                        <span className="v-onboarding__currency">%</span>
                        <input className="o-form__input" type="text" />
                    </div>
                </div>
                <button className="o-btn v-onboarding__btn">
                    <FormattedMessage id="onboarding.startSaving" />
                </button>
            </div>
        );
    }
}
