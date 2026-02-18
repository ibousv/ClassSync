import type { CollectionConfig } from 'payload'
import { isAuthenticated, isOwnerOrAdmin } from '../access'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    defaultColumns: ['content', 'author', 'createdAt'],
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
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'targetType',
      type: 'select',
      required: true,
      options: [
        { label: 'Resource', value: 'resource' },
        { label: 'Homework', value: 'homework' },
      ],
    },
    {
      name: 'targetId',
      type: 'text',
      required: true,
    },
  ],
}
