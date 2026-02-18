import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'all'
    const limit = parseInt(searchParams.get('limit') || '20')

    const payload = await getPayloadClient()

    const [resources, homework, comments] = await Promise.all([
      filter === 'all' || filter === 'resource'
        ? payload.find({
            collection: 'resources',
            sort: '-createdAt',
            limit: filter === 'resource' ? limit : 10,
          })
        : { docs: [] },
      filter === 'all' || filter === 'homework'
        ? payload.find({
            collection: 'homework',
            sort: '-createdAt',
            limit: filter === 'homework' ? limit : 10,
          })
        : { docs: [] },
      filter === 'all'
        ? payload.find({
            collection: 'comments',
            sort: '-createdAt',
            limit: 10,
          })
        : { docs: [] },
    ])

    const feed = [
      ...resources.docs.map((doc: any) => ({
        id: doc.id,
        type: 'resource',
        title: doc.title,
        author: doc.author,
        timestamp: doc.createdAt,
        module: doc.module,
      })),
      ...homework.docs.map((doc: any) => ({
        id: doc.id,
        type: 'homework',
        title: doc.title,
        author: 'System',
        timestamp: doc.createdAt,
        module: doc.module,
      })),
      ...comments.docs.map((doc: any) => ({
        id: doc.id,
        type: 'comment',
        title: `New comment by ${doc.author}`,
        author: doc.author,
        timestamp: doc.createdAt,
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json(feed.slice(0, limit))
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
