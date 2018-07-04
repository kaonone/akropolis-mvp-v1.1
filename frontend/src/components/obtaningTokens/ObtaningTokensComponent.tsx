/* tslint:disable:no-implicit-dependencies */
import CheckIcon from "-!svg-react-loader?name=moneyIcon!../../assets/images/check-icon.svg";
import MoneyIcon from "-!svg-react-loader?name=moneyIcon!../../assets/images/money-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";

import "./c-obtaning-tokens.css";

interface State {
    ethBalance: number;
    aktBalance: number;
    freeAkt: number;
}

export default class ObtaningTokensComponent extends React.Component<any, State> {

    public readonly state: State = {
        aktBalance: 0,
        ethBalance: 0,
        freeAkt: 1000,
    };

    constructor(props: any) {
        super(props);
    }

    public render() {

        const getFreeAktForTest = (
            <FormattedMessage id="fundAccount.getFreeEth">{
                (getFreeEth: string) =>
                    <button className="o-btn o-btn--wide c-obtaning-tokens__btn">{getFreeEth} {this.state.freeAkt}
                        <FormattedMessage id="fundAccount.forTest" /></button>}
            </FormattedMessage>
        );

        return (
            <>
                <div className="c-obtaning-tokens__wrapper-balances">
                    <div className="c-obtaning-tokens__wrapper-balance">
                        <span className="c-obtaning-tokens__info-balance">
                            <CheckIcon className="c-obtaning-tokens__icon c-obtaning-tokens__icon-info" />
                            {this.state.ethBalance}<FormattedMessage id="fundAccount.ethObtainedForTest" />
                        </span>
                        <div className="c-obtaning-tokens__balance">{this.state.ethBalance}
                            <span className="c-obtaning-tokens__unit">eth</span>
                        </div>
                        <FormattedMessage id="fundAccount.ethBalance">
                            {(fundAccount: string) => <label className="c-obtaning-tokens__label">{fundAccount}</label>}
                        </FormattedMessage>
                    </div>
                    <div className="c-obtaning-tokens__wrapper-balance">
                        <div className="c-obtaning-tokens__balance">{this.state.aktBalance}
                            <span className="c-obtaning-tokens__unit">akt</span>
                        </div>
                        <FormattedMessage id="fundAccount.aktBalance">
                            {(aktBalance: string) => <label className="c-obtaning-tokens__label">{aktBalance}</label>}
                        </FormattedMessage>
                    </div>
                </div>
                <div className="c-obtaning-tokens__wrapper-options">
                    <MoneyIcon className="c-obtaning-tokens__icon" />
                    <h3 className="c-obtaning-tokens__headline"><FormattedMessage id="fundAccount.obtainFreeTokensForTest" /></h3>
                    <div>
                        {getFreeAktForTest}
                    </div>
                </div>
            </>
        );
    }
}