const { chromium } = require('playwright');

async function testInteractionEffects() {
  console.log('🎭 Starting Playwright interaction testing...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // 慢動作以便觀察
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    // 1. 測試網站載入
    console.log('📍 Testing site loading...');
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    
    // 2. 測試首頁動畫效果
    console.log('🎬 Testing hero section animations...');
    
    // 檢查英雄區段是否存在
    const heroSection = await page.locator('section').first();
    await heroSection.waitFor();
    
    // 測試滾動動畫
    console.log('📜 Testing scroll animations...');
    await page.evaluate(() => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    // 3. 測試導航互動
    console.log('🧭 Testing navigation interactions...');
    
    // 測試桌面導航
    const navLinks = await page.locator('nav a').all();
    console.log(`Found ${navLinks.length} navigation links`);
    
    for (let i = 0; i < Math.min(3, navLinks.length); i++) {
      await navLinks[i].hover();
      await page.waitForTimeout(500);
    }
    
    // 4. 測試卡片懸停效果
    console.log('🃏 Testing card hover effects...');
    const cards = await page.locator('.card, [class*="card"]').all();
    console.log(`Found ${cards.length} cards to test`);
    
    for (let i = 0; i < Math.min(4, cards.length); i++) {
      await cards[i].scrollIntoViewIfNeeded();
      await cards[i].hover();
      await page.waitForTimeout(1000);
    }
    
    // 5. 測試按鈕互動
    console.log('🔘 Testing button interactions...');
    const buttons = await page.locator('button, .btn-primary, a[class*="btn"]').all();
    console.log(`Found ${buttons.length} buttons to test`);
    
    for (let i = 0; i < Math.min(3, buttons.length); i++) {
      await buttons[i].scrollIntoViewIfNeeded();
      await buttons[i].hover();
      await page.waitForTimeout(800);
    }
    
    // 6. 測試響應式設計
    console.log('📱 Testing responsive design...');
    
    // 測試平板尺寸
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    // 測試手機尺寸
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // 測試手機導航選單
    const mobileMenuButton = await page.locator('button[class*="md:hidden"]').first();
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(1000);
      await mobileMenuButton.click(); // 關閉選單
    }
    
    // 回到桌面尺寸
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    // 7. 測試頁面導航
    console.log('🔗 Testing page navigation...');
    
    // 測試幾個主要頁面
    const testPages = ['/events', '/resources', '/pacing-guides', '/id-squads', '/contact'];
    
    for (const pagePath of testPages) {
      console.log(`Testing page: ${pagePath}`);
      await page.goto(`http://localhost:8080${pagePath}`);
      await page.waitForLoadState('networkidle');
      
      // 測試頁面上的互動元素
      const pageCards = await page.locator('.card, [class*="card"]').all();
      if (pageCards.length > 0) {
        await pageCards[0].hover();
        await page.waitForTimeout(500);
      }
      
      await page.waitForTimeout(1000);
    }
    
    // 回到首頁
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ All interaction tests completed successfully!');
    
    // 生成改進建議
    console.log('\n📋 INTERACTION IMPROVEMENT SUGGESTIONS:');
    console.log('1. 🎯 Add more subtle micro-interactions on hover');
    console.log('2. 🎨 Enhance loading states with skeleton screens');
    console.log('3. 🔄 Add page transition animations');
    console.log('4. 📱 Improve mobile touch interactions');
    console.log('5. ⚡ Add haptic feedback for mobile devices');
    console.log('6. 🎪 Add more staggered animations on scroll');
    console.log('7. 🖱️ Add custom cursor effects on interactive elements');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// 確保 localhost:8080 正在運行
async function checkServerStatus() {
  try {
    const response = await fetch('http://localhost:8080');
    if (response.ok) {
      console.log('✅ Server is running on localhost:8080');
      return true;
    }
  } catch (error) {
    console.log('❌ Server not running on localhost:8080');
    console.log('Please make sure to run: npm run dev');
    return false;
  }
}

// 主執行函數
async function main() {
  const serverRunning = await checkServerStatus();
  if (serverRunning) {
    await testInteractionEffects();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testInteractionEffects };