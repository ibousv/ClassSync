import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Modules } from './collections/Modules'
import { Resources } from './collections/Resources'
import { Homework } from './collections/Homework'
import { Channels } from './collections/Channels'
import { Messages } from './collections/Messages'
import { Comments } from './collections/Comments'
import { Reactions } from './collections/Reactions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Modules,
    Resources,
    Homework,
    Channels,
    Messages,
    Comments,
    Reactions,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../types/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
