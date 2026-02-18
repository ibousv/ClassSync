import type { CollectionConfig } from 'payload'
import { isAuthenticated, isAdminOrDelegate } from '../access'

export const Channels: CollectionConfig = {
  slug: 'channels',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isAuthenticated,
    create: isAdminOrDelegate,
    update: isAdminOrDelegate,
    delete: isAdminOrDelegate,
  },
  fields: [
    {
      name: 'name',
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
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
      ],
    },
  ],
}
