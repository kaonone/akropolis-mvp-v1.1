import * as React from "react";
import {FormattedMessage} from "react-intl";
import ProductRowComponent from "../../components/productRowComponent/ProductRowComponent";

export default class DataUsageView extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <h1><FormattedMessage id="nav.dataUsage"/></h1>
                <ProductRowComponent />
            </div>
        );
    }
}
