/**
 * Infers to `true` if the types passed are equivalent types, otherwise it infers to `false`.
 *
 * It is worth noting that type equivalence is considered, not mere substitutability.
 *
 * The only __limitation__ to mention is that the definition of "identical"
 * doesn't allow an intersection type to be identical to an object type with the same properties.
 *
 * Reference: https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
 *
 * @example
 * type T1 = IsSame<number, string>; // T1 is false
 * type T2 = IsSame<number, any>; // T2 is false
 * type T3 = IsSame<number, number> // T3 is true
 * type T4 = IsSame<number, number | string> // T4 is false
 */
// prettier-ignore
export type IsSame<T1, T2> =
    (<T>() => T extends T1 ? 0 : 1) extends (<T>() => T extends T2 ? 0 : 1)
    ? true
    : false;
