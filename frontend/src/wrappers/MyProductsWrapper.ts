import {connect, Dispatch} from "react-redux";
import {Product} from "../models/Products";

import {fetchProductsDataAction, selectProductAction} from "../redux/actions/myProductAction";
import {ApplicationStore} from "../redux/store/store";

import {default as MyProductsView, Props, PropsFromDispatch} from "../views/myProducts/MyProductsView";

export function mapStateToProps({myProducts}: ApplicationStore) {
    return {
        data: myProducts.products,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchProductsData: () => dispatch(fetchProductsDataAction()),
        selectProduct: (product: Product) => dispatch(selectProductAction(product)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(MyProductsView);
