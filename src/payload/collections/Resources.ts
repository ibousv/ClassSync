import type { CollectionConfig } from 'payload'
import { afterResourceChange } from '../hooks/afterResourceChange'
import { isAuthenticated, isOwnerOrAdmin, isAdminOrDelegate } from '../access'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'module', 'author', 'createdAt'],
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isOwnerOrAdmin,
    delete: isAdminOrDelegate,
  },
  hooks: {
    afterChange: [afterResourceChange],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Course Notes', value: 'notes' },
        { label: 'Exercise', value: 'exercise' },
        { label: 'Summary', value: 'summary' },
        { label: 'Presentation', value: 'presentation' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
}
