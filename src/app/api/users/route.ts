import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(_req: NextRequest) {
  try {
    const payload = await getPayloadClient()

    const users = await payload.find({
      collection: 'users',
      sort: 'username',
      limit: 50,
    })

    return NextResponse.json(users)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
