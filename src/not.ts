/**
 * Infers to `false` if the passed type is `true`, otherwise infers to `true`.
 */
// biome-ignore format: let me cook
export type Not<T extends boolean> = T extends true ? false : true;
