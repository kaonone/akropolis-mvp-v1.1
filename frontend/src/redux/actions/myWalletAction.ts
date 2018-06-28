// import axios from "axios";
import * as constants from "../../constants/actions";
import {Action} from "./action";

export function fetchSampleDataAction(): Action<constants.FETCH_SAMPLE_DATA, string> {
    return {
        payload: "Akropolis App",
        type: constants.FETCH_SAMPLE_DATA,
    };
}

// export function fetchSampleDataAction(): Action<constants.FETCH_SAMPLE_DATA, any> {
//     return {
//         payload: axios.get("http://localhost:6543/api/my-wallet"),
//         type: constants.FETCH_SAMPLE_DATA,
//     };
// }
