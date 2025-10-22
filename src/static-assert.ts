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
}

// Collect all the applicable methods.
// prettier-ignore
type TypeStaticAssertion<T> =
    & GenericTypeStaticAssertion<T>

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
