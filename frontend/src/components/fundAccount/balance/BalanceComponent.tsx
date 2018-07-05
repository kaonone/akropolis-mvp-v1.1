/* tslint:disable:no-implicit-dependencies */
import CheckIcon from "-!svg-react-loader?name=moneyIcon!../../../assets/images/check-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";

import "./c-balance.css";

interface Props {
    AKTBalance: number;
    ETHBalance: number;
}

interface State {
    ETHBalanceChanged: boolean;
}

export default class BalanceComponent extends React.Component<Props, State> {
    public readonly state: State = {
        ETHBalanceChanged: false,
    };

    public componentWillReceiveProps(nextProps: Props) {
        this.setState({
            ...this.state,
            ETHBalanceChanged: this.props.ETHBalance !== nextProps.ETHBalance,
        });
    }

    public render() {
        const {AKTBalance, ETHBalance} = this.props;

        return (
            <div className="c-balance__wrapper-balances">
                {this.state.ETHBalanceChanged && (
                    <div className="c-balance__info-balance">

                        <CheckIcon className="c-balance__icon c-balance__icon-info"/>
                        {ETHBalance}<FormattedMessage id="fundAccount.ethObtainedForTest"/>
                    </div>
                )}
                <div className="c-balance__wrapper-balance">
                    <div className="c-balance__balance">{ETHBalance}
                        <span className="c-balance__unit">eth</span>
                    </div>
                    <FormattedMessage id="fundAccount.ethBalance">
                        {(fundAccount: string) => <label className="c-balance__label">{fundAccount}</label>}
                    </FormattedMessage>
                </div>
                <div className="c-balance__wrapper-balance">
                    <div className="c-balance__balance">{AKTBalance}
                        <span className="c-balance__unit">akt</span>
                    </div>
                    <FormattedMessage id="fundAccount.aktBalance">
                        {(aktBalance: string) => <label className="c-balance__label">{aktBalance}</label>}
                    </FormattedMessage>
                </div>
            </div>
        );
    }
}
