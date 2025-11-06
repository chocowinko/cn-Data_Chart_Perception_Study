# 🔧 GitHub 英文显示问题修复指南

## 问题原因

你的项目中 `dist/` 目录（构建后的旧版本）被提交到了 GitHub，这个目录包含的是**旧的英文版本**。

当别人从 GitHub 下载你的代码后：
- ❌ 如果直接打开 `dist/index.html` → 看到英文（旧版本）
- ✅ 如果运行 `npm run dev` → 看到中文（最新版本）

## 修复步骤

### 步骤 1: 从 Git 中移除 dist 目录

打开终端，在项目目录下运行：

```bash
# 从 Git 追踪中移除 dist 目录（但保留本地文件）
git rm -r --cached dist

# 查看更改
git status
```

### 步骤 2: 提交更改

```bash
# 添加 .gitignore 文件
git add .gitignore

# 添加更新后的 README
git add README.md

# 提交更改
git commit -m "移除 dist 目录，添加 .gitignore，更新 README 说明"
```

### 步骤 3: 推送到 GitHub

```bash
# 推送到 GitHub
git push origin main
```

如果你的主分支是 `master` 而不是 `main`，请使用：
```bash
git push origin master
```

### 步骤 4: （可选）重新构建最新版本

如果你需要部署到 GitHub Pages 或其他平台，可以重新构建：

```bash
# 重新构建最新的中文版本
npm run build

# 这会生成新的 dist 目录，但因为有 .gitignore，它不会被提交到 Git
```

## 验证修复

完成上述步骤后，让别人重新克隆你的仓库：

```bash
git clone https://github.com/你的用户名/cn-Data_Chart_Perception_Study.git
cd cn-Data_Chart_Perception_Study
npm install
npm run dev
```

现在应该能看到中文版本了！✅

## 注意事项

1. **dist 目录不应该提交到 Git**：这是构建输出目录，应该由用户自己构建
2. **README 已更新**：现在包含了明确的运行说明
3. **.gitignore 已创建**：防止将来再次提交 dist 目录

## 如果还有问题

如果执行后还有问题，可以运行以下命令检查：

```bash
# 检查哪些文件会被提交
git status

# 检查 dist 是否还在 Git 追踪中
git ls-files | grep dist

# 如果 dist 还在，重新执行：
git rm -r --cached dist
git commit -m "再次移除 dist 目录"
git push
```

