import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/images/info-icon.svg";
import { Props } from "../../views/onboarding/OnboardingView";

export default class CreatingPortfolioPartOneComponent extends React.Component<Props, {}> {

    public render() {

        return (
            <div className="v-onboarding__create-portfolio-first-step-slide">
                <h2 className="v-onboarding__headline">
                    <FormattedMessage id="onboarding.letSCreateYourFirstPortfolio" />
                </h2>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__wrapper-inputs">
                        <div className="v-onboarding__wrapper-range">
                            <div className="v-onboarding__wrappper-input-label">
                                <p>
                                    <FormattedMessage id="onboarding.myDesiredAnnualIncomeAfterRetirement" />
                                </p>
                            </div>
                            <input className="v-onboarding__input-range o-form__input" type="range" />
                        </div>
                        <div className="v-onboarding__wrapper-input">
                            <span className="v-onboarding__currency">£</span>
                            <input className="o-form__input" type="text" />
                        </div>
                    </div>
                </div>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__wrapper-inputs">
                        <div className="v-onboarding__wrapper-range">
                            <div className="v-onboarding__wrappper-input-label">
                                <p>
                                    <FormattedMessage id="onboarding.valueOfMyExistingPensionPots" />
                                </p>
                            </div>
                            <input
                                type="range"
                                name="desiredAnualIncome"
                                className="v-onboarding__input-range o-form__input"
                            />
                        </div>
                        <div className="v-onboarding__wrapper-input">
                            <span className="v-onboarding__currency">£</span>
                            <input className="o-form__input" type="text" />
                        </div>
                    </div>
                </div>
                <div className="v-onboarding__section">
                    <div className="v-onboarding__wrapper-inputs">
                        <div className="v-onboarding__wrapper-range">
                            <div className="v-onboarding__wrappper-input-label">
                                <p>
                                    <FormattedMessage id="onboarding.howMuchIAmSavingPerMonth" />
                                </p>
                            </div>
                            <input className="v-onboarding__input-range o-form__input" type="range" />
                        </div>
                        <div className="v-onboarding__wrapper-input">
                            <span className="v-onboarding__currency">£</span>
                            <input className="o-form__input" type="text" />
                        </div>
                    </div>
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
                <button onClick={this.props.changeSlide.bind(this, 3)} className="o-btn v-onboarding__btn">
                    <FormattedMessage id="onboarding.tweakGoals" />
                </button>
            </div>
        );
    }
}
