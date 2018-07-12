/* tslint:disable:no-implicit-dependencies */
import PiktoBg from "-!svg-react-loader?name=Icon!../../../assets/images/pikto-bg.svg";
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

    public componentWillMount() {
        const bodyElement = document.querySelector("body");
        if (!bodyElement) {
            return;
        }
        bodyElement.classList.add("isBalance");
    }

    public componentWillUnmount() {
        const bodyElement = document.querySelector("body");
        if (!bodyElement) {
            return;
        }
        bodyElement.classList.remove("isBalance");
    }

    public render() {
        const { AKTBalance, ETHBalance } = this.props;

        return (
            <>
                <div className="c-balance__wrapper">
                    <div className="c-balance__wrapper-content">
                        <div className="c-balance__wrapper-balance">
                            <div className="c-balance__balance">{ETHBalance}
                            </div>
                            <FormattedMessage id="fundAccount.ethBalance">
                                {(fundAccount: string) => <label className="c-balance__label">{fundAccount}</label>}
                            </FormattedMessage>
                        </div>
                        <div className="c-balance__wrapper-balance">
                            <div className="c-balance__balance">{AKTBalance}
                            </div>
                            <FormattedMessage id="fundAccount.aktBalance">
                                {(aktBalance: string) => <label className="c-balance__label">{aktBalance}</label>}
                            </FormattedMessage>
                        </div>
                        <PiktoBg className="c-balance__pikto-bg" />
                    </div>
                </div>
            </>
        );
    }
}
