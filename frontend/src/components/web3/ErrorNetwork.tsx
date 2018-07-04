// import * as React from "react";
//
// import { eth_network } from '../../../config/common-paths';
//
//
// const WrongNetwork = () => {
//   const network = resolveNetwork(eth_network);
//   return (
//     <div className="text-center">
//       {
//         getText(network)
//       }
//     </div>
//   );
// };
//
// export { WrongNetwork };
//
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

import "./c-web3.css";

const getText = (neededNetwork: string) => (
    <div className="c-web3__error">
        <h1 className="c-web3__error-title">Wrong blockchain network!</h1>
        <p className="c-web3__error-message">Switch to {neededNetwork} to use this DAPP</p>
    </div>
);

const ErrorNetwork = () => {
    const network = "testenv";
    return getText(network);
};

export default ErrorNetwork;
