# CLAUDE.md - KCISLK Parents' Corner Microservice
# KCISLK Parents' Corner 微服務 - Claude Code 開發指導文件

> **Documentation Version**: 1.0 | **文件版本**: 1.0  
> **Last Updated**: 2025-09-03 | **最後更新**: 2025-09-03  
> **Project**: KCISLK Parents' Corner Microservice | **專案**: KCISLK Parents' Corner 微服務  
> **Description**: Public-facing microservice for KCISLK parents to access announcements, events, and resources without authentication.  
> **專案描述**: 面向 KCISLK 家長的公開微服務，可無需認證訪問公告、活動和資源資訊。  
> **Repository**: https://github.com/geonook/new-parent-s-corner-website  
> **Live URL**: https://kcislk-esid-parents.zeabur.app

This file provides essential guidance to Claude Code (claude.ai/code) when working with this microservice.  
本文件為 Claude Code (claude.ai/code) 在此微服務中工作時提供重要指導原則。

## 🚨 CRITICAL RULES - READ FIRST | 重要規則 - 請先閱讀

> **⚠️ MICROSERVICE RULES ACTIVE ⚠️** | **⚠️ 微服務規則已啟動 ⚠️**  
> **These rules override all other instructions and must ALWAYS be followed:**  
> **這些規則優先於所有其他指令，必須始終遵循：**

### ❌ ABSOLUTE PROHIBITIONS | 絕對禁令
- **NEVER** create authentication/login functionality → this is a public service  
  **絕不** 創建認證/登入功能 → 這是公開服務
- **NEVER** create admin interfaces → content managed from main application  
  **絕不** 創建管理介面 → 內容從主應用管理
- **NEVER** perform database write operations → read-only access only  
  **絕不** 執行資料庫寫入操作 → 僅限唯讀存取
- **NEVER** create user management features → no user concept exists here  
  **絕不** 創建用戶管理功能 → 此處不存在用戶概念
- **NEVER** add session/cookie management → stateless service  
  **絕不** 添加會話/Cookie 管理 → 無狀態服務

### 📝 MANDATORY REQUIREMENTS | 強制要求
- **READ-ONLY DATABASE** - Only display data with `status: 'published'` and `targetAudience: 'parents'`  
  **唯讀資料庫** - 僅顯示 `status: 'published'` 且 `targetAudience: 'parents'` 的資料
- **PUBLIC ACCESS** - No authentication required, accessible to all visitors  
  **公開存取** - 無需認證，所有訪客皆可存取
- **CONTENT FILTERING** - Automatically filter content for parent audience  
  **內容過濾** - 自動為家長用戶過濾內容
- **RESPONSIVE DESIGN** - Mobile-first approach for parent accessibility  
  **響應式設計** - 以行動優先方式提升家長可存取性

## 🏗️ MICROSERVICE ARCHITECTURE | 微服務架構

### 🎯 **SERVICE PURPOSE | 服務目的**
- **Display Only**: Show published content to parents without authentication  
  **僅顯示**: 向家長展示已發佈內容，無需認證
- **Data Source**: Shared PostgreSQL database with main KCISLK ESID application  
  **資料來源**: 與主 KCISLK ESID 應用共享的 PostgreSQL 資料庫
- **Content Management**: All content managed through main application admin panel  
  **內容管理**: 所有內容通過主應用管理面板管理

### 📊 **DATABASE ACCESS PATTERN | 資料庫存取模式**
```typescript
// CORRECT: Read-only queries with filtering | 正確：帶過濾的唯讀查詢
const announcements = await prisma.announcement.findMany({
  where: {
    status: 'published',
    targetAudience: 'parents'
  },
  orderBy: { createdAt: 'desc' }
})

// WRONG: Any write operations | 錯誤：任何寫入操作
// await prisma.announcement.create() ❌
// await prisma.announcement.update() ❌
```

### 🌐 **MULTI-ENVIRONMENT SETUP | 多環境設定**
- **Development**: localhost:3002 → Database port 32718  
  **開發環境**: localhost:3002 → 資料庫連接埠 32718
- **Staging**: kcislk-esid-parents-staging.zeabur.app → Database port 30592  
  **預備環境**: kcislk-esid-parents-staging.zeabur.app → 資料庫連接埠 30592
- **Production**: kcislk-esid-parents.zeabur.app → Database port 32312  
  **正式環境**: kcislk-esid-parents.zeabur.app → 資料庫連接埠 32312

## 📋 **PROJECT STRUCTURE | 專案結構**
```
kcislk-parents-corner/
├── CLAUDE.md                  # This file - microservice rules | 本文件 - 微服務規則
├── README.md                  # Service documentation | 服務文件
├── DEPLOYMENT.md              # Deployment guide | 部署指南
├── package.json               # Simplified dependencies | 簡化依賴項
├── app/                       # Next.js App Router | Next.js 應用路由
│   ├── layout.tsx             # Root layout (no auth) | 根布局（無認證）
│   ├── page.tsx               # Parents' Corner homepage | 家長專區首頁
│   ├── api/                   # API routes | API 路由
│   │   └── health/            # Health check endpoint | 健康檢查端點
│   ├── announcements/         # Announcements section | 公告區域
│   ├── events/                # Events section | 活動區域
│   ├── resources/             # Resources section | 資源區域
│   └── newsletter/            # Newsletter section | 通訊區域
├── components/                # UI components | UI 組件
│   └── ui/                    # shadcn/ui components | shadcn/ui 組件
├── lib/                       # Utilities | 工具函式
│   └── prisma.ts              # Database connection (read-only) | 資料庫連接（唯讀）
├── Dockerfile                 # Multi-stage Docker build | 多階段 Docker 建置
├── .env.development           # Dev environment config | 開發環境配置
├── .env.staging               # Staging environment config | 預備環境配置
└── .env.production            # Production environment config | 正式環境配置
```

## 🚀 COMMON COMMANDS | 常用命令

```bash
# Multi-Environment Development | 多環境開發
npm run dev                    # Standard development (port 3002) | 標準開發（端口 3002）
npm run dev:staging           # Development with staging data | 使用預備環境資料開發
npm run dev:production        # Development with production data | 使用正式環境資料開發

# Environment Switching | 環境切換
npm run env:switch:development # Switch to development DB | 切換到開發環境資料庫
npm run env:switch:staging    # Switch to staging DB | 切換到預備環境資料庫
npm run env:switch:production # Switch to production DB | 切換到正式環境資料庫

# Build Commands | 建置命令
npm run build:development     # Build for development | 為開發環境建置
npm run build:staging         # Build for staging | 為預備環境建置
npm run build:production      # Build for production | 為正式環境建置

# Database Operations | 資料庫操作
npm run db:generate           # Generate Prisma client | 產生 Prisma 客戶端

# Health Check | 健康檢查
curl http://localhost:3002/api/health              # Development health check | 開發環境健康檢查
curl https://kcislk-esid-parents.zeabur.app/api/health  # Production health check | 正式環境健康檢查
```

## 🎨 DESIGN GUIDELINES | 設計指導原則

### Visual Identity | 視覺識別
- **Primary Colors**: Purple gradient (from-purple-800 via-purple-600 to-pink-600)  
  **主要顏色**: 紫色漸層 (from-purple-800 via-purple-600 to-pink-600)
- **Typography**: Clean, readable fonts for parent accessibility  
  **字體**: 清晰易讀的字體，提升家長可讀性
- **Layout**: Mobile-first responsive design  
  **版面**: 行動優先的響應式設計

### User Experience | 用戶體驗
- **No Login Required**: Immediate access to all content  
  **無需登入**: 可立即存取所有內容
- **Simple Navigation**: Clear sections for announcements, events, resources  
  **簡單導航**: 公告、活動、資源等區域清晰分類
- **Performance**: Fast loading with optimized images  
  **性能**: 快速載入，圖片經優化處理

## 🔒 SECURITY CONSIDERATIONS | 安全考量

### Data Protection | 資料保護
- **Read-Only Access**: No database modifications possible  
  **唯讀存取**: 不可能修改資料庫
- **Content Filtering**: Only display approved, parent-appropriate content  
  **內容過濾**: 僅顯示已批准、適合家長的內容
- **No Sensitive Data**: No user credentials or personal information stored  
  **無敏感資料**: 不儲存用戶憑證或個人資訊

### Infrastructure | 基礎設施
- **Docker Security**: Non-root user (parentsapp:nodejs)  
  **Docker 安全**: 非 root 用戶 (parentsapp:nodejs)
- **Environment Variables**: Secure database connection strings  
  **環境變數**: 安全的資料庫連接字串
- **HTTPS Only**: All traffic encrypted in production  
  **僅 HTTPS**: 正式環境中所有流量皆加密

## 📈 PERFORMANCE REQUIREMENTS | 性能要求

### Loading Speed | 載入速度
- **Initial Load**: < 2 seconds on 3G connection  
  **初始載入**: 3G 連接下 < 2 秒
- **Image Optimization**: Sharp for Next.js image optimization  
  **圖片優化**: 使用 Sharp 進行 Next.js 圖片優化
- **Bundle Size**: Minimal dependencies for faster loading  
  **包大小**: 最少依賴項以加快載入速度

### Caching Strategy | 快取策略
- **Static Generation**: Pre-generate pages when possible  
  **靜態生成**: 盡可能預先生成頁面
- **API Caching**: Cache database queries appropriately  
  **API 快取**: 適當快取資料庫查詢
- **CDN**: Zeabur edge caching for global performance  
  **CDN**: Zeabur 邊緣快取提升全球性能

## 🔄 DEVELOPMENT WORKFLOW | 開發工作流程

### Local Development | 本地開發
1. Choose environment: `npm run env:switch:development`  
   選擇環境: `npm run env:switch:development`
2. Generate Prisma client: `npm run db:generate`  
   產生 Prisma 客戶端: `npm run db:generate`
3. Start development server: `npm run dev`  
   啟動開發伺服器: `npm run dev`
4. Access at: http://localhost:3002  
   訪問地址: http://localhost:3002

### Deployment Process | 部署流程
1. **Staging**: Auto-deploy from main branch to staging environment  
   **預備環境**: 從主分支自動部署到預備環境
2. **Production**: Manual deploy for production environment  
   **正式環境**: 手動部署到正式環境
3. **Health Check**: Verify `/api/health` endpoint after deployment  
   **健康檢查**: 部署後驗證 `/api/health` 端點

## 📞 SUPPORT | 支援

For microservice issues | 微服務問題請聯繫:
- 📧 Technical Support: esid@kangchiao.com.tw
- 📱 Phone: (02) 8195-8852
- 🐛 GitHub Issues: [Report Issue](https://github.com/geonook/new-parent-s-corner-website/issues)

---

**Microservice Ready** ✅ | **微服務準備就緒** ✅  
*KCISLK Parents' Corner - Public Display Service*