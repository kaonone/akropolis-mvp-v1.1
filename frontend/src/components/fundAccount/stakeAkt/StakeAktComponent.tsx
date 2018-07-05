/* tslint:disable:no-implicit-dependencies */
import ArrowBackIcon from "-!svg-react-loader?name=ethIcon!../../../assets/images/arrow-back-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import {FormattedMessage} from "react-intl";
import SubNavigationComponent from "../../../components/subNavigation/SubNavigationComponent";
import {StepTwo} from "../../../views/fundAccount/FundAccountView";

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
                    <div className="c-stake-akt__description">{stakeAkt.description}</div>
                    <div className="c-stake-akt__value">{getValueLabel(stakeAkt.value)}</div>
                </div>
            );
        });
        return (
            <>
                <button onClick={() => this.props.back()} className="u-arrow__back"><ArrowBackIcon/></button>
                <FormattedMessage id="fundAccount.makeCommitment">{
                    (makeCommitment: string) => <SubNavigationComponent title={makeCommitment} spaceForArrow={true}/>}
                </FormattedMessage>
                <h3 className="c-stake-akt__headline">
                    <FormattedMessage id="fundAccount.getDiscountsOnFeesAccessToPremiumProducts"/>
                </h3>
                <div className="c-stake-akt__wrapper-stake-akt">
                    {stakeAkts}
                </div>
                <p className="c-stake-akt__introduction">
                    <FormattedMessage id="fundAccount.stakingTokensMeansThatTheyWillBeLockedUp"/>
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
                stakeAktValue: this.state.stakeAkts
                    .filter((st) => st.id === id)
                    .map((st) => st.value)[0]
            }
        });
    }
}
