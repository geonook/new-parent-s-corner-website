import { PrismaClient } from '@prisma/client'

/**
 * Prisma Client for Parents' Corner - Read-only Access
 * @description Simplified database client for public display service
 * @author Claude Code | Generated for KCISLK Parents' Corner
 */

declare global {
  // eslint-disable-next-line no-var
  var __parentsCornerPrisma: PrismaClient | undefined
}

let prismaParentsCorner: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prismaParentsCorner = new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })
} else {
  if (!global.__parentsCornerPrisma) {
    global.__parentsCornerPrisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    })
  }
  prismaParentsCorner = global.__parentsCornerPrisma
}

/**
 * Get public announcements for parents
 */
export async function getPublicAnnouncements(limit: number = 10) {
  return await prismaParentsCorner.announcement.findMany({
    where: {
      status: 'published',
      targetAudience: 'parents',
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      createdAt: true,
      priority: true,
      category: true
    },
    orderBy: [
      { priority: 'desc' },
      { publishedAt: 'desc' },
      { createdAt: 'desc' }
    ],
    take: limit
  })
}

/**
 * Get public events for parents
 */
export async function getPublicEvents(limit: number = 10) {
  return await prismaParentsCorner.event.findMany({
    where: {
      status: 'published',
      targetAudience: 'parents',
      OR: [
        { endDate: { gte: new Date() } },
        { endDate: null }
      ]
    },
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      location: true,
      category: true,
      createdAt: true
    },
    orderBy: [
      { startDate: 'asc' }
    ],
    take: limit
  })
}

/**
 * Get public resources for parents
 */
export async function getPublicResources(limit: number = 10) {
  return await prismaParentsCorner.resource.findMany({
    where: {
      status: 'published',
      targetAudience: 'parents'
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      fileUrl: true,
      fileType: true,
      createdAt: true
    },
    orderBy: [
      { createdAt: 'desc' }
    ],
    take: limit
  })
}

/**
 * Get latest newsletter
 */
export async function getLatestNewsletter() {
  return await prismaParentsCorner.newsletter.findFirst({
    where: {
      status: 'published',
      targetAudience: 'parents'
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileUrl: true,
      publishedAt: true,
      createdAt: true
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })
}

export { prismaParentsCorner as prisma }