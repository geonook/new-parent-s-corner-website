import { NextRequest, NextResponse } from 'next/server'
import { getPublicAnnouncements } from '@/lib/prisma-readonly'

/**
 * GET /api/announcements
 * @description 取得家長專區公開公告
 * @param request NextRequest
 * @returns 公告列表
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    
    const announcements = await getPublicAnnouncements(limit)
    
    return NextResponse.json({
      success: true,
      data: announcements,
      count: announcements.length
    })
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch announcements',
        message: process.env.NODE_ENV === 'development' ? String(error) : 'Internal server error'
      },
      { status: 500 }
    )
  }
}