# KCISLK Parents' Corner

> **🌍 Public Display Service for KCISLK Elementary School International Department**  
> **公開展示服務 - 康橋國際學校小學部國際處家長專區**

## 🎯 Service Overview | 服務概述

KCISLK Parents' Corner is a **public-facing display website** designed for parents of KCISLK Elementary School International Department students. This service provides easy access to school announcements, events, resources, and newsletters without requiring any login or authentication.

KCISLK Parents' Corner 是一個**對外公開的展示網站**，專為康橋國際學校小學部國際處學生家長設計。此服務提供學校公告、活動、資源和電子報的便捷存取，無需任何登入或認證。

## 🏗️ Architecture | 架構設計

### Microservice Architecture | 微服務架構
```
Zeabur Project: KCISLK ESID
├── 🏢 es-international-department (Internal Management)
│   ├── URL: https://kcislk-esid.zeabur.app
│   └── Port: 3001 (Development)
├── 🌍 parents-corner (Public Service) ← This Repository
│   ├── URL: https://kcislk-esid-parents.zeabur.app
│   ├── Port: 3002 (Development)
│   └── GitHub: https://github.com/geonook/new-parent-s-corner-website
└── 🗄️ Shared PostgreSQL Database
```

### Key Features | 主要功能
- ✅ **Public Access** - No authentication required | 公開存取 - 無需認證
- ✅ **Read-Only Service** - Display only, no data modification | 唯讀服務 - 僅展示，不修改資料
- ✅ **Mobile Optimized** - Responsive design for parents | 行動優化 - 為家長設計的響應式介面
- ✅ **SEO Friendly** - Optimized for search engines | SEO 友好 - 搜尋引擎優化
- ✅ **Fast Loading** - Lightweight and optimized | 快速載入 - 輕量化優化

## 🚀 Quick Start | 快速開始

### Prerequisites | 前置需求
- Node.js 18+ 
- Access to shared PostgreSQL database | 共享 PostgreSQL 資料庫存取權限

### Development | 開發環境

```bash
# 1. Install dependencies | 安裝依賴
npm install

# 2. Copy environment variables | 複製環境變數
cp .env.example .env.local

# 3. Configure database connection | 配置資料庫連接
# Edit .env.local with your database URL
DATABASE_URL="postgresql://username:password@host:port/database"

# 4. Generate Prisma client | 生成 Prisma 客戶端
npm run db:generate

# 5. Start development server | 啟動開發伺服器
npm run dev
```

Visit: http://localhost:3002

### Production Build | 生產建置

```bash
# Build for production | 生產環境建置
npm run build

# Start production server | 啟動生產伺服器
npm run start
```

## 📡 API Endpoints | API 端點

### Public API Routes | 公開 API 路由
- `GET /api/health` - Service health check | 服務健康檢查
- `GET /api/announcements` - Public announcements | 公開公告
- `GET /api/events` - Upcoming events | 即將到來的活動
- `GET /api/resources` - Educational resources | 教育資源
- `GET /api/newsletter` - Latest newsletter | 最新電子報

### Data Isolation | 資料隔離
All API endpoints only return data marked as:
所有 API 端點僅返回標記為以下條件的資料：
- `status: 'published'` - Published content only | 僅已發布內容
- `targetAudience: 'parents'` - Parents-specific content | 家長專用內容
- `isPublic: true` - Public visibility | 公開可見

## 🐳 Docker Deployment | Docker 部署

### Local Docker Build | 本地 Docker 建置
```bash
# Build lightweight Docker image | 建置輕量 Docker 映像
docker build -t kcislk-parents-corner .

# Run container | 運行容器
docker run -p 8080:8080 -e DATABASE_URL="your_db_url" kcislk-parents-corner
```

### Zeabur Deployment | Zeabur 部署
1. **Create New Service** | 建立新服務
   - Repository: `https://github.com/geonook/new-parent-s-corner-website` | GitHub 儲存庫
   - Service name: `parents-corner` | 服務名稱
   - Set domain: `kcislk-esid-parents.zeabur.app` | 設定域名

2. **Environment Variables** | 環境變數
   ```env
   DATABASE_URL=postgresql://shared_user:password@shared-db.zeabur.com:5432/kcislk_esid
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://kcislk-esid-parents.zeabur.app
   ```

3. **Auto Deploy** | 自動部署
   - Push to main branch triggers deployment | 推送到 main 分支觸發部署
   - Docker builds automatically | Docker 自動建置

## 🔧 Development Scripts | 開發腳本

```bash
npm run dev          # Start development server (port 3002)
npm run build        # Build for production
npm run start        # Start production server (port 8080)
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run db:generate  # Generate Prisma client

# Zeabur specific scripts | Zeabur 專用腳本
npm run zeabur:build   # Zeabur build command
npm run zeabur:start   # Zeabur start command
```

## 📁 Project Structure | 專案結構

```
kcislk-parents-corner/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (read-only)
│   ├── announcements/     # Announcements page
│   ├── events/           # Events page
│   ├── resources/        # Resources page
│   └── newsletter/       # Newsletter page
├── components/ui/         # UI components (shadcn/ui)
├── lib/
│   └── prisma-readonly.ts # Read-only database client
├── prisma/               # Database schema (shared)
├── Dockerfile            # Lightweight container config
└── package.json          # Simplified dependencies
```

## 🔒 Security Features | 安全功能

- ✅ **No Authentication** - Reduces attack surface | 無認證系統 - 減少攻擊面
- ✅ **Read-Only Access** - Cannot modify data | 唯讀存取 - 無法修改資料
- ✅ **Data Filtering** - Only public content | 資料過濾 - 僅公開內容
- ✅ **Security Headers** - OWASP recommended headers | 安全標頭 - OWASP 建議標頭
- ✅ **Non-Root Container** - Docker security best practices | 非 Root 容器 - Docker 安全最佳實務

## 🔗 Related Services | 相關服務

- **Main Admin System**: https://kcislk-esid.zeabur.app | 主要管理系統
- **Parents' Corner**: https://kcislk-esid-parents.zeabur.app | 家長專區 (此服務)

## 📞 Support | 支援

For technical support or questions about this service:
如需技術支援或對此服務有疑問：

- 📧 Email: esid@kangchiao.com.tw
- 📱 Phone: (02) 8195-8852
- 🐛 Issues: [GitHub Issues](https://github.com/geonook/new-parent-s-corner-website/issues)

---

## 🐞 Known Issues | 已知問題

- **Missing placeholder.svg**: The homepage references `/placeholder.svg` which doesn't exist. This causes a 404 error but doesn't affect functionality. | 首頁引用的 `/placeholder.svg` 不存在，會產生 404 錯誤但不影響功能。
- **No public directory**: The public directory needs to be created for static assets. | 需要創建 public 目錄來存放靜態資源。

## 📌 Current Status | 當前狀態

- **Development**: ✅ Running on http://localhost:3002 | 開發環境運行於 http://localhost:3002
- **GitHub**: ✅ Pushed to https://github.com/geonook/new-parent-s-corner-website | 已推送至 GitHub
- **Zeabur**: ⏳ Ready for deployment | 準備部署

---

**Made with ❤️ for KCISLK families**  
**為康橋家庭用心打造**