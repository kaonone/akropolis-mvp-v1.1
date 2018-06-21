import {Action, ActionType } from "./../actions/action";
import { SampleStore } from "./../store/sampleStore";

const initialState: SampleStore = {
    sampleData: "Akropolis App",
};

export default function reducer(state = initialState, action: Action<ActionType, any>): SampleStore {
    switch (action.type) {
        case "SAMPLE_ACTION_1":

            const newState = {...state};
            newState.sampleData = action.payload;
            return newState;
    }
    return state;
}
