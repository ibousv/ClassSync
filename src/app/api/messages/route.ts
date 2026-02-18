import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { triggerEvent } from '@/lib/pusher/server'

export async function POST(req: NextRequest) {
  try {
    const { content, channelId, authorId } = await req.json()

    const payload = await getPayloadClient()

    const message = await payload.create({
      collection: 'messages',
      data: {
        content,
        channel: channelId,
        author: authorId,
      },
    })

    await triggerEvent(`channel-${channelId}`, 'new-message', {
      id: message.id,
      content: message.content,
      author: message.author,
      createdAt: message.createdAt,
    })

    return NextResponse.json(message)
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const channelId = searchParams.get('channelId')

    if (!channelId) {
      return NextResponse.json(
        { error: 'Channel ID required' },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    const messages = await payload.find({
      collection: 'messages',
      where: {
        channel: {
          equals: channelId,
        },
      },
      sort: '-createdAt',
      limit: 50,
    })

    return NextResponse.json(messages)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
