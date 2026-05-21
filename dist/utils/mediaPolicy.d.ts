export type EffectiveMediaPolicy = {
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
};
export declare const computeEffectiveMediaPolicy: (mode: "practice" | "simulation", raw: {
    allowReplay?: boolean;
    allowSeek?: boolean;
    playLimit?: number;
}) => EffectiveMediaPolicy;
declare const _default: {
    computeEffectiveMediaPolicy: (mode: "practice" | "simulation", raw: {
        allowReplay?: boolean;
        allowSeek?: boolean;
        playLimit?: number;
    }) => EffectiveMediaPolicy;
};
export default _default;
