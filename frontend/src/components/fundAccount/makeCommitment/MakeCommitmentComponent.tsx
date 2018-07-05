import * as React from "react";
import { FormattedMessage } from "react-intl";
import InputRange from "../../inputRange/InputRangeComponent";

import "./c-make-commitment.css";

interface Props {
    AKTBalance: number;
    ETHBalance: number;
}

interface State {
    ethBalance: number;
    aktBalance: number;
    rangeEth: number;
    period: "week" | "month" | "quarter";
}

export default class MakeCommitmentComponent extends React.Component<Props, State> {

    public readonly state: State = {
        aktBalance: 0,
        ethBalance: 0,
        period: "month",
        rangeEth: 0,
    };

    constructor(props: any) {
        super(props);

        this.setPeriod = this.setPeriod.bind(this);
    }

    public render() {
        const {ETHBalance} = this.props;

        return (
            <>
                <h3 className="c-make-commitment__headline">
                    <FormattedMessage id="fundAccount.makeCommitmentToSaving" />
                </h3>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage id="fundAccount.iWillMakeARegularPaymentOf" /></label>
                    <InputRange symbol="ETH" value={this.state.rangeEth} max={ETHBalance} min={0}
                        onChange={this.handleRangeChange("ageAtRetirement")} />
                </div>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage id="fundAccount.every" /></label>
                    <div className="c-make-commitment__wrapper-period">
                        <button className={`c-make-commitment__btn-period ${this.state.period === "week" && "c-make-commitment__btn-period--active"}`}
                                onClick={this.setPeriod("week")}><FormattedMessage id="fundAccount.week" /></button>
                        <button className={`c-make-commitment__btn-period ${this.state.period === "month" && "c-make-commitment__btn-period--active"}`}
                                onClick={this.setPeriod("month")}><FormattedMessage id="fundAccount.month" /></button>
                        <button className={`c-make-commitment__btn-period ${this.state.period === "quarter" && "c-make-commitment__btn-period--active"}`}
                                onClick={this.setPeriod("quarter")}><FormattedMessage id="fundAccount.quarter" /></button>
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

    private setPeriod = (period: "week" | "month" | "quarter") => {
        return () => {
            this.setState({
                ...this.state,
                period
            });
        };
    }

    private handleRangeChange(field: string) {
        return (value: number) => {
            const newState = { ...this.state };
            newState[field] = value;
        };
    }
}
