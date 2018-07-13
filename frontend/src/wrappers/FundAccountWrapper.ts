import {connect, Dispatch} from "react-redux";

import {
    commitmentCreatedAction,
    fetchAKTBalanceAction,
    fetchETHBalanceAction
} from "../redux/actions/web3Action";
import {ApplicationStore} from "../redux/store/store";

import {Commitment} from "../models/Commitment";
import {default as Component, Props, PropsFromDispatch} from "../views/fundAccount/FundAccountView";

export function mapStateToProps({portfolio, selectAFund, web3, web3Accounts, web3Network}: ApplicationStore) {
    return {
        isPortfolio: portfolio.portfolioFetched && portfolio.portfolioExist,
        product: selectAFund.productSelected,
        web3,
        web3Accounts,
        web3Network,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        commitmentCreated: (commitment: Commitment) => dispatch(commitmentCreatedAction(commitment)),
        fetchAKTBalance: (account: string) => dispatch(fetchAKTBalanceAction(account)),
        fetchETHBalance: (account: string) => dispatch(fetchETHBalanceAction(account))
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
