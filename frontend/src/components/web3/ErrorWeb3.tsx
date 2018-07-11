import * as React from "react";

import {config} from "../../config/config";

import ErrorAccount from "./ErrorAccount";
import ErrorEthereum from "./ErrorEthereum";
import ErrorNetwork from "./ErrorNetwork";

import {isAccountExist, isCorrectNetwork, isntEthereumBrowser} from "../../services/Web3Service";

import {Web3AccountsStore} from "../../redux/store/web3AccountsStore";
import {Web3NetworkStore} from "../../redux/store/web3NetworkStore";

const ErrorWeb3: any = (account: Web3AccountsStore, network: Web3NetworkStore) => {
    let error = null;
    let failed = false;
    if (isntEthereumBrowser()) {
        failed = true;
        error = <ErrorEthereum/>;
    }

    if (!failed && !isAccountExist(account)) {
        failed = true;
        error = <ErrorAccount/>;
    }

    if (!failed && config.network && !isCorrectNetwork(network, config.network)) {
        error = <ErrorNetwork/>;
    }

    return error;
};

export default ErrorWeb3;
