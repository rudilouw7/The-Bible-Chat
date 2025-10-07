#!/bin/bash

echo "🚀 Switching to Vercel Deployment Version..."
echo ""

# Check if vercel service exists
if [ ! -f "services/geminiService.vercel.ts" ]; then
    echo "❌ Error: services/geminiService.vercel.ts not found"
    exit 1
fi

# Backup the current version
if [ -f "services/geminiService.ts" ]; then
    echo "📦 Backing up current geminiService.ts..."
    cp services/geminiService.ts services/geminiService.backup.ts
    echo "✅ Backup saved as geminiService.backup.ts"
fi

# Switch to Vercel version
echo "🔄 Switching to Vercel version..."
cp services/geminiService.vercel.ts services/geminiService.ts
echo "✅ Done! Your app now uses Vercel serverless functions."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Install Vercel CLI:"
echo "    npm install -g vercel"
echo ""
echo "2️⃣  Deploy to Vercel:"
echo "    vercel"
echo ""
echo "3️⃣  Add environment variables in Vercel dashboard:"
echo "    • GEMINI_API_KEY"
echo "    • VITE_APP_PASSWORD"
echo ""
echo "4️⃣  Redeploy for production:"
echo "    vercel --prod"
echo ""
echo "📖 Full guide: See VERCEL-DEPLOY.md"
echo ""

