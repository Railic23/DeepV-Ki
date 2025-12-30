# DeepV-Ki - AI-Powered Wiki Generator for Code Repositories

一个由 AI 驱动的开源 Wiki 生成器，可以自动为任何 GitHub、GitLab、Bitbucket 或 Gerrit 仓库生成美观、交互式的文档。只需输入仓库 URL，DeepV-Ki 就会自动分析代码、生成详细文档、创建架构图表，并构建一个完整的可交互式 Wiki。

## 🌟 核心特性

### 📚 文档生成
- **一键生成 Wiki**：将任何代码仓库转换为专业的交互式 Wiki（仅需数分钟）
- **智能代码分析**：使用 AI 理解代码结构、架构模式和设计决策
- **多语言支持**：英文、中文、日文、西班牙文、法文等 10+ 语言
- **自动文档结构**：AI 智能生成逻辑清晰的 Wiki 目录和导航

### 🔧 仓库支持
- **GitHub**：公开仓库和私有仓库（需要个人访问令牌）
- **GitLab**：gitlab.com 和自托管 GitLab 实例
- **Bitbucket**：完整的 Bitbucket 仓库支持
- **Gerrit**：代码审查平台支持
- **私有仓库**：使用个人访问令牌安全访问私有代码

### 🤖 AI 能力
- **多 LLM 提供商支持**：
  - Google Gemini（gemini-2.5-flash, gemini-2.5-pro）
  - OpenAI（GPT-4o, GPT-5-nano 等）
  - OpenRouter（100+ 模型）
  - Azure OpenAI（企业部署）
  - AWS Bedrock（Claude, Llama 等）
  - Alibaba DashScope（Qwen 系列）
  - 本地 Ollama（免费、开源）
- **灵活配置**：无需修改代码即可切换 AI 提供商和模型

### 📊 图表生成
- **自动 Mermaid 图表**：自动生成流程图、时序图、类图等可视化图表
- **后端渲染**：图表在服务器端渲染为 SVG，所有浏览器都能完美显示
- **智能降级**：渲染失败时自动转为代码块显示，用户仍可查看图表定义
- **交互功能**：支持平移、缩放等交互操作

### 💬 智能问答
- **Ask 功能**：使用 RAG（检索增强生成）与您的代码库进行对话
  - 基于实际代码的准确回答
  - 实时流式响应
  - 支持多轮对话，保持上下文
- **DeepResearch**：多轮深度研究模式
  - 自动生成研究计划
  - 多次迭代深入调查（最多 5 次）
  - 综合结论总结

## 🚀 快速开始

### 前置要求
- **Python 3.12+**（后端）
- **Node.js 18+**（前端）
- **pnpm**（前端包管理器）
- **uv**（Python 包管理器，推荐）
- **至少一个 AI 提供商的 API 密钥**（例如 OpenAI）

### 1. 环境配置

复制并配置环境变量文件：

```bash
cp .env.example .env
# 编辑 .env 填入 GITLAB_CLIENT_ID, OPENAI_API_KEY 等
```

### 2. 启动开发环境

我们提供了一键启动脚本：

```bash
./start_dev.sh
# 后端: http://localhost:8001
# 前端: http://localhost:3000
```

### 3. 依赖安装

如果脚本没有自动安装依赖，你可以手动安装：

```bash
# 后端依赖 (使用 uv)
uv sync

# 前端依赖 (使用 pnpm)
pnpm install
```

## 🏗️ 系统架构

项目采用前后端分离架构：

```
/ (Root)
├── api/                # 🟢 后端 (FastAPI + Python)
│   ├── api.py          # 应用入口
│   ├── main.py         # 启动脚本
│   └── ...             # 业务逻辑
│
├── frontend/           # 🔵 前端 (Next.js + React + TypeScript)
│   ├── src/            # 源代码
│   └── packages/       # 共享组件库
│
├── start_dev.sh        # 🚀 启动开发环境
├── .env                # 环境变量
└── pnpm-workspace.yaml # pnpm 工作区定义
```

### 后端架构（FastAPI + Python）

*   **API (`api/`)**: 包含所有核心业务逻辑，如 Wiki 生成、RAG、GitLab 客户端、任务队列等。
*   **认证**: 支持 GitLab OAuth 认证。

### 前端架构（Next.js + React + TypeScript）

*   **Frontend (`frontend/`)**: Next.js 应用，拥有独立的页面路由、配置和样式。
*   **Packages (`frontend/packages`)**: 共享组件库。

## 🔧 配置说明

### 环境变量 (.env)

```bash
# 通用配置
OPENAI_API_KEY=sk-...                    # OpenAI API 密钥
GOOGLE_API_KEY=AIzaSy...                 # Google Gemini
LOG_LEVEL=INFO                           # 日志级别

# 服务配置
PORT=8001
SERVER_BASE_URL=http://localhost:8001
FRONTEND_URL=http://localhost:3000

# GitLab OAuth 配置
GITLAB_CLIENT_ID=...                     # GitLab OAuth App ID
GITLAB_CLIENT_SECRET=...                 # GitLab OAuth Secret
GITLAB_URL=https://gitlab.com            # GitLab 实例地址
```

## 📚 技术栈

### 后端
- **框架**：FastAPI 0.95+
- **服务器**：Uvicorn
- **语言**：Python 3.12+
- **包管理**：uv (推荐) / pip
- **数据库**：SQLite
- **向量数据库**：FAISS
- **AI 框架**：adalflow
- **异步**：asyncio

### 前端
- **框架**：Next.js 15
- **UI 库**：React 19
- **语言**：TypeScript 5
- **包管理**：pnpm (Workspaces)
- **样式**：Tailwind CSS 4
- **i18n**：next-intl
- **主题**：next-themes
- **图表**：Mermaid.js

## 🤝 贡献

欢迎贡献！请：

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢所有贡献者和用户对本项目的支持和改进！
