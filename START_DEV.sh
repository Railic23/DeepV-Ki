#!/bin/bash
# 启动开发服务器脚本

echo "=================================="
echo "🚀 启动 DeepV-Ki 开发环境"
echo "=================================="
echo ""

# 检查 Python 后端
echo "1️⃣  检查 Python 后端..."
if ! curl -s http://localhost:8001/health > /dev/null 2>&1; then
    echo "⚠️  Python 后端未运行"
    echo "   请在另一个终端运行："
    echo "   cd /Users/konghaifeng/projects/deepwiki"
    echo "   uv run python -m api.main"
    echo ""
else
    echo "✅ Python 后端运行正常 (http://localhost:8001)"
    echo ""
fi

# 启动前端
echo "2️⃣  启动 Next.js 前端..."
echo ""
npm run dev
