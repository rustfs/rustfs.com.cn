# AGENTS.md - AI Agent 开发指南

本文档为 AI Agent 提供项目开发指南和规则，确保代码质量和 CI/CD 流程的顺利执行。

## 📋 项目概述

- **项目名称**: RustFS.com.cn - 官方网站
- **框架**: Next.js 15.3.4 (App Router, 静态导出)
- **语言**: TypeScript (ES2017+, 严格模式)
- **包管理器**: pnpm (推荐) 或 npm
- **样式**: Tailwind CSS 4 + shadcn/ui
- **CI/CD**: GitHub Actions → 阿里云 OSS

## 🚨 核心规则

### ⚠️ 提交前必须检查清单

**在每次提交代码之前，必须确保以下所有检查通过：**

1. **✅ TypeScript 类型检查**

   ```bash
   # 确保没有 TypeScript 错误
   npx tsc --noEmit
   ```

2. **✅ ESLint 代码检查**

   ```bash
   pnpm run lint
   # 或
   npm run lint
   ```

3. **✅ 本地构建测试**

   ```bash
   # 清理之前的构建
   rm -rf .next out

   # 执行构建
   pnpm run build
   # 或
   npm run build

   # 确保构建成功，没有错误
   ```

4. **✅ 依赖锁定文件同步**

   - 如果使用 `npm install` 更新依赖，必须同步更新 `pnpm-lock.yaml`：

     ```bash
     pnpm install
     ```

   - 如果使用 `pnpm install` 更新依赖，确保 `pnpm-lock.yaml` 已更新
   - **重要**: CI 使用 pnpm。如果本地使用 npm 更新依赖但未更新 `pnpm-lock.yaml`，CI 会失败

5. **✅ 构建产物验证**

   - 确保 `out/` 目录已生成
   - 确保 `out/sitemap.xml` 已生成（postbuild 脚本自动生成）
   - 检查构建产物是否完整

## 🔄 CI/CD 流程说明

### GitHub Actions 工作流步骤

根据 `.github/workflows/deploy.yml`，CI 流程包括：

1. **Checkout**: 检出代码

2. **Install dependencies**: 安装依赖

   ```bash
   npm install -g pnpm && pnpm install
   ```

3. **Install dependencies and build**: 安装依赖并构建

   ```bash
   pnpm install --no-frozen-lockfile
   pnpm run build
   ```

4. **Deploy**: 部署到阿里云 OSS

### 本地模拟 CI 流程

在提交前，建议在本地模拟完整的 CI 流程：

```bash
# 1. 清理环境
rm -rf node_modules .next out

# 2. 安装依赖（使用 pnpm，与 CI 一致）
npm install -g pnpm
pnpm install

# 3. 构建项目
pnpm run build

# 4. 验证构建产物
ls -la out/
ls -la out/sitemap.xml

# 5. 运行 lint
pnpm run lint
```

## 📝 开发规范

### 代码风格

- ✅ 使用 TypeScript 严格模式
- ✅ 遵循 ESLint 配置规则
- ✅ 使用函数式组件和 Hooks
- ✅ 使用 Tailwind CSS 进行样式编写
- ✅ 客户端组件必须标记 `'use client'`

### 组件开发

- ✅ 使用 `cn()` 函数合并类名
- ✅ 支持暗色模式和响应式设计
- ✅ 遵循 shadcn/ui 组件标准
- ✅ 保持组件单一职责

### 样式和结构保护

**🚨 绝对规则：除非明确指定，否则不得修改样式或结构！**

- ❌ **禁止**修改现有 CSS 类、布局结构或组件设计
- ❌ **禁止**简化复杂组件或移除视觉元素
- ❌ **禁止**用基础 UI 组件替换自定义组件
- ❌ **禁止**修改动画、过渡效果或交互行为
- ❌ **禁止**更改响应式设计或暗色模式实现

### Git 提交规范

- ✅ 使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范
- ✅ 提交信息必须使用英文
- ✅ 格式：`<type>[optional scope]: <description>`
- ✅ 类型：`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

示例：

```bash
feat: add contact form with hCaptcha
fix: update pnpm-lock.yaml after npm dependency changes
docs: update README with new features
```

## 🛠️ 常见问题排查

### 问题 1: CI 构建失败 - 依赖安装错误

**症状**: `Install dependencies` 步骤失败

**原因**:

- 本地使用 npm 更新依赖，但未更新 `pnpm-lock.yaml`
- `pnpm-lock.yaml` 与 `package.json` 不同步

**解决方案**:

```bash
# 使用 pnpm 重新安装依赖，更新锁定文件
pnpm install

# 提交更新的 pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "fix: update pnpm-lock.yaml"
```

### 问题 2: CI 构建失败 - TypeScript 错误

**症状**: 构建过程中 TypeScript 类型错误

**解决方案**:

```bash
# 本地检查 TypeScript 错误
npx tsc --noEmit

# 修复所有类型错误后再提交
```

### 问题 3: CI 构建失败 - ESLint 错误

**症状**: Lint 检查失败

**解决方案**:

```bash
# 本地运行 lint 检查
pnpm run lint

# 修复所有 lint 错误后再提交
```

### 问题 4: 构建成功但部署失败

**症状**: 构建通过，但部署步骤失败

**检查项**:

- 确保 `out/` 目录存在
- 确保 `out/sitemap.xml` 已生成
- 检查构建产物是否完整

## 📚 相关资源

- [项目 README](./README.md)
- [Next.js 文档](https://nextjs.org/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [ESLint 文档](https://eslint.org/docs/latest)

## ✅ 提交前检查清单

在每次提交代码前，请确认：

- [ ] TypeScript 类型检查通过 (`npx tsc --noEmit`)
- [ ] ESLint 检查通过 (`pnpm run lint`)
- [ ] 本地构建成功 (`pnpm run build`)
- [ ] `pnpm-lock.yaml` 已更新（如果修改了依赖）
- [ ] 构建产物 `out/` 目录存在且完整
- [ ] `out/sitemap.xml` 已生成
- [ ] 提交信息符合 Conventional Commits 规范
- [ ] 提交信息使用英文

**记住：如果本地构建失败，CI 也一定会失败。不要提交无法通过本地构建的代码！**

---

**最后更新**: 2026-01-06
