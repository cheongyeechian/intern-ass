import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET as string,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI as string,
  }),
  collections: [
    {
      slug: "posts",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor({})
        },
        {
          name: "author",
          type: "relationship",
          relationTo: "users",
        },
        {
          name: "date",
          type: "date",
        },
      ],
    },
    {
      slug: "users",
      auth: true, // Enables authentication
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "email",
          type: "email",
          unique: true,
        },
      ],
    },
  ],
});
