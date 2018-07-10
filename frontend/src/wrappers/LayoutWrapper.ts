import { connect, Dispatch } from "react-redux";

import { Product } from "../models/Products";

import { selectProductAction } from "../redux/actions/selectAFundAction";
import { fetchPortfolioAction } from "../redux/actions/web3Action";
import { ApplicationStore } from "../redux/store/store";

import { default as Component, Props, PropsFromDispatch } from "../views/layout/LayoutView";

export function mapStateToProps({portfolio, userData, web3Accounts}: ApplicationStore) {
    return {
        account: web3Accounts.accountSelected,
        isPortfolio: portfolio.portfolioFetched && portfolio.portfolioExist,
        userData,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchPortfolio: (account: string) => dispatch(fetchPortfolioAction(account)),
        selectProduct: (product: Product) => dispatch(selectProductAction(product)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
