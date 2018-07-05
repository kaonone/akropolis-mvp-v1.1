import * as React from "react";
import {FormattedMessage} from "react-intl";

import {Web3Store} from "../../redux/store/web3Store";

export interface Props {
    web3: Web3Store;
}

export default class AKTBalanceComponent extends React.Component<Props, {}> {

    public render() {
        const {AKTBalance} = this.props.web3;
        return (
            <div>
                <FormattedMessage id="AKTBalance.desc" values={{balance: AKTBalance}}/>
            </div>
        );
    }
}
