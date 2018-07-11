/* tslint:disable:no-implicit-dependencies */
import PiktoBg from "-!svg-react-loader?name=Icon!../../../assets/images/pikto-bg.svg";
import SpinnerBlack from "-!svg-react-loader?name=moneyIcon!../../../assets/images/spin-black.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { StepOne, StepTwo } from "../../../views/fundAccount/FundAccountView";

import "./c-confirmation-modal.css";

interface Props {
    isOpenProps: boolean;
    isWaiting: boolean;
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
                <h4 className="c-confirmation-modal__headline"><FormattedMessage id="fundAccount.confirmContribution" /></h4>
                <p className="c-confirmation-modal__introduction"><FormattedMessage id="fundAccount.youAreMakingACommitmentToContribute" /></p>
                <div className="c-confirmation-modal__wrapper-row">

                    <div className="c-confirmation-modal__wrapper-item-value">
                        <span className="c-confirmation-modal__label">
                            <FormattedMessage id="fundAccount.every" />
                        </span>
                        <span className="c-confirmation-modal__value">
                            {rangeEth}
                            <span className="c-confirmation-modal__unit">eth</span>
                        </span>
                    </div>

                    <div className="c-confirmation-modal__wrapper-item-value">
                        <span className="c-confirmation-modal__label">
                            <FormattedMessage id="fundAccount.every" />
                        </span>
                        <span className="c-confirmation-modal__value">
                            <FormattedMessage id={`fundAccount.${period}`} />
                        </span>
                    </div>

                    <div className="c-confirmation-modal__wrapper-item-value">
                        <span className="c-confirmation-modal__label">
                            <FormattedMessage id="fundAccount.period" />
                        </span>
                        <span className="c-confirmation-modal__value">
                            {years}
                            <span className="c-confirmation-modal__unit">
                                <FormattedMessage id="fundAccount.years" />
                            </span>
                        </span>
                    </div>
                </div>
                <span className="c-confirmation-modal__introduction">
                    <FormattedMessage id="fundAccount.thisWillTrigger_2Transactions" values={{ stakeAKTValue: stakeAktValue, eth: rangeEth }} />
                </span>
                <PiktoBg className="c-confirmation-modal__pikto-bg" />
                {this.props.isWaiting ? (
                    <div className="c-confirmation-modal__spinner"><SpinnerBlack /></div>
                ) : (
                        <div className="c-confirmation-modal__btns">
                            <FormattedMessage id="fundAccount.cancel">{
                                (cancel: string) =>
                                    <button onClick={this.props.onClose}
                                        className="o-btn o-btn--basic o-btn--cancel">{cancel}</button>}
                            </FormattedMessage>
                            <FormattedMessage id="fundAccount.confirm">{
                                (confirm: string) =>
                                    <button className="o-btn o-btn--basic" onClick={this.props.onClick}>{confirm}</button>}
                            </FormattedMessage>
                        </div>
                    )}
            </div>
        );
    }
}
