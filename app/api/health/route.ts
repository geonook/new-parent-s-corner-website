import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-readonly'

/**
 * GET /api/health
 * @description 健康檢查端點 - 檢查服務和資料庫狀態
 */
export async function GET() {
  try {
    // 檢查資料庫連接
    await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json({
      status: 'healthy',
      service: 'kcislk-parents-corner',
      database: 'connected',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        service: 'kcislk-parents-corner',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
        error: process.env.NODE_ENV === 'development' ? String(error) : 'Database connection failed'
      },
      { status: 503 }
    )
  }
}