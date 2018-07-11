/* tslint:disable:no-implicit-dependencies */
import ArrowBackIcon from "-!svg-react-loader?name=ethIcon!../../../assets/images/arrow-back-icon.svg";
import PiktoBg from "-!svg-react-loader?name=Icon!../../../assets/images/pikto-bg.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { StepTwo } from "../../../views/fundAccount/FundAccountView";

import "./c-stake-akt.css";

interface StakeAkt {
    description: string;
    value: number;
    id: number;
}

interface Props {
    form: StepTwo;
    onConfirm: (form: StepTwo) => void;
    back: () => void;
}

interface State {
    stakeAkts: StakeAkt[];
    form: StepTwo;
}

export default class StakeAktComponent extends React.Component<Props, State> {

    public readonly state: State = {
        form: {
            stakeAkt: 1,
            stakeAktValue: 500
        },
        stakeAkts: [
            {
                description: "Full access to Akropolis",
                id: 0,
                value: 0,
            },
            {
                description: "10% discount on fees, premium products & rewards",
                id: 1,
                value: 500,
            },
            {
                description: "20% discount on fees, premium products & rewards",
                id: 2,
                value: 1000,
            },
        ],

    };

    constructor(props: any) {
        super(props);
    }

    public render() {

        const getValueLabel = (value: number) => {
            if (value === 0) {
                return "Free";
            } else {
                return value + " AKT";
            }
        };

        const stakeAkts = this.state.stakeAkts.map((stakeAkt: any, i: number) => {
            return (
                <div key={i} onClick={() => this.onClick(stakeAkt.id)}
                    className={`c-stake-akt__box ${stakeAkt.id === this.state.form.stakeAkt ? "c-stake-akt__box--active" : ""}`}>
                    <PiktoBg className="c-stake-akt__pikto-bg" />
                    <div className="c-stake-akt__description">{stakeAkt.description}</div>
                    <div className="o-labels c-stake-akt__labels">{getValueLabel(stakeAkt.value)}</div>
                </div>
            );
        });
        return (
            <>
                <div className="c-stake-akt__header">
                    <button onClick={() => this.props.back()} className="c-stake-akt__arrow-back"><ArrowBackIcon /></button>
                    <h4 className="c-stake-akt__headline"><FormattedMessage id="fundAccount.makeCommitment" /></h4>
                </div>
                <p className="c-stake-akt__introduction">
                    <FormattedMessage id="fundAccount.getDiscountsOnFeesAccessToPremiumProducts" />
                </p>
                <div className="c-stake-akt__wrapper-items">
                    {stakeAkts}
                    <div className="c-stake-akt__wrapper-bottom">
                        <p className="c-stake-akt__introduction c-stake-akt__introduction--lines">
                            <FormattedMessage id="fundAccount.stakingTokensMeansThatTheyWillBeLockedUp" />
                        </p>
                        <button onClick={() => this.props.onConfirm(this.state.form)} className="o-btn o-btn--wide c-stake-akt__btn">
                            <FormattedMessage id="fundAccount.confirm" />
                        </button>
                    </div>
                </div>
            </>
        );
    }

    private onClick = (id: number) => {
        this.setState({
            ...this.state,
            form: {
                stakeAkt: id,
                stakeAktValue: this.state.stakeAkts
                    .filter((st) => st.id === id)
                    .map((st) => st.value)[0]
            }
        });
    }
}
