// const resolveNetwork = (netId) => {
//   switch (netId) {
//     case '1':
//       return 'MAIN NET';
//     case '2':
//       return 'MORDEN';
//     case '3':
//       return 'ROPSTEN';
//     case '4':
//       return 'RINKEBY';
//     case '42':
//       return 'KOVAN';
//     default:
//       return 'UNKNOWN';
//   }
// };

import * as React from "react";
import {FormattedMessage} from "react-intl";

import "./c-web3.css";

const getText = (neededNetwork: string) => (
    <div className="c-web3__error">
        <h1 className="c-web3__error-title"><FormattedMessage id="web3.errorNetwork.title" /></h1>
        <p className="c-web3__error-message"><FormattedMessage id="web3.errorNetwork.desc" values={{network: neededNetwork}} /></p>
    </div>
);

const ErrorNetwork = () => {
    const network = "testenv";
    return getText(network);
};

export default ErrorNetwork;
