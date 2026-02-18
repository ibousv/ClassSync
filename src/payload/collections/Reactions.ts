import type { CollectionConfig } from 'payload'
import { isAuthenticated, isOwnerOrAdmin } from '../access'

export const Reactions: CollectionConfig = {
  slug: 'reactions',
  admin: {
    defaultColumns: ['type', 'author', 'createdAt'],
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isOwnerOrAdmin,
    delete: isOwnerOrAdmin,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Like', value: 'like' },
        { label: 'Helpful', value: 'helpful' },
        { label: 'Question', value: 'question' },
      ],
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
        { label: 'Comment', value: 'comment' },
        { label: 'Message', value: 'message' },
      ],
    },
    {
      name: 'targetId',
      type: 'text',
      required: true,
    },
  ],
}
