import {connect, Dispatch} from "react-redux";

import {fetchSampleDataAction} from "../redux/actions/myWalletAction";
import {ApplicationStore} from "../redux/store/store";

import {default as MyWalletComponent, Props, PropsFromDispatch} from "../views/myWallet/MyWalletView";

export function mapStateToProps({myWallet, web3Accounts, web3Network}: ApplicationStore) {
    return {
        message: myWallet.sampleData,
        web3Accounts,
        web3Network,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchSampleData: () => dispatch(fetchSampleDataAction()),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(MyWalletComponent);
