import { connect } from "react-redux";

import { ApplicationStore } from "../redux/store/store";
import LayoutView from "../views/layout/LayoutView";

export function mapStateToProps({userData, web3Accounts, web3Network}: ApplicationStore) {
    return {
        userData,
        web3Accounts,
        web3Network,
    };
}

export default connect(mapStateToProps)(LayoutView);
