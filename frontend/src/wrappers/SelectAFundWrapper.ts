import {connect, Dispatch} from "react-redux";
import {Product} from "../models/Products";

import {fetchProductsDataAction, selectProductAction} from "../redux/actions/selectAFundAction";
import {ApplicationStore} from "../redux/store/store";
import {default as Component, Props, PropsFromDispatch} from "../views/selectAFund/SelectAFundView";

export function mapStateToProps({portfolio, selectAFund, web3Accounts}: ApplicationStore) {
    return {
        account: web3Accounts.accountSelected,
        data: selectAFund.products,
        isPortfolio: portfolio.portfolioFetched && portfolio.portfolioExist,
        selectedProduct: selectAFund.productSelected,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchProductsData: () => dispatch(fetchProductsDataAction()),
        selectProduct: (product: Product) => dispatch(selectProductAction(product)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
