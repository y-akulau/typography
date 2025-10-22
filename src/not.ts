/**
 * Infers to `false` if the passed type is `true`, otherwise infers to `true`.
 */
// prettier-ignore
export type Not<T extends boolean> =
    T extends true
    ? false
    : true;
