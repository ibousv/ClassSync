import type { CollectionAfterChangeHook } from 'payload'
import { triggerEvent } from '@/lib/pusher/server'

export const afterHomeworkChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation === 'create') {
    await triggerEvent('feed', 'new-homework', {
      id: doc.id,
      type: 'homework',
      title: doc.title,
      timestamp: doc.createdAt,
      module: doc.module,
      dueDate: doc.dueDate,
    })
  }

  return doc
}
