const { chromium } = require('playwright');

/**
 * Microsoft Playwright MCP 測試腳本
 * 用於全面測試和改進網站的互動效果
 */

class InteractionTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.context = null;
    this.testResults = {
      performance: {},
      interactions: {},
      improvements: []
    };
  }

  async setup() {
    console.log('🎭 Launching Playwright MCP test session...');
    
    this.browser = await chromium.launch({ 
      headless: false,
      slowMo: 500,
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1
    });
    
    this.page = await this.context.newPage();
    
    // 監聽控制台錯誤
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
      }
    });
  }

  async navigateToSite() {
    console.log('🌐 Navigating to http://localhost:8080...');
    
    try {
      await this.page.goto('http://localhost:8080', { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      console.log('✅ Site loaded successfully');
      return true;
    } catch (error) {
      console.log('❌ Failed to load site:', error.message);
      return false;
    }
  }

  async testHeroSectionInteractions() {
    console.log('\n📍 Testing Hero Section Interactions...');
    
    // 測試英雄區段動畫
    const heroSection = this.page.locator('section').first();
    await heroSection.waitFor({ timeout: 5000 });
    
    // 測試按鈕互動
    const buttons = await this.page.locator('a[class*="group"]').all();
    console.log(`Found ${buttons.length} interactive buttons`);
    
    for (let i = 0; i < buttons.length; i++) {
      console.log(`Testing button ${i + 1}...`);
      
      // 記錄懸停前狀態
      const beforeHover = await this.captureElementState(buttons[i]);
      
      // 執行懸停
      await buttons[i].hover();
      await this.page.waitForTimeout(1000);
      
      // 記錄懸停後狀態
      const afterHover = await this.captureElementState(buttons[i]);
      
      // 分析變化
      this.analyzeStateChange('button', i + 1, beforeHover, afterHover);
    }
  }

  async testCardInteractions() {
    console.log('\n🃏 Testing Card Interactions...');
    
    // 滾動到卡片區域
    await this.page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });
    await this.page.waitForTimeout(2000);
    
    const cards = await this.page.locator('[class*="card"], .card').all();
    console.log(`Found ${cards.length} interactive cards`);
    
    for (let i = 0; i < Math.min(4, cards.length); i++) {
      console.log(`Testing card ${i + 1}...`);
      
      await cards[i].scrollIntoViewIfNeeded();
      
      // 測試 3D 效果
      await this.test3DCardEffect(cards[i], i + 1);
      
      // 測試懸停動畫
      await this.testHoverAnimation(cards[i], i + 1);
    }
  }

  async test3DCardEffect(card, index) {
    console.log(`  🎭 Testing 3D effect for card ${index}...`);
    
    const cardBox = await card.boundingBox();
    if (!cardBox) return;
    
    // 測試不同滑鼠位置的 3D 效果
    const positions = [
      { x: cardBox.x + cardBox.width * 0.1, y: cardBox.y + cardBox.height * 0.1 }, // 左上
      { x: cardBox.x + cardBox.width * 0.9, y: cardBox.y + cardBox.height * 0.1 }, // 右上
      { x: cardBox.x + cardBox.width * 0.1, y: cardBox.y + cardBox.height * 0.9 }, // 左下
      { x: cardBox.x + cardBox.width * 0.9, y: cardBox.y + cardBox.height * 0.9 }, // 右下
      { x: cardBox.x + cardBox.width * 0.5, y: cardBox.y + cardBox.height * 0.5 }  // 中心
    ];
    
    for (const pos of positions) {
      await this.page.mouse.move(pos.x, pos.y);
      await this.page.waitForTimeout(300);
      
      const transform = await card.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      if (transform !== 'none') {
        console.log(`    ✅ 3D transform detected: ${transform.substring(0, 50)}...`);
      }
    }
  }

  async testHoverAnimation(element, index) {
    console.log(`  🎨 Testing hover animation for element ${index}...`);
    
    // 記錄動畫前狀態
    const beforeState = await this.captureElementState(element);
    
    // 執行懸停
    await element.hover();
    await this.page.waitForTimeout(500);
    
    // 記錄動畫後狀態  
    const afterState = await this.captureElementState(element);
    
    // 檢查移開後的狀態
    await this.page.mouse.move(0, 0);
    await this.page.waitForTimeout(500);
    
    const finalState = await this.captureElementState(element);
    
    this.analyzeAnimationSequence(index, beforeState, afterState, finalState);
  }

  async captureElementState(element) {
    return await element.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        transform: style.transform,
        backgroundColor: style.backgroundColor,
        boxShadow: style.boxShadow,
        opacity: style.opacity,
        borderColor: style.borderColor,
        scale: style.scale || '1'
      };
    });
  }

  analyzeStateChange(type, index, before, after) {
    const changes = [];
    
    Object.keys(before).forEach(prop => {
      if (before[prop] !== after[prop]) {
        changes.push(`${prop}: ${before[prop]} → ${after[prop]}`);
      }
    });
    
    if (changes.length > 0) {
      console.log(`    ✅ ${type} ${index} state changes:`, changes);
      this.testResults.interactions[`${type}_${index}`] = {
        before,
        after,
        changes
      };
    } else {
      console.log(`    ⚠️ ${type} ${index}: No visual changes detected`);
    }
  }

  analyzeAnimationSequence(index, before, during, after) {
    console.log(`    📊 Animation sequence analysis for element ${index}:`);
    console.log(`      Before: ${JSON.stringify(before, null, 2).substring(0, 100)}...`);
    console.log(`      During: ${JSON.stringify(during, null, 2).substring(0, 100)}...`);
    console.log(`      After:  ${JSON.stringify(after, null, 2).substring(0, 100)}...`);
  }

  async testResponsiveDesign() {
    console.log('\n📱 Testing Responsive Design...');
    
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      console.log(`  Testing ${viewport.name} (${viewport.width}x${viewport.height})...`);
      
      await this.page.setViewportSize(viewport);
      await this.page.waitForTimeout(1000);
      
      // 測試導航在不同螢幕的行為
      if (viewport.width < 768) {
        await this.testMobileNavigation();
      }
      
      // 截圖記錄
      await this.page.screenshot({ 
        path: `tests/screenshots/${viewport.name.toLowerCase()}-view.png`,
        fullPage: false
      });
    }
    
    // 恢復桌面視圖
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async testMobileNavigation() {
    console.log('    🍔 Testing mobile navigation...');
    
    const mobileMenuButton = this.page.locator('button').filter({ hasText: /menu|☰|≡/ }).first();
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await this.page.waitForTimeout(500);
      
      console.log('    ✅ Mobile menu opened');
      
      await mobileMenuButton.click();
      await this.page.waitForTimeout(500);
      
      console.log('    ✅ Mobile menu closed');
    }
  }

  async performanceAnalysis() {
    console.log('\n⚡ Performing Performance Analysis...');
    
    // 分析動畫性能
    const animationPerformance = await this.page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let startTime = performance.now();
        
        function countFrames() {
          frameCount++;
          if (performance.now() - startTime < 1000) {
            requestAnimationFrame(countFrames);
          } else {
            resolve(frameCount);
          }
        }
        
        requestAnimationFrame(countFrames);
      });
    });
    
    console.log(`  📊 Animation FPS: ${animationPerformance}`);
    this.testResults.performance.fps = animationPerformance;
    
    // 記憶體使用分析
    const memoryUsage = await this.page.evaluate(() => {
      if (performance.memory) {
        return {
          used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        };
      }
      return null;
    });
    
    if (memoryUsage) {
      console.log(`  💾 Memory usage: ${memoryUsage.used}MB / ${memoryUsage.total}MB`);
      this.testResults.performance.memory = memoryUsage;
    }
  }

  generateImprovementSuggestions() {
    console.log('\n💡 Generating Improvement Suggestions...');
    
    const suggestions = [
      {
        category: '🎪 Animation Enhancements',
        items: [
          'Add staggered card entrance animations',
          'Implement magnetic button effects',
          'Add loading skeleton animations',
          'Create smooth page transitions'
        ]
      },
      {
        category: '🎯 Interaction Improvements', 
        items: [
          'Add haptic feedback for mobile',
          'Implement gesture recognition',
          'Add voice interaction support',
          'Create contextual tooltips'
        ]
      },
      {
        category: '⚡ Performance Optimizations',
        items: [
          'Optimize animation calculations',
          'Implement intersection observers',
          'Add animation preloading',
          'Use CSS transforms over properties'
        ]
      }
    ];
    
    suggestions.forEach(category => {
      console.log(`\n${category.category}:`);
      category.items.forEach(item => {
        console.log(`  • ${item}`);
      });
    });
    
    this.testResults.improvements = suggestions;
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up test session...');
    
    if (this.browser) {
      await this.browser.close();
    }
    
    console.log('✅ Test session completed successfully');
  }

  async runFullTestSuite() {
    try {
      await this.setup();
      
      const siteLoaded = await this.navigateToSite();
      if (!siteLoaded) {
        console.log('❌ Cannot proceed with tests - site not accessible');
        return;
      }
      
      await this.testHeroSectionInteractions();
      await this.testCardInteractions();
      await this.testResponsiveDesign();
      await this.performanceAnalysis();
      
      this.generateImprovementSuggestions();
      
      // 生成測試報告
      console.log('\n📋 Test Results Summary:');
      console.log(JSON.stringify(this.testResults, null, 2));
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// 主執行函數
async function runPlaywrightMCPTests() {
  console.log('🚀 Starting Microsoft Playwright MCP Testing Session');
  console.log('=' .repeat(60));
  
  const tester = new InteractionTester();
  await tester.runFullTestSuite();
  
  console.log('=' .repeat(60));
  console.log('🎉 Playwright MCP testing completed!');
}

// 檢查伺服器狀態
async function checkServer() {
  try {
    const response = await fetch('http://localhost:8080');
    return response.ok;
  } catch {
    return false;
  }
}

// 執行測試
if (require.main === module) {
  checkServer().then(isRunning => {
    if (isRunning) {
      runPlaywrightMCPTests();
    } else {
      console.log('❌ Please start the development server first:');
      console.log('   npm run dev');
    }
  });
}

module.exports = { InteractionTester, runPlaywrightMCPTests };