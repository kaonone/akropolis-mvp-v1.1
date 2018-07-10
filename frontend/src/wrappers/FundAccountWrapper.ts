import {connect, Dispatch} from "react-redux";

import { fetchAKTBalanceAction, fetchETHBalanceAction, fetchPortfolioAction } from "../redux/actions/web3Action";
import {ApplicationStore} from "../redux/store/store";

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
        fetchAKTBalance: (account: string) => dispatch(fetchAKTBalanceAction(account)),
        fetchETHBalance: (account: string) => dispatch(fetchETHBalanceAction(account)),
        fetchPortfolio: (account: string) => dispatch(fetchPortfolioAction(account)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
