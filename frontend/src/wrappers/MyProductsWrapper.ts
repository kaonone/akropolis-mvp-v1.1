import {connect, Dispatch} from "react-redux";

import {fetchProductsDataAction} from "../redux/actions/myProductAction";
import {ApplicationStore} from "../redux/store/store";

import {default as MyProductsView, Props, PropsFromDispatch} from "../views/myProducts/MyProductsView";

export function mapStateToProps({myProducts}: ApplicationStore) {
    return {
        data: myProducts.sampleData,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchProductsData: () => dispatch(fetchProductsDataAction()),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(MyProductsView);
