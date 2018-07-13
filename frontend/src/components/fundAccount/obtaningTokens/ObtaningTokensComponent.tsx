/* tslint:disable:no-implicit-dependencies */
import SpinnerWhite from "-!svg-react-loader?name=moneyIcon!../../../assets/images/spin-white.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { getFreeAKTToken } from "../../../services/DataService";

import "./c-obtaning-tokens.css";

interface Props {
    account: string;
    AKTBalance: number;
    ETHBalance: number;
    fetchAKTBalance: (account: string) => void;
}

interface State {
    ethBalance: number;
    aktBalance: number;
    errorMsg: string;
    waiting: boolean;
}

export default class ObtaningTokensComponent extends React.Component<Props, State> {

    public readonly state: State = {
        aktBalance: 0,
        errorMsg: "",
        ethBalance: 0,
        waiting: false,
    };

    constructor(props: any) {
        // @ts-ignore
        super(props);

        this.getFreeAKT = this.getFreeAKT.bind(this);
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.AKTBalance !== nextProps.AKTBalance) {
            this.setState({
                ...this.state,
                waiting: false,
            });
        }
    }

    public render() {

        const { ETHBalance } = this.props;

        const obtainFreeTokensForTest = () => {
            if (ETHBalance !== 0) {
                return (
                    <h4 className="c-obtaning-tokens__description"><FormattedMessage id="fundAccount.1obtainFreeTokensForTest" /></h4>
                );
            } else {
                return (
                    <h4 className="c-obtaning-tokens__description"><FormattedMessage id="fundAccount.youWillNeedSomeTestEtherToFundYourAccount" /></h4>
                );
            }

        };

        const getFreeAKTForTest = () => {
            const currency = "AKT";
            return !this.state.waiting ? (
                <div className="c-obtaning-tokens__wrapper-description">
                    {obtainFreeTokensForTest()}
                    <button className="o-btn c-obtaning-tokens__btn" onClick={this.getFreeAKT}>
                        <FormattedMessage id="fundAccount.forTest" values={{ currency: "1000 " + currency }} />
                    </button>
                </div>
            ) : (
                    <div className="c-obtaning-tokens__wrapper-description">
                        {obtainFreeTokensForTest()}
                        <button className="o-btn o-btn--disabled c-obtaning-tokens__btn" disabled={true}>
                            <SpinnerWhite />
                            <FormattedMessage id="fundAccount.obtainingFree" values={{ currency }} />
                        </button>
                    </div>
                );
        };

        const getFreeETHForTest = () => {
            const currency = "ETH";
            return (
                <div className="c-obtaning-tokens__wrapper-description">
                    {obtainFreeTokensForTest()}
                    <a href="http://faucet.ropsten.be:3001/" target="_blank" className="o-btn c-obtaning-tokens__btn">
                        <FormattedMessage id="fundAccount.goToEthFaucet" values={{ currency }} />
                    </a>
                </div>
            );
        };

        return (
            <div className="c-obtaning-tokens__wrapper-options">
                <h4 className="c-obtaning-tokens__headline"><FormattedMessage id="fundAccount.fundYourAccount" /></h4>
                <div>
                    {ETHBalance !== 0 ? getFreeAKTForTest() : getFreeETHForTest()}
                </div>
                {this.state.errorMsg && <p className="c-obtaning-tokens__error">{this.state.errorMsg}</p>}
            </div>
        );
    }

    private getFreeAKT() {
        this.setState({
            ...this.state,
            errorMsg: "",
            waiting: true,
        });
        getFreeAKTToken(this.props.account)
            .then(() => this.props.fetchAKTBalance(this.props.account))
            .catch((err) => {
                this.setState({
                    ...this.state,
                    errorMsg: err.message,
                    waiting: false,
                });
            });
    }
}
