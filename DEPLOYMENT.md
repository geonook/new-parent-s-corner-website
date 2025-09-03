# KCISLK Parents' Corner - Deployment Guide
# KCISLK 家長專區 - 部署指南

> **Last Updated | 最後更新**: 2025-09-03  
> **Service Type | 服務類型**: Public-facing Microservice | 公開展示微服務

## 🏗️ Microservice Architecture Overview | 微服務架構概覽

```mermaid
graph TD
    A[Zeabur Project: KCISLK ESID] --> B[Main App - Admin System]
    A --> C[Parents' Corner - Public Service]
    A --> D[Shared PostgreSQL Database]
    
    B --> |Port 3001 Dev| B1[https://kcislk-esid.zeabur.app]
    C --> |Port 3002 Dev| C1[https://kcislk-esid-parents.zeabur.app]
    
    D --> B
    D --> C
```

## 📍 Service Details | 服務詳情

| Service | Repository | Development Port | Staging URL | Production URL |
|---------|------------|------------------|-------------|----------------|
| **Main Application** | [es-international-department](https://github.com/geonook/es-international-department) | 3001 | https://kcislk-esid-staging.zeabur.app | https://kcislk-esid.zeabur.app |
| **Parents' Corner** | [new-parent-s-corner-website](https://github.com/geonook/new-parent-s-corner-website) | 3002 | https://kcislk-esid-parents-staging.zeabur.app | https://kcislk-esid-parents.zeabur.app |

## 🌍 Multi-Environment Architecture | 多環境架構

### Environment Strategy | 環境策略

```mermaid
graph TB
    A[Developer] --> B[Development Environment]
    B --> C[Staging Environment]
    C --> D[Production Environment]
    
    B --> |Port 3002| B1[localhost:3002]
    C --> |Auto Deploy| C1[kcislk-esid-parents-staging.zeabur.app]
    D --> |Manual Deploy| D1[kcislk-esid-parents.zeabur.app]
```

### Database Configuration per Environment | 各環境資料庫配置

| Environment | Database Port | Usage | Auto-Deploy |
|-------------|---------------|-------|-------------|
| **Development** | 32718 | Local development & testing | ❌ |
| **Staging** | 30592 | Pre-production validation | ✅ |
| **Production** | 32312 | Live public service | ❌ (Manual) |

## 🚀 Zeabur Deployment Steps | Zeabur 部署步驟

### Step 1: Create Services for Each Environment | 步驟 1：為各環境創建服務

#### Staging Service | 預備環境服務
1. **Login to Zeabur Console** | 登入 Zeabur 控制台
2. **Add Staging Service** | 新增預備環境服務
   ```
   Service Name: parents-corner-staging
   Service Type: Git
   Repository: https://github.com/geonook/new-parent-s-corner-website
   Branch: main (or develop branch)
   Auto Deploy: Enable
   ```

#### Production Service | 正式環境服務  
1. **Add Production Service** | 新增正式環境服務
   ```
   Service Name: parents-corner
   Service Type: Git
   Repository: https://github.com/geonook/new-parent-s-corner-website
   Branch: main
   Auto Deploy: Disable (Manual control)
   ```

2. **Configure Build Settings** | 配置建置設定
   ```
   Build Command: Automatic (Docker detected)
   Port: 8080 (Both environments)
   ```

### Step 2: Environment Variables | 步驟 2：環境變數

Configure environment variables for each service | 為各服務配置環境變數:

#### Staging Environment Variables | 預備環境變數
```env
# Database Connection (Staging)
DATABASE_URL=postgresql://[username]:[password]@tpe1.clusters.zeabur.com:30592/zeabur

# Application Settings
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://kcislk-esid-parents-staging.zeabur.app

# Staging Specific
PRISMA_LOG_LEVEL=warn
NEXT_TELEMETRY_DISABLED=1
```

#### Production Environment Variables | 正式環境變數
```env
# Database Connection (Production)  
DATABASE_URL=postgresql://[username]:[password]@tpe1.clusters.zeabur.com:32312/zeabur

# Application Settings
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://kcislk-esid-parents.zeabur.app

# Production Specific
PRISMA_LOG_LEVEL=error
NEXT_TELEMETRY_DISABLED=1
```

### Step 3: Domain Configuration | 步驟 3：域名配置

#### Staging Domain | 預備環境域名
```
Service: parents-corner-staging
Domain: kcislk-esid-parents-staging.zeabur.app
SSL: Auto-provisioned
```

#### Production Domain | 正式環境域名
```
Service: parents-corner
Domain: kcislk-esid-parents.zeabur.app  
SSL: Auto-provisioned
```

### Step 4: Database Connection | 步驟 4：資料庫連接

The Parents' Corner service shares the same PostgreSQL database with the main application.
Parents' Corner 服務與主應用共享同一個 PostgreSQL 資料庫。

**Data Isolation Strategy | 資料隔離策略**:
- Only displays data with `status: 'published'` | 僅顯示 `status: 'published'` 的資料
- Filters for `targetAudience: 'parents'` | 過濾 `targetAudience: 'parents'` 的內容
- Read-only access (no write operations) | 唯讀存取（無寫入操作）

## 🐳 Docker Configuration | Docker 配置

The service uses a multi-stage Dockerfile for optimal performance:
服務使用多階段 Dockerfile 以獲得最佳性能：

```dockerfile
# Key Features | 主要特點
- Node.js 22-slim base image
- Non-root user (parentsapp:nodejs)
- Health check endpoint (/api/health)
- Lightweight production build (~200MB)
```

## 🔄 Deployment Workflow | 部署工作流程

### Automatic Deployment | 自動部署

1. **Push to GitHub** | 推送到 GitHub
   ```bash
   git add .
   git commit -m "feat: update content"
   git push origin main
   ```

2. **Zeabur Auto-Deploy** | Zeabur 自動部署
   - Detects push to main branch | 檢測到 main 分支推送
   - Builds Docker image | 建置 Docker 映像
   - Deploys to production | 部署到生產環境
   - Zero-downtime deployment | 零停機時間部署

### Manual Deployment | 手動部署

In Zeabur console | 在 Zeabur 控制台:
1. Navigate to `parents-corner` service | 導航到 `parents-corner` 服務
2. Click "Redeploy" button | 點擊 "重新部署" 按鈕
3. Monitor deployment logs | 監控部署日誌

## 📊 Health Monitoring | 健康監控

### Health Check Endpoint | 健康檢查端點

```bash
# Development
curl http://localhost:3002/api/health

# Production
curl https://kcislk-esid-parents.zeabur.app/api/health
```

Expected Response | 預期響應:
```json
{
  "status": "healthy",
  "service": "kcislk-parents-corner",
  "database": "connected",
  "timestamp": "2025-09-03T12:00:00.000Z"
}
```

## 🐞 Troubleshooting | 故障排除

### Common Issues | 常見問題

1. **Database Connection Failed** | 資料庫連接失敗
   - Check DATABASE_URL environment variable | 檢查 DATABASE_URL 環境變數
   - Verify PostgreSQL service is running | 驗證 PostgreSQL 服務正在運行
   - Check network connectivity | 檢查網絡連接

2. **Build Failed** | 建置失敗
   - Check Node.js version compatibility | 檢查 Node.js 版本兼容性
   - Verify all dependencies in package.json | 驗證 package.json 中的所有依賴
   - Review Zeabur build logs | 查看 Zeabur 建置日誌

3. **404 Errors for Static Assets** | 靜態資源 404 錯誤
   - Known issue: Missing public directory | 已知問題：缺少 public 目錄
   - Solution: Create public folder and add assets | 解決方案：創建 public 資料夾並添加資源

## 🔄 Local Environment Management | 本地環境管理

### Quick Environment Switching | 快速環境切換

```bash
# Switch to Development
npm run env:switch:development

# Switch to Staging  
npm run env:switch:staging

# Switch to Production
npm run env:switch:production
```

### Build for Specific Environment | 特定環境建置

```bash
# Development Build
npm run build:development

# Staging Build
npm run build:staging

# Production Build  
npm run build:production
```

### Development with Different Environments | 不同環境開發

```bash
# Standard Development (port 3002)
npm run dev

# Staging Environment Development
npm run dev:staging

# Production Environment Development
npm run dev:production
```

## 📝 Deployment Checklist | 部署檢查清單

### Staging Environment | 預備環境
- [ ] Environment variables configured for staging | 預備環境變數已配置
- [ ] Database connection to staging DB tested | 預備環境資料庫連接已測試  
- [ ] Health check endpoint working | 健康檢查端點正常工作
- [ ] Staging domain configured | 預備環境域名已配置
- [ ] SSL certificate active | SSL 證書已啟用
- [ ] Auto-deploy enabled | 自動部署已啟用

### Production Environment | 正式環境
- [ ] Environment variables configured for production | 正式環境變數已配置
- [ ] Database connection to production DB tested | 正式環境資料庫連接已測試
- [ ] Health check endpoint working | 健康檢查端點正常工作
- [ ] Production domain configured | 正式環境域名已配置
- [ ] SSL certificate active | SSL 證書已啟用
- [ ] Auto-deploy disabled (manual control) | 自動部署已關閉（手動控制）
- [ ] Monitoring alerts set up | 監控警報已設定
- [ ] Backup strategy in place | 備份策略已就位

## 🔗 Related Documentation | 相關文件

- [Main README](./README.md) - Service overview | 服務概述
- [Main Application Repo](https://github.com/geonook/es-international-department) - Admin system | 管理系統
- [Zeabur Documentation](https://zeabur.com/docs) - Platform docs | 平台文件

## 📞 Support | 支援

For deployment issues | 部署問題請聯繫:
- 📧 Technical Support: esid@kangchiao.com.tw
- 📱 Phone: (02) 8195-8852
- 🐛 GitHub Issues: [Report Issue](https://github.com/geonook/new-parent-s-corner-website/issues)

---

**Deployment Ready** ✅ | **部署準備就緒** ✅  
*KCISLK Parents' Corner Microservice*