# 快速开始指南

## 📋 前置条件

确保你的系统已安装：
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+ (可选，当前使用模拟数据)
- Redis 7+ (可选，当前未使用)

## 🚀 快速启动

### 1. 启动后端服务

```bash
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 启动服务
uvicorn app.main:app --reload
```

后端服务将在 `http://localhost:8000` 启动。

API 文档可在 `http://localhost:8000/docs` 查看。

### 2. 启动前端应用

打开新的终端窗口：

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端应用将在 `http://localhost:5173` 启动。

## 🎯 功能说明

### 当前已实现功能

1. **首页**
   - Hero 区域展示平台介绍
   - 搜索功能
   - 热门标签导航
   - 本周推荐技能
   - 特色技能展示

2. **技能列表页** (`/skills`)
   - 技能卡片展示
   - 分类筛选
   - 搜索功能
   - 排序功能（最受欢迎/最新/最高评分）
   - 分页功能

3. **技能详情页** (`/skills/:id`)
   - 技能详细信息
   - 评分和评论数
   - 下载统计
   - LLM 兼容性标签
   - 安装指南和使用示例

### 使用模拟数据

当前版本使用内存中的模拟数据，无需配置数据库即可运行。

## 🔧 配置说明

### 后端配置

复制并编辑环境变量文件：

```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件配置数据库和其他服务（当前使用模拟数据，可跳过）。

### 前端配置

前端默认连接到 `http://localhost:8000`，如需修改，创建 `.env` 文件：

```bash
cd frontend
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
```

## 📝 下一步开发

计划实现的功能：
- [ ] 用户认证系统
- [ ] 技能上传和发布
- [ ] 技能评分和评论
- [ ] 技能安装和部署
- [ ] 数据库集成（PostgreSQL）
- [ ] 向量搜索（Milvus）
- [ ] 用户个人中心
- [ ] 技能市场统计

## 🐛 问题排查

### 后端无法启动

- 检查 Python 版本：`python --version`（需要 3.11+）
- 检查端口 8000 是否被占用
- 检查虚拟环境是否正确激活

### 前端无法启动

- 检查 Node.js 版本：`node --version`（需要 18+）
- 删除 `node_modules` 和 `package-lock.json`，重新运行 `npm install`
- 检查端口 5173 是否被占用

### API 请求失败

- 确认后端服务正在运行
- 检查浏览器控制台的错误信息
- 确认 CORS 配置正确

## 📚 相关文档

- [README.md](README.md) - 项目概述和架构说明
- [API 文档](http://localhost:8000/docs) - FastAPI 自动生成的 API 文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
