# New Parent's Corner Website

> 🏫 取代現有 Google Site，提供小學國際處學生與家長最新消息公告的現代化響應式網站

## 📋 專案概要

**目標網站**: https://sites.google.com/kcislk.ntpc.edu.tw/es-international-department/home

這個專案旨在建立一個現代化的網站來取代現有的 Google Site，主要功能包括：
- 📢 最新消息公告系統
- 📚 課程資訊展示
- 🎉 活動資訊發布
- 📰 月刊專區
- 📱 響應式設計（手機、平板、電腦）

## 🎨 設計特色

- **Google 風格設計**: 簡潔、易讀、強調資訊清楚傳達
- **細膩動畫效果**: 滾動動畫提升使用者體驗
- **Aura UI 整合**: 參考 Aura 設計系統的組件與風格
- **響應式設計**: 適應各種裝置尺寸

## 🛠️ 技術架構

### 前端技術
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animations**: Framer Motion
- **UI Components**: Custom + Aura UI integration

### 後台管理
- **CMS Options**: Strapi / Sanity / Directus
- **Features**: 
  - 建立、修改、刪除公告
  - 圖片、附件上傳
  - 發布時間與顯示範圍設定
  - 權限管理（管理員、編輯者）
  - 多語系支援

### 部署選項
- **Zeabur**: 雲端部署
- **學校資訊組**: 內部伺服器部署

## 🚀 快速開始

### 開發環境需求
- Node.js 18+
- npm 或 yarn
- Git

### 安裝與執行
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置專案
npm run build

# 執行測試
npm run test
```

## 📁 專案結構

```
new-parents-corner-website/
├── CLAUDE.md              # Claude Code 開發規範
├── README.md              # 專案說明文件
├── src/
│   ├── main/
│   │   ├── typescript/    # Next.js TypeScript 原始碼
│   │   │   ├── app/       # Next.js App Router 頁面
│   │   │   ├── components/# React 組件
│   │   │   ├── lib/       # 工具函數
│   │   │   ├── hooks/     # 自定義 React Hooks
│   │   │   ├── types/     # TypeScript 類型定義
│   │   │   └── api/       # API 路由
│   │   └── resources/
│   │       ├── config/    # 設定檔
│   │       └── assets/    # 靜態資源
│   └── test/              # 測試檔案
├── cms/                   # CMS 相關檔案
├── docs/                  # 技術文檔
├── tools/                 # 開發工具
└── output/                # 建置輸出
```

## 🎯 開發指南

### 重要原則
1. **Always read CLAUDE.md first** - 包含重要的開發規範
2. **Search before creating** - 避免重複實作
3. **Extend existing code** - 優先擴展現有功能
4. **Commit frequently** - 每完成一個任務就提交
5. **Follow patterns** - 遵循既有的程式碼模式

### 開發工作流程
1. 閱讀 CLAUDE.md 規範
2. 搜尋現有實作
3. 建立或擴展功能
4. 撰寫測試
5. 提交變更
6. 推送到 GitHub

## 🔗 相關連結

- **GitHub Repository**: https://github.com/geonook/new-parent-s-corner-website.git
- **Current Google Site**: https://sites.google.com/kcislk.ntpc.edu.tw/es-international-department/home
- **Aura Design System**: https://aura.build/

## 🤝 開發團隊

- **Template Creator**: Chang Ho Chien | HC AI 說人話channel
- **Tutorial**: https://youtu.be/8Q1bRZaHH24
- **Project Owner**: jason02n@gmail.com

## 📄 授權

本專案遵循相關開源授權條款。