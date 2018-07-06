import {connect, Dispatch} from "react-redux";

import {fetchAKTBalanceAction, fetchETHBalanceAction} from "../redux/actions/web3Action";
import {ApplicationStore} from "../redux/store/store";

import {default as Component, Props, PropsFromDispatch} from "../views/fundAccount/FundAccountView";

export function mapStateToProps({selectAFund, web3, web3Accounts, web3Network}: ApplicationStore) {
    return {
        product: selectAFund.productSelected,
        web3,
        web3Accounts,
        web3Network,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchAKTBalance: (account: string) => dispatch(fetchAKTBalanceAction(account)),
        fetchETHBalance: (account: string) => dispatch(fetchETHBalanceAction(account)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
