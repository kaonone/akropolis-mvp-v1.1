import { connect } from "react-redux";

import { ApplicationStore } from "../redux/store/store";
import LayoutView from "../views/layout/LayoutView";

export function mapStateToProps({userData}: ApplicationStore) {
    return {
        userData,
    };
}

export default connect(mapStateToProps)(LayoutView);
