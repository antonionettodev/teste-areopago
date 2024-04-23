import { CollectionConfig } from 'payload/types'

const Medias: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'name',
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 48,
        height: 48,
        position: 'centre',
      },
      {
        name: 'avatar',
        width: 150,
        height: 150,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'post',
        width: 1024,
        height: undefined,
        position: 'centre'
      }
    ],
    adminThumbnail: 'avatar',
    mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        placeholder: 'Texto Alternativo da Imagem',
      },
    },
  ],
};

export default Medias;