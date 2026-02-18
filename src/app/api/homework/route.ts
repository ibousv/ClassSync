import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const moduleId = searchParams.get('moduleId')

    const payload = await getPayloadClient()

    const where = moduleId ? { module: { equals: moduleId } } : {}

    const homework = await payload.find({
      collection: 'homework',
      where,
      sort: 'dueDate',
      limit: 50,
    })

    return NextResponse.json(homework)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch homework' },
      { status: 500 }
    )
  }
}
