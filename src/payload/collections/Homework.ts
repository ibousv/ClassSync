import type { CollectionConfig } from 'payload'
import { afterHomeworkChange } from '../hooks/afterHomeworkChange'
import { isAuthenticated, isAdminOrDelegate } from '../access'

export const Homework: CollectionConfig = {
  slug: 'homework',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'module', 'dueDate', 'priority'],
  },
  access: {
    read: isAuthenticated,
    create: isAdminOrDelegate,
    update: isAdminOrDelegate,
    delete: isAdminOrDelegate,
  },
  hooks: {
    afterChange: [afterHomeworkChange],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'completedBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
  ],
}
