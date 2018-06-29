import * as React from "react";
import {FormattedMessage} from "react-intl";
import {fetchATMBalance} from "../../services/DataService";

export interface Props {
    account: string;
}

interface State {
    balance: string;
}

export default class AKTBalanceComponent extends React.Component<Props, State> {

    public readonly state: State = {
        balance: "0",
    };

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.account !== nextProps.account) {

            fetchATMBalance(nextProps.account)
                .then((balance: string) => {
                    this.setState({
                        ...this.state,
                        balance,
                    });
                })
                .catch(() => false);
        }
    }

    public render() {
        const {balance} = this.state;
        return (
            <div>
                <FormattedMessage id="AKTBalance.desc" values={{balance}}/>
            </div>
        );
    }
}
