import * as React from "react";
import { FormattedMessage } from "react-intl";
import { StepOne, StepTwo } from "../../../views/fundAccount/FundAccountView";

import "./c-confirmation-modal.css";

interface Props {
    isOpenProps: boolean;
    onClick: () => void;
    onClose: () => void;
    resultStepOne: StepOne;
    resultStepTwo: StepTwo;
}

export default class ConfirmationModalComponent extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const { rangeEth, period, years } = this.props.resultStepOne;
        const { stakeAktValue } = this.props.resultStepTwo;

        return (
            <div className="c-confirmation-modal__box">
                <h1 className="c-confirmation-modal__headline"><FormattedMessage id="fundAccount.confirmContribution" /></h1>
                <h3 className="c-confirmation-modal__introduction"><FormattedMessage id="fundAccount.youAreMakingACommitmentToContribute" /></h3>
                <div className="c-confirmation-modal__wrapper-row">
                    <span className="c-confirmation-modal__wrapper-underline">
                        <span className="c-confirmation-modal__value">{rangeEth}</span>
                        <span className="c-confirmation-modal__unit">eth</span>
                    </span>
                    <span className="c-confirmation-modal__base-text c-confirmation-modal__base-text--lower-case">
                        <FormattedMessage id="fundAccount.every" />
                    </span>
                    <span className="c-confirmation-modal__wrapper-underline">
                        <span className="c-confirmation-modal__value">
                            <FormattedMessage id={`fundAccount.${period}`} />
                        </span>
                    </span>
                </div>
                <div className="c-confirmation-modal__wrapper-row">
                    <span className="c-confirmation-modal__base-text">
                        <FormattedMessage id="fundAccount.for" />
                    </span>
                </div>
                <div className="c-confirmation-modal__wrapper-row">
                    <span className="c-confirmation-modal__wrapper-underline">
                        <span className="c-confirmation-modal__value">{years}</span><span className="c-confirmation-modal__unit">
                            <FormattedMessage id="fundAccount.years" />
                        </span>
                    </span>
                </div>
                <div className="c-confirmation-modal__wrapper-row">
                    <span className="c-confirmation-modal__wrapper-description">
                        <span className="c-confirmation-modal__base-text">
                            <FormattedMessage id="fundAccount.theFirstContributionOf" />
                        </span>
                        <span className="c-confirmation-modal__value">{rangeEth}</span>
                        <span className="c-confirmation-modal__unit">eth</span>
                        <span className="c-confirmation-modal__base-text">
                            <FormattedMessage id="fundAccount.willBePaidImmediately" />
                        </span>
                    </span>
                </div>
                <div className="c-confirmation-modal__wrapper-row">
                    <span className="c-confirmation-modal__base-text c-confirmation-modal__base-text--center">
                        <FormattedMessage id="fundAccount.thisWillTrigger_2Transactions" values={{ stakeAKTValue: stakeAktValue, eth: rangeEth }} />
                    </span>
                </div>
                <FormattedMessage id="fundAccount.confirm">{
                    (confirm: string) =>
                        <button className="o-btn c-confirmation-modal__btn" onClick={this.props.onClick}>{confirm}</button>}
                </FormattedMessage>
                <FormattedMessage id="fundAccount.cancel">{
                    (cancel: string) =>
                        <button onClick={this.props.onClose} className="o-btn o-btn--reverse c-confirmation-modal__btn">{cancel}</button>}
                </FormattedMessage>
            </div>
        );
    }
}
