import * as React from "react";
import { FormattedMessage } from "react-intl";
import {StepTwo} from "../../../views/fundAccount/FundAccountView";

import "./c-stake-akt.css";

interface StakeAkt {
    description: string;
    value: string;
    id: number;
}

interface Props {
    form: StepTwo;
    onConfirm: (form: StepTwo) => void;
}

interface State {
    stakeAkts: StakeAkt[];
    form: StepTwo;
}

export default class StakeAktComponent extends React.Component<Props, State> {

    public readonly state: State = {
        form: {
            stakeAkt: 1,
        },
        stakeAkts: [
            {
                description: "Full access to Akropolis",
                id: 0,
                value: "free",
            },
            {
                description: "10% discount on fees, premium products & rewards",
                id: 1,
                value: "500 AKT",
            },
            {
                description: "20% discount on fees, premium products & rewards",
                id: 2,
                value: "1000 AKT",
            },
        ]
    };

    constructor(props: any) {
        super(props);
    }

    public render() {

        const stakeAkts = this.state.stakeAkts.map((stakeAkt: any, i: number) => {
            return (
                <div key={i} onClick={() => this.onClick(stakeAkt.id)}
                     className={`c-stake-akt__box ${stakeAkt.id === this.state.form.stakeAkt ? "c-stake-akt__box--active" : ""}`}>
                    <div className="c-stake-akt__description">{stakeAkt.description}</div>
                    <div className="c-stake-akt__value">{stakeAkt.value}</div>
                </div>
            );
        });
        return (
            <>
                <h3 className="c-stake-akt__headline">
                    <FormattedMessage id="fundAccount.getDiscountsOnFeesAccessToPremiumProducts" />
                </h3>
                <div className="c-stake-akt__wrapper-stake-akt">
                    {stakeAkts}
                </div>
                <p className="c-stake-akt__introduction">
                    <FormattedMessage id="fundAccount.stakingTokensMeansThatTheyWillBeLockedUp" />
                </p>
                <button onClick={() => this.props.onConfirm(this.state.form)} className="o-btn o-btn--wide">
                    <FormattedMessage id="fundAccount.confirm"/>
                </button>
            </>
        );
    }
    private onClick = (id: number) => {
        this.setState({
            ...this.state,
            form: {
                stakeAkt: id,
            }
        });
    }
}
