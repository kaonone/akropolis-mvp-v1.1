import * as React from "react";

import "./c-web3.css";

const ErrorAccount = () => (
    <div className="c-web3__error">
        <h1
            className="c-web3__error-title"
            dangerouslySetInnerHTML={{__html: "No ETH Account Available"}}
        />
        <p
            className="c-web3__error-message"
            dangerouslySetInnerHTML={{
                __html: `
It seems that you don&apos;t have an ETH account selected.<br/><br/>
If using MetaMask, please make sure that your wallet is unlocked and that
you have at least one account in your accounts list.`
            }}
        />
    </div>
);

export default ErrorAccount;
