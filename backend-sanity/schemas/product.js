//creating a schema, export it as basic JS object.
//product schema
export default {
  name: "product",
  title: "Product",
  type: "document",
  //fields for our schema, it's object based.
  fields: [
    {
      name: "image",
      title: "Image",
      //an array of images.
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: "true",
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      // a slug is like a url, unqiue string.
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        //source of slug is from name property
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
  ],
};
