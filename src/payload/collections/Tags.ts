import { CollectionConfig } from "payload/types";

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título da Tag',
      required: true,
      unique: true,
      maxLength: 32,
      admin: {
        placeholder: 'Título da Tag',
      },
      index: true,
    }
  ]
}

export default Tags;