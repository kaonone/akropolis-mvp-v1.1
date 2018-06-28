import {connect, Dispatch} from "react-redux";

import {ApplicationStore} from "../redux/store/store";

import {default as Component, Props} from "../components/AKTBalance/AKTBalanceComponent";

export function mapStateToProps({web3Accounts}: ApplicationStore) {
    return {
        account: web3Accounts.accountSelected,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {};
}

export default connect<Props, {}, {}>(mapStateToProps, mapDispatchToProps)(Component);
