import { Not } from "./not";
import { staticAssert } from "./static-assert";

// NOTE: These static assertions should just compile.

staticAssert((that) => that.type<Not<true>>().is<false>());
staticAssert((that) => that.type<Not<false>>().is<true>());

staticAssert((that) => that.type<Not<boolean>>().is<boolean>());
