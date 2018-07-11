/* tslint:disable:no-implicit-dependencies */
import Logo from "-!svg-react-loader?name=ethIcon!../../assets/images/akropolis-logo.svg";
import LogoBg from "-!svg-react-loader?name=ethIcon!../../assets/images/pikto-bg.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { Props } from "../../views/onboarding/OnboardingView";

export default class SlideOneComponent extends React.Component<Props, {}> {

    public render() {
        return (
            <div className="v-onboarding__s1">
                <div className="v-onboarding__s1-logo">
                    <Logo className="v-onboarding__s1-logo-svg" />
                    <LogoBg className="v-onboarding__s1-logo-bg" />
                </div>
                <div className="v-onboarding__s1-section">
                    <h2 className="v-onboarding__s1-section-title">
                        <FormattedMessage id="onboarding.section1.title" />
                    </h2>
                    <p className="v-onboarding__s1-section-desc">
                        <FormattedMessage id="onboarding.section1.desc"/>
                    </p>
                </div>
                <div className="v-onboarding__s1-section">
                    <h2 className="v-onboarding__s1-section-title">
                        <FormattedMessage id="onboarding.section2.title" />
                    </h2>
                    <p className="v-onboarding__s1-section-desc">
                        <FormattedMessage id="onboarding.section2.desc"/>
                    </p>
                </div>
                <div className="v-onboarding__s1-section">
                    <h2 className="v-onboarding__s1-section-title">
                        <FormattedMessage id="onboarding.section3.title" />
                    </h2>
                    <p className="v-onboarding__s1-section-desc">
                        <FormattedMessage id="onboarding.section3.desc"/>
                    </p>
                </div>
                <button onClick={this.props.changeSlide.bind(this, 2)} className="o-btn v-onboarding__btn">
                    <FormattedMessage id="onboarding.createAPlan" />
                </button>
                <button className="o-btn o-btn--blue v-onboarding__btn v-onboarding__btn-blue">
                    <span className="v-onboarding__btn-blue-1"><FormattedMessage id="onboarding.createEmployeePlan" /></span>
                    <span className="v-onboarding__btn-blue-2"><FormattedMessage id="onboarding.comingSoon" /></span>
                </button>
            </div>
        );
    }
}
