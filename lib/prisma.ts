/**
 * Prisma Client Configuration for Zeabur Multi-Environment Deployment
 * KCISLK ESID Info Hub - Zeabur Multi-Environment Cloud Database Configuration
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Check if it's build time
 * Check if it's build time
 */
function isBuildTime(): boolean {
  return process.env.NODE_ENV !== 'test' && (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.npm_lifecycle_event === 'build' ||
    process.argv.includes('build') ||
    process.env.CI === 'true'
  )
}

/**
 * Get safe database URL for build time
 * Get safe database URL for build time
 */
function getSafeDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL
  
  // During build time, if DATABASE_URL is missing or placeholder, provide valid default
  if (isBuildTime() && (!dbUrl || dbUrl.includes('placeholder'))) {
    console.log('🔧 Build time detected - using placeholder database URL for Prisma')
    return 'postgresql://build:build@localhost:5432/build'
  }
  
  return dbUrl || 'postgresql://localhost:5432/default'
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: getSafeDatabaseUrl()
    }
  },
  // Performance optimizations
  errorFormat: 'minimal',
  transactionOptions: {
    maxWait: 5000, // 5 seconds
    timeout: 10000, // 10 seconds
    isolationLevel: 'ReadCommitted'
  }
})

// Prevent duplicate connections during hot reload in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

/**
 * Environment check and database connection validation
 * Environment check and database connection validation
 */
export async function validateDatabaseConnection() {
  try {
    const startTime = performance.now()
    await prisma.$connect()
    const connectionTime = performance.now() - startTime
    
    // Log current environment and database connection status
    const environment = process.env.NODE_ENV || 'development'
    const dbUrl = process.env.DATABASE_URL?.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') || 'Not configured'
    
    console.log(`✅ Database connected successfully (${connectionTime.toFixed(2)}ms)`)
    console.log(`🌍 Environment: ${environment}`)
    console.log(`🗄️  Database: ${dbUrl}`)
    
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

/**
 * Perform database health check with performance metrics
 * Perform database health check with performance metrics
 */
export async function performHealthCheck() {
  const startTime = performance.now()
  
  try {
    // Test basic query performance
    const [userCount, eventCount, resourceCount] = await Promise.all([
      prisma.user.count(),
      prisma.event.count(),
      prisma.resource.count()
    ])
    
    const queryTime = performance.now() - startTime
    
    const healthData = {
      status: 'healthy',
      connectionTime: queryTime,
      counts: {
        users: userCount,
        events: eventCount,
        resources: resourceCount
      },
      timestamp: new Date().toISOString()
    }
    
    // Alert if queries are slow
    if (queryTime > 100) {
      console.warn(`⚠️ Database health check slow: ${queryTime.toFixed(2)}ms`)
    }
    
    return healthData
  } catch (error) {
    console.error('❌ Database health check failed:', error)
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * Query performance monitoring middleware
 * Query performance monitoring middleware
 */
export function setupQueryMonitoring() {
  if (process.env.NODE_ENV === 'development') {
    prisma.$use(async (params, next) => {
      const before = performance.now()
      const result = await next(params)
      const after = performance.now()
      const duration = after - before
      
      // Log slow queries (>50ms)
      if (duration > 50) {
        console.warn(
          `🐌 Slow Query: ${params.model}.${params.action} took ${duration.toFixed(2)}ms`
        )
      }
      
      // Log very slow queries (>200ms) with details
      if (duration > 200) {
        console.error(
          `🚨 Very Slow Query: ${params.model}.${params.action}`,
          `Duration: ${duration.toFixed(2)}ms`,
          `Args:`, params.args
        )
      }
      
      return result
    })
  }
}

/**
 * Gracefully disconnect from the database
 * Gracefully disconnect from the database
 */
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect()
    console.log('🔌 Database disconnected successfully')
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error)
  }
}

// Automatically disconnect on program exit
process.on('beforeExit', async () => {
  await disconnectDatabase()
})

// Initialize query monitoring in development
if (process.env.NODE_ENV === 'development') {
  setupQueryMonitoring()
}

// Connection pool optimization
if (process.env.NODE_ENV === 'production' && !isBuildTime()) {
  // Warm up the connection pool - but only in runtime, not during build
  prisma.$connect().catch(console.error)
}

export default prisma