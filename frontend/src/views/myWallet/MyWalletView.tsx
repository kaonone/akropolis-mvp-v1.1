import * as React from "react";
import {FormattedMessage} from "react-intl";

import ErrorWeb3 from "../../components/web3/ErrorWeb3";

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
        if (!this.props.web3Accounts.accountsFetched) {
            return null;
        }

        const {message} = this.props;
        const error = ErrorWeb3(this.props.web3Accounts, this.props.web3Network);

        return error ? error : (
            <div className="c-my-wallet">
                <h1><FormattedMessage id="myWallet.title"/></h1>
                {message}
            </div>
        );
    }
}
