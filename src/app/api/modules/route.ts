import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(_req: NextRequest) {
  try {
    const payload = await getPayloadClient()

    const modules = await payload.find({
      collection: 'modules',
      sort: 'name',
      limit: 50,
    })

    return NextResponse.json(modules)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch modules' },
      { status: 500 }
    )
  }
}
