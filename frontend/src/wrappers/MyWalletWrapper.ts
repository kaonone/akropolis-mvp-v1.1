import {connect, Dispatch} from "react-redux";

import {fetchSampleDataAction} from "../redux/actions/myWalletAction";
import {ApplicationStore} from "../redux/store/store";

import {default as MyWalletComponent, Props, PropsFromDispatch} from "../views/myWallet/MyWalletComponent";

export function mapStateToProps({myWallet, web3Accounts, web3Network}: ApplicationStore) {
    return {
        account: web3Accounts.accountSelected,
        message: myWallet.sampleData,
        network: web3Network.networkId,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchSampleData: () => dispatch(fetchSampleDataAction()),
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(MyWalletComponent);
