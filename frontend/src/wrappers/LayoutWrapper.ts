import { connect, Dispatch } from "react-redux";

import { Product } from "../models/Products";

import { selectProductAction } from "../redux/actions/selectAFundAction";
import { ApplicationStore } from "../redux/store/store";

import { default as Component, Props, PropsFromDispatch } from "../views/layout/LayoutView";

export function mapStateToProps({portfolio, userData, web3Accounts}: ApplicationStore) {
    return {
        account: web3Accounts.accountSelected,
        isPortfolio: portfolio.portfolioFetched && portfolio.portfolioExist,
        userData,
        web3Accounts
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        selectProduct: (product: Product) => dispatch(selectProductAction(product)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
