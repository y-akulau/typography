/**
 * Infers to an interface type of the provided class type.
 *
 * @example
 * class Class1 {
 *     public constructor(private readonly x: number) {}
 *
 *     public f(): void { ... }
 * }
 *
 * // The problem is that `Class2` is needed to implement
 * // also the private members of `Class1`
 * // (even though that they are private and are not a part of the interface).
 * class Class2 implements Class1 { ... }
 *
 * // So `Class2` will implement the interface of the class.
 * class Class2 implements InterfaceOf<Class1> { ... }
 */
export type InterfaceOf<T> = Pick<T, keyof T>;
