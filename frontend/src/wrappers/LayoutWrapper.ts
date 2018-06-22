import { connect } from "react-redux";

import LayoutComponent from "../components/layout/LayoutComponent";
import { ApplicationStore } from "../redux/store/store";

export function mapStateToProps({myWallet}: ApplicationStore) {
    return {
        message: myWallet.sampleData,
    };
}

export default connect(mapStateToProps)(LayoutComponent);
