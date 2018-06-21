export type ActionType =
    "SAMPLE_ACTION_1" | "SAMPLE_ACTION_2";

export interface Action<Type extends ActionType, Payload> {
    type: Type;
    payload?: Payload;
}
