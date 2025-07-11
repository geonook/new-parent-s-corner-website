#!/bin/bash

echo "🚀 Opening test browser for interaction testing..."

# 檢查網站是否運行
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Website is running on localhost:8080"
    
    # 在 macOS 上開啟 Chrome 並導航到測試網站
    open -a "Google Chrome" "http://localhost:8080"
    
    echo "🎭 Chrome browser opened for manual testing"
    echo ""
    echo "📋 Manual Testing Checklist:"
    echo "1. 🏠 Test hero section buttons (hover effects, 3D transforms)"
    echo "2. 🃏 Test card interactions (3D tilt, hover animations)"
    echo "3. 📱 Test responsive design (resize browser window)"
    echo "4. 🧭 Test navigation (mobile menu, dropdowns)"
    echo "5. 📜 Test scroll animations (parallax effects)"
    echo ""
    echo "💡 Look for:"
    echo "   • Smooth 60fps animations"
    echo "   • 3D perspective effects on cards"
    echo "   • Gradient animations on buttons"
    echo "   • Responsive behavior on different screen sizes"
    echo "   • Loading performance and memory usage"
    
else
    echo "❌ Website is not running on localhost:8080"
    echo "Please run: npm run dev"
fi