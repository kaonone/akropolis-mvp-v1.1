import {connect} from "react-redux";

import {SampleComponent} from "../components/SampleComponent";
import { ApplicationStore } from "./../redux/store/store";

export function mapStateToProps({sample}: ApplicationStore) {
    return {
        message: sample.sampleData,
    };
}

export default connect(mapStateToProps)(SampleComponent);
