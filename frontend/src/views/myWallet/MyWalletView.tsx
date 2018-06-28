import * as React from "react";
import {FormattedMessage} from "react-intl";

export interface Props {
    message: string;
}

export interface PropsFromDispatch {
    fetchSampleData: () => void;
}

interface AllProps extends Props, PropsFromDispatch {}

export default class MyWalletView extends React.Component<AllProps, {}> {

    public componentWillMount() {
        this.props.fetchSampleData();
    }

    public render() {
        const {message} = this.props;
        return (
            <div className="c-my-wallet">
                <h1><FormattedMessage id="myWallet.title"/></h1>
                {message}
            </div>
        );
    }
}
