import {Action} from "./action";

export function triggerSampleAction(payload: string): Action<"SAMPLE_ACTION_1", string> {
    return {
        payload,
        type: "SAMPLE_ACTION_1",
    };
}
