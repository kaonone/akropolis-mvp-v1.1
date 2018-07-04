import * as React from "react";

import ErrorAccount from "./ErrorAccount";
import ErrorEthereum from "./ErrorEthereum";
// import ErrorNetwork from "./ErrorNetwork";

import {isntEthereumBrowser} from "../../services/Web3Service";

import {Web3AccountsStore} from "../../redux/store/web3AccountsStore";
import {Web3NetworkStore} from "../../redux/store/web3NetworkStore";

const ErrorWeb3: any = (account: Web3AccountsStore, network: Web3NetworkStore) => {
    let error = null;
    let failed = false;
    if (isntEthereumBrowser()) {
        failed = true;
        error = <ErrorEthereum/>;
    }

    if (!failed && account.accountsFetched && !account.accountExists) {
        failed = true;
        error = <ErrorAccount/>;
    }

    // if (!failed && network.networkFetched && network.networkId && network.networkId !== "testenv") {
    //     error = <ErrorNetwork />;
    // }

    return error;
};

export default ErrorWeb3;
