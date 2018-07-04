import * as React from "react";
import { FormattedMessage } from "react-intl";
import InputRange from "../inputRange/InputRangeComponent";

import "./c-make-commitment.css";

interface State {
    ethBalance: number;
    aktBalance: number;
    rangeEth: number;
    period: string;
}

export default class MakeCommitmentComponent extends React.Component<any, any> {

    public readonly state: State = {
        aktBalance: 0,
        ethBalance: 0,
        period: "month",
        rangeEth: 0,
    };

    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <>
                <div className="c-obtaning-tokens__wrapper-balances">
                    <div className="c-obtaning-tokens__wrapper-balance">
                        <div className="c-make-commitment__balance">{this.state.ethBalance}
                            <span className="c-make-commitment__unit">eth</span>
                        </div>
                        <FormattedMessage id="fundAccount.ethBalance">
                            {(fundAccount: string) => <label className="c-make-commitment__label">{fundAccount}</label>}
                        </FormattedMessage>
                    </div>
                    <div className="c-make-commitment__wrapper-balance">
                        <div className="c-make-commitment__balance">{this.state.aktBalance}
                            <span className="c-make-commitment__unit">akt</span>
                        </div>
                        <FormattedMessage id="fundAccount.aktBalance">
                            {(aktBalance: string) => <label className="c-make-commitment__label">{aktBalance}</label>}
                        </FormattedMessage>
                    </div>
                </div>
                <h3 className="c-make-commitment__headline">
                    <FormattedMessage id="fundAccount.obtainFreeTokensForTest" />
                </h3>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage id="fundAccount.iWillMakeARegularPaymentOf" /></label>
                    <InputRange symbol="ETH" value={this.state.rangeEth} max={100} min={0}
                        onChange={this.handleRangeChange("ageAtRetirement")} />
                </div>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage id="fundAccount.every" /></label>
                    <div className="c-make-commitment__wrapper-period">
                        <button className="c-make-commitment__btn-period"
                            value="week" onClick={this.setPeriod}>Week</button>
                        <button className="c-make-commitment__btn-period c-make-commitment__btn-period--active"
                            value="month" onClick={this.setPeriod}>Month</button>
                        <button className="c-make-commitment__btn-period" value="quarter" onClick={this.setPeriod}>Quarter</button>
                    </div>
                </div>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage id="fundAccount.forThePeriodOf" /></label>
                    <InputRange symbol="YEARS" value={this.state.rangeEth} max={100} min={0}
                        onChange={this.handleRangeChange("ageAtRetirement")} />
                </div>
                <p className="c-make-commitment__description"><FormattedMessage id="fundAccount.longerCommitmentsMeanMoreRewards" /></p>
                <FormattedMessage id="fundAccount.makeCommitment">{
                    (makeCommitment: string) =>
                        <button className="o-btn o-btn--wide">{makeCommitment}</button>}
                </FormattedMessage>
            </>
        );
    }

    private setPeriod = (event: any) => {

        const periodsButtons = document.querySelectorAll(".c-make-commitment__btn-period");
        Array.from(periodsButtons).map((item: any) => {
            item.classList.remove("c-make-commitment__btn-period--active");
        });

        const target = event.target;
        target.classList.add("c-make-commitment__btn-period--active");

        this.setState({
            ...this.state,
            period: event.target.value
        });
    }

    private handleRangeChange(field: string) {
        return (value: number) => {
            const newState = { ...this.state };
            newState[field] = value;
        };
    }
}