import * as React from "react";
import {FormattedMessage} from "react-intl";

export interface Props {
    account: string;
    message: string;
    network: number;
}

export interface PropsFromDispatch {
    fetchSampleData: () => void;
}

interface AllProps extends Props, PropsFromDispatch {}

export default class MyWalletComponent extends React.Component<AllProps, {}> {
    constructor(props: any) {
        super(props);
    }

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
