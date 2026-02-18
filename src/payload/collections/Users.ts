import type { CollectionConfig } from 'payload'
import { isAuthenticated, isOwner, isAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'username',
  },
  access: {
    read: isAuthenticated,
    create: isAdmin,
    update: isOwner,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Delegate', value: 'delegate' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'karma',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'badges',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'earnedAt',
          type: 'date',
          required: true,
        },
      ],
    },
  ],
}
