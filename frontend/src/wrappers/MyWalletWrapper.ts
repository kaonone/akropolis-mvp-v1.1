import {connect, Dispatch} from "react-redux";

import {fetchSampleDataAction} from "../redux/actions/myWalletAction";
import {ApplicationStore} from "../redux/store/store";

import {default as MyWalletComponent, Props, PropsFromDispatch} from "../views/myWallet/MyWalletComponent";

export function mapStateToProps({myWallet}: ApplicationStore) {
    return {
        message: myWallet.sampleData,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchSampleData: () => dispatch(fetchSampleDataAction())
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(MyWalletComponent);
