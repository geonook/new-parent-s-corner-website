/**
 * KCISLK ESID Info Hub Database Seeding Script
 * KCISLK ESID Info Hub 資料庫種子資料腳本 - Zeabur 多環境支援
 */

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

/**
 * 預設角色資料 - 三層權限系統
 * Default roles data - Three-tier permission system
 */
const defaultRoles = [
  {
    name: 'admin',
    displayName: 'Administrator',
    description: 'System administrator with full access',
    permissions: ['*'] // Full permissions
  },
  {
    name: 'office_member',
    displayName: 'Office Member',
    description: 'Office staff with comprehensive access to administrative and educational features',
    permissions: [
      'announcements:create',
      'announcements:read',
      'announcements:update',
      'announcements:delete',
      'announcements:publish',
      'events:create',
      'events:read',
      'events:update',
      'events:delete',
      'events:manage',
      'resources:create',
      'resources:read',
      'resources:update',
      'resources:delete',
      'resources:upload',
      'newsletters:read',
      'message_board:read',
      'message_board:reply',
      'office:dashboard',
      'office:resources',
      'office:communication',
      'office:admin_access',
      'parent:dashboard',
      'parent:resources',
      'parent:feedback',
      'user:read',
      'user:update',
      'user:manage_roles',
      'system:settings',
      'system:logs'
    ]
  },
  {
    name: 'viewer',
    displayName: 'Viewer',
    description: 'Basic read-only access to view announcements and events - suitable for new users',
    permissions: [
      'announcements:read',
      'events:read',
      'parent:dashboard',
      'office:dashboard',
      'auth:profile_view',
      'auth:profile_update'
    ]
  }
]

/**
 * 預設年級資料
 * Default grade levels data
 */
const defaultGradeLevels = [
  {
    name: 'Grades 1-2',
    displayName: 'Grades 1-2',
    minGrade: 1,
    maxGrade: 2,
    color: 'from-blue-500 to-blue-600',
    sortOrder: 1
  },
  {
    name: 'Grades 3-4',
    displayName: 'Grades 3-4',
    minGrade: 3,
    maxGrade: 4,
    color: 'from-green-500 to-green-600',
    sortOrder: 2
  },
  {
    name: 'Grades 5-6',
    displayName: 'Grades 5-6',
    minGrade: 5,
    maxGrade: 6,
    color: 'from-purple-500 to-purple-600',
    sortOrder: 3
  }
]

/**
 * 預設資源分類
 * Default resource categories
 */
const defaultResourceCategories = [
  {
    name: 'learning-materials',
    displayName: 'Learning Materials',
    description: 'Educational content and learning resources',
    icon: 'BookOpen',
    color: 'blue',
    sortOrder: 1
  },
  {
    name: 'assignments',
    displayName: 'Assignments',
    description: 'Homework and assignments',
    icon: 'FileText',
    color: 'green',
    sortOrder: 2
  },
  {
    name: 'presentations',
    displayName: 'Presentations',
    description: 'Class presentations and slideshows',
    icon: 'Monitor',
    color: 'purple',
    sortOrder: 3
  },
  {
    name: 'videos',
    displayName: 'Educational Videos',
    description: 'Video content for learning',
    icon: 'Video',
    color: 'red',
    sortOrder: 4
  }
]

/**
 * 預設系統設定
 * Default system settings
 */
const defaultSystemSettings = [
  {
    key: 'site_name',
    value: 'KCISLK ESID Info Hub',
    description: 'Site display name',
    dataType: 'string',
    isPublic: true
  },
  {
    key: 'admin_email',
    value: 'admin@kcislk.ntpc.edu.tw',
    description: 'Administrator email',
    dataType: 'string',
    isPublic: false
  },
  {
    key: 'max_file_size',
    value: '10485760',
    description: 'Maximum file upload size in bytes (10MB)',
    dataType: 'number',
    isPublic: false
  },
  {
    key: 'session_timeout',
    value: '30',
    description: 'Session timeout in minutes',
    dataType: 'number',
    isPublic: false
  },
  {
    key: 'max_login_attempts',
    value: '5',
    description: 'Maximum login attempts before lockout',
    dataType: 'number',
    isPublic: false
  },
  {
    key: 'teacher_hero_image_url',
    value: '/images/teacher-hero-bg.svg',
    description: 'Teachers page hero background image URL',
    dataType: 'string',
    isPublic: true
  },
  {
    key: 'parent_hero_image_url',
    value: '/images/parent-hero-bg.svg',
    description: 'Parents page hero background image URL',
    dataType: 'string',
    isPublic: true
  },
  {
    key: 'hero_image_upload_enabled',
    value: 'true',
    description: 'Enable hero image upload functionality',
    dataType: 'boolean',
    isPublic: false
  },
  {
    key: 'hero_image_max_size',
    value: '5242880',
    description: 'Maximum hero image file size in bytes (5MB)',
    dataType: 'number',
    isPublic: false
  },
  {
    key: 'hero_image_allowed_types',
    value: 'jpg,jpeg,png,webp,svg',
    description: 'Allowed hero image file types',
    dataType: 'string',
    isPublic: false
  }
]

/**
 * 建立預設管理員帳戶
 * Create default admin account
 */
async function createDefaultAdmin() {
  const adminEmail = 'admin@kcislk.ntpc.edu.tw'
  const adminPassword = 'Admin123!' // 正式環境應使用更安全的密碼
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })
  
  if (existingAdmin) {
    console.log('ℹ️  Admin user already exists, skipping creation')
    return existingAdmin
  }
  
  const hashedPassword = await hash(adminPassword, 12)
  
  const adminUser = await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      displayName: 'System Administrator',
      isActive: true,
      emailVerified: true
    }
  })
  
  // 分配管理員角色
  const adminRole = await prisma.role.findUnique({
    where: { name: 'admin' }
  })
  
  if (adminRole) {
    await prisma.userRole.create({
      data: {
        userId: adminUser.id,
        roleId: adminRole.id,
        assignedBy: adminUser.id
      }
    })
  }
  
  console.log(`✅ Created admin user: ${adminEmail}`)
  console.log(`🔑 Default password: ${adminPassword}`)
  console.log('⚠️  Please change the default password after first login')
  
  return adminUser
}

/**
 * 種子資料主函數
 * Main seeding function
 */
async function main() {
  try {
    console.log('🌱 Starting database seeding...')
    
    // 檢查環境
    const environment = process.env.NODE_ENV || 'development'
    console.log(`🌍 Environment: ${environment}`)
    
    // 1. 建立角色
    console.log('👥 Creating roles...')
    for (const roleData of defaultRoles) {
      await prisma.role.upsert({
        where: { name: roleData.name },
        update: {
          displayName: roleData.displayName,
          description: roleData.description,
          permissions: roleData.permissions
        },
        create: roleData
      })
    }
    console.log(`✅ Created ${defaultRoles.length} roles`)
    
    // 2. 建立年級
    console.log('🎓 Creating grade levels...')
    for (const gradeData of defaultGradeLevels) {
      await prisma.gradeLevel.upsert({
        where: { name: gradeData.name },
        update: gradeData,
        create: gradeData
      })
    }
    console.log(`✅ Created ${defaultGradeLevels.length} grade levels`)
    
    // 3. 建立資源分類
    console.log('📚 Creating resource categories...')
    for (const categoryData of defaultResourceCategories) {
      await prisma.resourceCategory.upsert({
        where: { name: categoryData.name },
        update: categoryData,
        create: categoryData
      })
    }
    console.log(`✅ Created ${defaultResourceCategories.length} resource categories`)
    
    // 4. 建立系統設定
    console.log('⚙️  Creating system settings...')
    for (const settingData of defaultSystemSettings) {
      await prisma.systemSetting.upsert({
        where: { key: settingData.key },
        update: {
          value: settingData.value,
          description: settingData.description,
          dataType: settingData.dataType,
          isPublic: settingData.isPublic
        },
        create: settingData
      })
    }
    console.log(`✅ Created ${defaultSystemSettings.length} system settings`)
    
    // 5. 建立預設管理員（所有環境都需要基本管理員）
    console.log('👤 Creating default admin user...')
    await createDefaultAdmin()
    
    // 6. 建立基本公告（所有環境都需要基本內容）
    console.log('📢 Creating basic announcements...')
    
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@kcislk.ntpc.edu.tw' }
    })
    
    if (adminUser) {
      // 檢查是否已有公告，避免重複創建
      const existingAnnouncements = await prisma.announcement.count()
      
      if (existingAnnouncements === 0) {
        const basicAnnouncements = [
          {
            title: 'Welcome to KCISLK ESID Info Hub',
            content: 'Welcome to our parent portal! Here you can access important announcements, events, and resources. This system provides a comprehensive platform for school-parent communication.',
            summary: 'Welcome message for parents and community',
            authorId: adminUser.id,
            targetAudience: 'all',
            priority: 'high',
            status: 'published',
            publishedAt: new Date()
          },
          {
            title: 'Parents\' Corner System Launch',
            content: 'We are excited to announce the launch of our new Parents\' Corner system. This platform will serve as your primary source for school announcements, event information, and educational resources.',
            summary: 'System launch announcement',
            authorId: adminUser.id,
            targetAudience: 'parents',
            priority: 'high',
            status: 'published',
            publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
          },
          {
            title: 'Office Member Resources Available',
            content: 'Office members can now access the resource center with educational materials, administrative tools, and forms. Please explore the admin section for more information.',
            summary: 'Office member resources announcement',
            authorId: adminUser.id,
            targetAudience: 'all',
            priority: 'medium',
            status: 'published',
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
          },
          {
            title: 'Coffee with Principal Sessions',
            content: 'Monthly Coffee with Principal sessions are now available for booking through the Events section. These sessions provide an opportunity for direct communication with school leadership.',
            summary: 'Coffee with Principal information',
            authorId: adminUser.id,
            targetAudience: 'all',
            priority: 'medium',
            status: 'published',
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
          },
          {
            title: 'System Maintenance Schedule',
            content: 'Regular system maintenance will be performed monthly during off-peak hours. Users will be notified in advance of any scheduled downtime.',
            summary: 'Maintenance schedule information',
            authorId: adminUser.id,
            targetAudience: 'all',
            priority: 'low',
            status: 'published',
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
          }
        ]
        
        for (const announcement of basicAnnouncements) {
          await prisma.announcement.create({
            data: announcement
          })
        }
        
        console.log(`✅ Created ${basicAnnouncements.length} basic announcements`)
      } else {
        console.log(`ℹ️  Found ${existingAnnouncements} existing announcements, skipping creation`)
      }
    }
    
    console.log('🎉 Database seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error during database seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// 執行種子資料腳本
main()
  .catch((error) => {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  })