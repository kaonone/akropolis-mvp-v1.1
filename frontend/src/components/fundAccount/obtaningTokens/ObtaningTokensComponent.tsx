/* tslint:disable:no-implicit-dependencies */
import MoneyIcon from "-!svg-react-loader?name=moneyIcon!../../../assets/images/money-icon.svg";
import SpinnerWhite from "-!svg-react-loader?name=moneyIcon!../../../assets/images/spin-white.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";
import SubNavigationComponent from "../../../components/subNavigation/SubNavigationComponent";

import { getFreeATMToken } from "../../../services/DataService";

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
    waiting: boolean;
}

export default class ObtaningTokensComponent extends React.Component<Props, State> {

    public readonly state: State = {
        aktBalance: 0,
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

        const getFreeAKTForTest = () => {
            const currency = "AKT";
            return !this.state.waiting ? (
                <button className="o-btn o-btn--wide c-obtaning-tokens__btn" onClick={this.getFreeAKT}>
                    <FormattedMessage id="fundAccount.forTest" values={{ currency: "1000 " + currency }} />
                </button>
            ) : (
                    <button className="o-btn o-btn--wide o-btn--disabled c-obtaning-tokens__btn" disabled={true}>
                        <SpinnerWhite />
                        <FormattedMessage id="fundAccount.obtainingFree" values={{ currency }} />
                    </button>
                );
        };

        const getFreeETHForTest = () => {
            const currency = "ETH";
            return (
                <a href="http://faucet.ropsten.be:3001/" target="_blank" className="o-btn o-btn--wide c-obtaning-tokens__btn">
                    <FormattedMessage id="fundAccount.forTest" values={{ currency }} />
                </a>
            );
        };

        return (
            <div className="c-obtaning-tokens__wrapper-options">
                <FormattedMessage id="fundAccount.fundYourAccount">{
                    (fundYourAccount: string) => <SubNavigationComponent title={fundYourAccount} spaceForArrow={false} />}
                </FormattedMessage>
                <MoneyIcon className="c-obtaning-tokens__icon" />
                <h3 className="c-obtaning-tokens__headline"><FormattedMessage id="fundAccount.obtainFreeTokensForTest" />
                </h3>
                <div>
                    {ETHBalance !== 0 ? getFreeAKTForTest() : getFreeETHForTest()}
                </div>
            </div>
        );
    }

    private getFreeAKT() {
        this.setState({
            ...this.state,
            waiting: true,
        });
        getFreeATMToken(this.props.account)
            .then(() => this.props.fetchAKTBalance(this.props.account));
    }
}
