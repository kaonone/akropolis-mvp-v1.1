import * as React from "react";
import {connect, Dispatch} from "react-redux";

import { fetchAccountAction } from "../../redux/actions/web3Action";

export interface PropsFromDispatch {
    fetchAccount: () => void;
    // fetchNetwork: () => void;
}

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
let interval: any = null;
// let networkInterval: any = null;

class Web3ProviderComponent extends React.Component<PropsFromDispatch, {}> {

    public componentDidMount() {
        this.props.fetchAccount();
        // this.props.fetchNetwork();
        this.initPoll();
        // this.initNetworkPoll();
    }

    public componentWillUnmount() {
        clearInterval(interval);
        // clearInterval(networkInterval);
    }

    public render() {
        return null;
    }

    private initPoll() {
        if (!interval) {
            interval = setInterval(this.props.fetchAccount, ONE_MINUTE);
        }
    }

    // private initNetworkPoll() {
    //     if (!networkInterval) {
    //         networkInterval = setInterval(this.props.fetchNetwork, ONE_MINUTE);
    //     }
    // }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchAccount: () => dispatch(fetchAccountAction()),
        // fetchNetwork: () => dispatch(fetchNetworkAction()),
    };
}

export default connect<{}, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Web3ProviderComponent);
