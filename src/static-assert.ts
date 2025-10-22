import { IsSame } from "./is-same";
import { Not } from "./not";

interface StaticAssertion {
    /**
     * Starts an assertion about the type.
     */
    type<T>(): TypeStaticAssertion<T>;

    /**
     * Starts an assertion about the type of the value.
     */
    typeOf<T>(value: T): TypeStaticAssertion<T>;
}

interface GenericTypeStaticAssertion<T> {
    /**
     * Asserts that the type is exactly the same as `Exact`.
     * @see {@link IsSame}
     */
    is<Exact>(): IsSame<T, Exact>;

    /**
     * Asserts that the type is exactly **not** the same as `Exact`.
     * @see {@link IsSame}
     */
    isNot<Exact>(): Not<IsSame<T, Exact>>;

    /**
     * Asserts that the type extends the `Super` type.
     */
    extends<Super>(): T extends Super ? true : false;

    /**
     * Asserts that the type does not extend the `Super` type.
     */
    notExtends<Super>(): T extends Super ? false : true;

    /**
     * Asserts that the type is the supertype of the `Sub` type.
     */
    super<Sub>(): Sub extends T ? true : false;

    /**
     * Asserts that the type is not the supertype of the `Sub` type.
     */
    notSuper<Sub>(): Sub extends T ? false : true;
}

interface ObjectTypeStaticAssertion<T> {
    /**
     * Continues the assertion by changing the subject of the assertion to the property type of the object.
     */
    property<K extends keyof T>(key: K): TypeStaticAssertion<T[K]>;
}

// ObjectTypeStaticAssertion methods should be mixed only if the type is an object type.
// prettier-ignore
type MixObjectTypeStaticAssertion<T> =
    IsSame<T, any> extends false
    ? IsSame<T, never> extends false
      ? [T] extends [object]
        ? ObjectTypeStaticAssertion<T>
        : unknown
      : unknown
    : unknown;

interface ArrayTypeStaticAssertion<T extends readonly unknown[]> {
    /**
     * Continues the assertion by changing the subject of the assertion to the item type of the array.
     */
    item(): TypeStaticAssertion<T[number]>;
}

// ArrayTypeStaticAssertion methods should be mixed only if the type is an array type.
// prettier-ignore
type MixArrayTypeStaticAssertion<T> =
    IsSame<T, any> extends false
    ? IsSame<T, never> extends false
      ? [T] extends [readonly unknown[]]
        ? ArrayTypeStaticAssertion<T>
        : unknown
      : unknown
    : unknown;

// Collect all the applicable methods.
// prettier-ignore
type TypeStaticAssertion<T> =
    & GenericTypeStaticAssertion<T>
    & MixObjectTypeStaticAssertion<T>
    & MixArrayTypeStaticAssertion<T>

/**
 * Can be used for static assertions on types.
 *
 * `staticAssert` call can be compiled successfully
 * only if the type of the expression passed to `staticAssert`
 * is inferred to the type `true`.
 *
 * @param statement a boolean expression whose type is inferred to be `true`;
 * takes {@link StaticAssertion}, which can be used to construct static assertions
 *
 * @example
 * const f = () => 10;
 * staticAssert((that) => that.type<ReturnType<typeof f>>().is<number>());
 */
export function staticAssert<T extends true>(statement: (that: StaticAssertion) => T): void;
export function staticAssert(): void {}
