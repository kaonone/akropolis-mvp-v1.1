import {connect, Dispatch} from "react-redux";

import {Product} from "../models/Products";

import {selectProductAction} from "../redux/actions/selectAFundAction";
import { ApplicationStore } from "../redux/store/store";

import {default as Component, Props, PropsFromDispatch} from "../views/layout/LayoutView";

export function mapStateToProps({userData}: ApplicationStore) {
    return {
        userData,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        selectProduct: (product: Product) => dispatch(selectProductAction(product)),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
