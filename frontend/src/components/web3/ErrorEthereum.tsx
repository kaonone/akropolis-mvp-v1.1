import * as React from "react";
import {FormattedMessage} from "react-intl";

import "./c-web3.css";

const ErrorEthereum = () => (
    <div className="c-web3__error">
        <h1 className="c-web3__error-title"><FormattedMessage id="web3.errorAccount.title" /></h1>
        <FormattedMessage id="web3.errorAccount.desc">
            {(desc: string) => (
                <p className="c-web3__error-message" dangerouslySetInnerHTML={{__html: desc}}/>
            )}
        </FormattedMessage>
    </div>
);

export default ErrorEthereum;
