import * as React from "react";
import {FormattedMessage} from "react-intl";

export default class MyProductsComponent extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <h1><FormattedMessage id="nav.myProducts"/></h1>
            </div>
        );
    }
}
