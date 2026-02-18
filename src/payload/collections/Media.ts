import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
