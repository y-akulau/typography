/**
 * Represents the constructor signature of a class.
 *
 * This type describes constructable entities, meaning they can be instantiated
 * using the `new` keyword. It can be used for scenarios where it's needed
 * to pass a class as an argument to a function or
 * define a variable that can hold a class reference.
 *
 * @template T The type of the instance that the class constructs. This is the
 *             return type when the class is instantiated with `new`.
 *
 * @template A The type of the arguments that the class's constructor accepts,
 *             expressed as a tuple type. This ensures precise type checking
 *             of the constructor's parameters.
 *
 * @property {new (...args: A): T} new This is a construct signature. It signifies
 *           that any type conforming to `Class<T, A>` must be callable with the
 *           `new` operator. When invoked, it takes arguments matching the tuple
 *           type `A` and returns an instance of type `T`.
 *
 * @example
 * // 1. Define a simple class
 * class User {
 *     public constructor(
 *         private readonly name: string,
 *         private readonly age: number
 *     ) {}
 *
 *     public details(): string {
 *         return `${this.name} (${this.age} y.o.)`;
 *     }
 * }
 *
 * // 2. A factory function that accepts a class constructor
 * function create<T, A extends readonly unknown[]>(
 *     constructor: Class<T, A>,
 *     ...args: A
 * ): T {
 *     console.log(`Creating instance of ${constructor.name}...`);
 *     return new constructor(...args);
 * }
 *
 * // 3. Using the factory with User
 * const serviceInstance = create(User, "John", 27);
 * console.log(serviceInstance.details()); // Output: "John (27 y.o.)"
 */
export interface Class<T, A extends readonly unknown[]> {
    new (...args: A): T;
}
