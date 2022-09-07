import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

//import the schemas we created
import product from "./product";
import banner from "./banner";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    /* Your types (schemas) here! */
    product,
    banner,
  ]),
});
