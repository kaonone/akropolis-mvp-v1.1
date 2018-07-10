import * as React from "react";
import {FormattedMessage} from "react-intl";
import SubNavigationComponent from "../../../components/subNavigation/SubNavigationComponent";
// import SubNavigationComponent from "../../components/subNavigation/SubNavigationComponent";
import InputRange from "../../inputRange/InputRangeComponent";

import {StepOne} from "../../../views/fundAccount/FundAccountView";

import "./c-make-commitment.css";

interface Props {
    AKTBalance: number;
    ETHBalance: number;
    form: StepOne;
    onConfirm: (form: StepOne) => void;
}

interface State {
    ethBalance: number;
    aktBalance: number;
    form: StepOne;
}

export default class MakeCommitmentComponent extends React.Component<Props, State> {

    public readonly state: State = {
        aktBalance: 0,
        ethBalance: 0,
        form: {
            period: "month",
            rangeEth: 0,
            years: 1,
        }
    };

    constructor(props: any) {
        super(props);

        this.setPeriod = this.setPeriod.bind(this);
    }

    public componentWillMount() {
        this.setState({
            ...this.state,
            form: this.props.form,
        });
    }

    public render() {
        const {ETHBalance} = this.props;
        const {period, rangeEth, years} = this.state.form;
        const isNotValid = years === 0 || rangeEth === 0;
        return (
            <>
                <FormattedMessage id="fundAccount.makeCommitment">{
                    (makeCommitment: string) => <SubNavigationComponent title={makeCommitment} spaceForArrow={false}/>}
                </FormattedMessage>
                <h3 className="c-make-commitment__headline">
                    <FormattedMessage id="fundAccount.makeCommitmentToSaving"/>
                </h3>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage
                        id="fundAccount.iWillMakeARegularPaymentOf"/></label>
                    <InputRange symbol="ETH" value={rangeEth} max={ETHBalance} min={0} step={0.0001}
                                onChange={this.handleRangeChange("rangeEth")}/>
                </div>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage id="fundAccount.every"/></label>
                    <div className="c-make-commitment__wrapper-period">
                        <button
                            className={`c-make-commitment__btn-period ${period === "week" && "c-make-commitment__btn-period--active"}`}
                            onClick={this.setPeriod("week")}><FormattedMessage id="fundAccount.week"/></button>
                        <button
                            className={`c-make-commitment__btn-period ${period === "month" && "c-make-commitment__btn-period--active"}`}
                            onClick={this.setPeriod("month")}><FormattedMessage id="fundAccount.month"/></button>
                        <button
                            className={`c-make-commitment__btn-period ${period === "quarter" && "c-make-commitment__btn-period--active"}`}
                            onClick={this.setPeriod("quarter")}><FormattedMessage id="fundAccount.quarter"/></button>
                    </div>
                </div>
                <div className="c-make-commitment__wrapper-section">
                    <label className="c-make-commitment__label-range"><FormattedMessage
                        id="fundAccount.forThePeriodOf"/></label>
                    <InputRange symbol="YEARS" value={years} max={5} min={1}
                                onChange={this.handleRangeChange("years")}/>
                </div>
                <p className="c-make-commitment__description"><FormattedMessage
                    id="fundAccount.longerCommitmentsMeanMoreRewards"/></p>
                <button className="o-btn"
                        onClick={() => this.props.onConfirm(this.state.form)} disabled={isNotValid}>
                    <FormattedMessage id="fundAccount.makeCommitment"/>
                </button>
            </>
        );
    }

    private setPeriod = (period: "week" | "month" | "quarter") => {
        return () => {
            const form = {...this.state.form};
            form.period = period;
            this.setState({
                ...this.state,
                form,
            });
        };
    }

    private handleRangeChange(field: string) {
        return (value: number) => {
            const form = {...this.state.form};
            form[field] = value;
            this.setState({
                ...this.state,
                form,
            });
        };
    }
}
