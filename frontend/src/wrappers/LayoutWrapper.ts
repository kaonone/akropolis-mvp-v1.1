import { connect } from "react-redux";

import { ApplicationStore } from "../redux/store/store";
import LayoutComponent from "../views/layout/LayoutComponent";

export function mapStateToProps({myWallet}: ApplicationStore) {
    return {
        message: myWallet.sampleData,
    };
}

export default connect(mapStateToProps)(LayoutComponent);
