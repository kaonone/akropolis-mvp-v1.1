import * as React from "react";
import {FormattedMessage} from "react-intl";

import {Web3AccountsStore} from "../../redux/store/web3AccountsStore";
import {Web3NetworkStore} from "../../redux/store/web3NetworkStore";

export interface Props {
    message: string;
    web3Accounts: Web3AccountsStore;
    web3Network: Web3NetworkStore;
}

export interface PropsFromDispatch {
    fetchSampleData: () => void;
}

interface AllProps extends Props, PropsFromDispatch {
}

export default class MyWalletView extends React.Component<AllProps, {}> {

    public componentWillMount() {
        this.props.fetchSampleData();
    }

    public render() {
        const {message} = this.props;

        return (
            <div className="c-my-wallet">
                <h1><FormattedMessage id="myWallet.title"/></h1>
                {message}
            </div>
        );
    }
}
