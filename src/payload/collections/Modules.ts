import type { CollectionConfig } from 'payload'
import { isAuthenticated, isAdminOrDelegate } from '../access'

export const Modules: CollectionConfig = {
  slug: 'modules',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'totalHours'],
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
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'totalHours',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color code for UI display',
      },
    },
  ],
}
