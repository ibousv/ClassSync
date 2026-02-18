import type { CollectionAfterChangeHook } from 'payload'
import { triggerEvent } from '@/lib/pusher/server'

export const afterResourceChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation === 'create') {
    await triggerEvent('feed', 'new-resource', {
      id: doc.id,
      type: 'resource',
      title: doc.title,
      author: doc.author,
      timestamp: doc.createdAt,
      module: doc.module,
    })
  }

  return doc
}
