import { connect } from "react-redux";

import { ApplicationStore } from "../redux/store/store";
import LayoutView from "../views/layout/LayoutView";

export function mapStateToProps({myWallet}: ApplicationStore) {
    return {
        message: myWallet.sampleData,
    };
}

export default connect(mapStateToProps)(LayoutView);
