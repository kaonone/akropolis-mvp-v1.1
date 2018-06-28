import * as React from "react";
import { FormattedMessage } from "react-intl";
import cupIcon from "../../assets/images/cup-icon.svg";
import LockIcon from "../../assets/images/lock-icon.svg";
import loupeIcon from "../../assets/images/loupe-icon.svg";

export default class BenefitsComponent extends React.Component<any, {}> {

    public render() {

        return (
            <div className="v-onboarding__benefits-slide">
                <div className="v-onboarding__section">
                    <img className="v-onboarding__icon" src={LockIcon} />
                    <h2 className="v-onboarding__headline--icon">
                        <FormattedMessage id="onboarding.secureOwnership" />
                    </h2>
                </div>
                <div className="v-onboarding__section">
                    <img className="v-onboarding__icon" src={loupeIcon} />
                    <h2 className="v-onboarding__headline--icon">
                        <FormattedMessage id="onboarding.transparentReputationOfFundManagers" />
                    </h2>
                </div>
                <div className="v-onboarding__section v-onboarding__section--last">
                    <img className="v-onboarding__icon" src={cupIcon} />
                    <h2 className="v-onboarding__headline--icon">
                        <FormattedMessage id="onboarding.rewardForStickingToSavingGoals" />
                    </h2>
                    <p>
                        <FormattedMessage id="onboarding.briefExplanationOfWhatRewardPointsAre" />
                    </p>
                </div>
                <button onClick={this.props.changeSlide.bind(this, 2)} className="o-btn v-onboarding__btn">
                    <FormattedMessage id="onboarding.createAPlan" />
                </button>
            </div>

        );
    }
}
