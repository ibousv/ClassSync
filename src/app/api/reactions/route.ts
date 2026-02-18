import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { triggerEvent } from '@/lib/pusher/server'

export async function POST(req: NextRequest) {
  try {
    const { type, targetType, targetId, authorId } = await req.json()

    const payload = await getPayloadClient()

    const reaction = await payload.create({
      collection: 'reactions',
      data: {
        type,
        targetType,
        targetId,
        author: authorId,
      },
    })

    await triggerEvent(`${targetType}-${targetId}`, 'new-reaction', {
      id: reaction.id,
      type: reaction.type,
      author: reaction.author,
    })

    return NextResponse.json(reaction)
  } catch {
    return NextResponse.json(
      { error: 'Failed to add reaction' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const targetType = searchParams.get('targetType')
    const targetId = searchParams.get('targetId')

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: 'Target type and ID required' },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    const reactions = await payload.find({
      collection: 'reactions',
      where: {
        targetType: { equals: targetType },
        targetId: { equals: targetId },
      },
    })

    return NextResponse.json(reactions)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch reactions' },
      { status: 500 }
    )
  }
}
