import { InterfaceOf } from "./interface-of";
import { staticAssert } from "./static-assert";

// NOTE: These static assertions should just compile.

// It should preserve only public members of class.

class Class1 {
    public constructor(
        public readonly x: string,
        protected readonly y: number,
        private readonly z: number,
    ) {}

    public f(): void {}

    protected g(): number {
        return this.h();
    }

    private h(): number {
        return this.z;
    }
}

interface Interface1 {
    readonly x: string;
    f(): void;
}

staticAssert((that) => that.type<InterfaceOf<Class1>>().is<Interface1>());

// It should preserve overload declarations.

class Class2 {
    public f(x: number): void;

    public f(x: string, y: number): void;

    public f(_x: string | number, _y?: number): void {
        this.g();
    }

    private g(): void {}
}

interface Interface2 {
    f(x: number): void;
    f(x: string, y: number): void;
}

staticAssert((that) => that.type<InterfaceOf<Class2>>().is<Interface2>());
