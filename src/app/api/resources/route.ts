import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const moduleId = searchParams.get('moduleId')

    const payload = await getPayloadClient()

    const where = moduleId ? { module: { equals: moduleId } } : {}

    const resources = await payload.find({
      collection: 'resources',
      where,
      sort: '-createdAt',
      limit: 50,
    })

    return NextResponse.json(resources)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}
