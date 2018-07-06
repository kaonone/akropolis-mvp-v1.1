import {connect, Dispatch} from "react-redux";
import {Product} from "../models/Products";

import {fetchProductsDataAction, selectProductAction} from "../redux/actions/selectAFundAction";
import {ApplicationStore} from "../redux/store/store";
import {default as SelectAFundView, Props, PropsFromDispatch} from "../views/selectAFund/SelectAFundView";

export function mapStateToProps({selectAFund}: ApplicationStore) {
    return {
        data: selectAFund.products,
        selectedProduct: selectAFund.productSelected,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchProductsData: () => dispatch(fetchProductsDataAction()),
        selectProduct: (product: Product) => dispatch(selectProductAction(product)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(SelectAFundView);
