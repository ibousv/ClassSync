import type { CollectionConfig } from 'payload'
import { isAuthenticated, isOwnerOrAdmin } from '../access'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    defaultColumns: ['content', 'author', 'channel', 'createdAt'],
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isOwnerOrAdmin,
    delete: isOwnerOrAdmin,
  },
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'channel',
      type: 'relationship',
      relationTo: 'channels',
      required: true,
    },
  ],
}
