import { staticAssert } from "./static-assert";
import { Class } from "./class";

class Example {
    public constructor(
        public readonly name: string,
        public readonly age: number,
    ) {}
}

type ExampleClass = Class<Example, [name: string, age: number]>;
staticAssert((that) => that.type<InstanceType<ExampleClass>>().is<Example>());

staticAssert((that) => that.type<typeof Example>().extends<ExampleClass>());

class DifferentInstance {
    public constructor(public readonly name: string) {}
}

staticAssert((that) => that.type<typeof DifferentInstance>().notExtends<ExampleClass>());

class LessParameters {
    public get age() {
        return 10;
    }

    public constructor(public readonly name: string) {}
}

staticAssert((that) => that.type<typeof LessParameters>().extends<ExampleClass>());

class MoreParameters {
    public constructor(
        public readonly x: string,
        public readonly y: number,
        _z: string,
    ) {}
}

staticAssert((that) => that.type<typeof MoreParameters>().notExtends<ExampleClass>());

class DifferentParameters {
    public constructor(
        public readonly x: boolean,
        public readonly y: number,
    ) {}
}

staticAssert((that) => that.type<typeof DifferentParameters>().notExtends<ExampleClass>());
