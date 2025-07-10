#!/bin/bash

echo "🚀 Starting ES International Department Website..."
echo "📁 Project: New Parent's Corner"
echo "🌐 Opening browser preview..."

# Method 1: Try to start Next.js dev server
echo "Method 1: Starting Next.js development server..."
npm run dev-host &
SERVER_PID=$!
sleep 3

# Check if server started successfully
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server started successfully at http://localhost:3000"
    echo "🌐 Opening browser..."
    open http://localhost:3000
else
    echo "❌ Server failed to start. Using static preview..."
    kill $SERVER_PID 2>/dev/null
    
    # Method 2: Open static preview
    echo "🔄 Opening static preview file..."
    open "$(pwd)/preview.html"
fi

echo "📖 Instructions:"
echo "1. If localhost doesn't work, use the preview.html file"
echo "2. Check your firewall settings in System Preferences"
echo "3. Try restarting your network connection"
echo ""
echo "Press Ctrl+C to stop the server"
wait