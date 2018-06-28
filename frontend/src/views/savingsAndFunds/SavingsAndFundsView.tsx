import * as React from "react";
import {FormattedMessage} from "react-intl";

export default class SavingsAndFundsView extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <h1><FormattedMessage id="nav.savingsAndFunds"/></h1>
            </div>
        );
    }
}
