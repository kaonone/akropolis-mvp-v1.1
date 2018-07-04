import * as React from "react";

import "./c-web3.css";

const ErrorEthereum = () => (
    <div className="c-web3__error">
        <h1
            className="c-web3__error-title"
            dangerouslySetInnerHTML={{__html: "Web3 Not Found"}}
        />
        <p
            className="c-web3__error-message"
            dangerouslySetInnerHTML={{
                __html: `You will need to have an Ethereum enabled browser to proceed.<br />
        Download <a href="https://metamask.io/" target="_blank">Metamask</a> for desktop,
        or <a href="https://status.im/" target="_blank">Status</a> /
        <a href="https://www.toshi.org/" target="_blank">Toshi</a> app for mobile`
            }}
        />
    </div>
);

export default ErrorEthereum;
