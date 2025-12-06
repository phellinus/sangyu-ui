# Sangyu UI 介绍

> 一套面向中后台与多端产品的 Vue 3 组件体系，覆盖基础控件、业务模块与配套设计资源。

## 愿景

- **一致**：统一设计语言（Typography、Color、Radius、Motion）与代码规范，降低协作成本。
- **高效**：提供完善的 CLI、图标库、主题工具与 Demo，帮助设计 & 开发快速搭建产品。
- **可塑**：CSS 变量与 Token 系统支持按需主题化，也能扩展到新品牌/暗色模式。

## 核心能力

1. **组件矩阵**：按钮、输入、数据展示、导航、反馈等通用组件持续扩充。
2. **设计资源**：Figma 模板、动效规范与代码示例同步更新，保持跨端一致性。
3. **多主题机制**：全局颜色/阴影/排版 Token 可切换，支持品牌色、暗黑模式与高对比度主题。
4. **工程化**：基于 Vite + Vue 3 + TS，内置按需引入、自动文档、单元测试与 Lint 工具链。

## 快速上手

```bash
pnpm add sangyu-ui
```

```ts
import { SyButton } from 'sangyu-ui';
import '@sangyu-ui/theme/index.css';
```

```vue
<SyButton type="filled" color="primary">开始使用</SyButton>
```

## 设计准则

- **易识别**：通过清晰的留白、对比与层级，保证信息结构明确。
- **反馈明确**：所有交互状态（hover/focus/active/disabled）均有动效与可访问提示。
- **可访问性**：遵循 WCAG 对比度要求，键盘操作、ARIA 属性一并覆盖。

## 生态配套

- `@sangyu-ui/icons`：统一的 SVG 图标库与 `SyIcon` 包装器。
- `@sangyu-ui/utils`：颜色、类名、Hook 等开发辅助工具。
- `docs/`：基于 VitePress 的文档站，集成演示、暗色模式与搜索。

## 发展计划

- 更丰富的业务组件（流程、图表、上传等）
- 设计 Tokens 管理面板与主题生成器
- 自动化可访问性与视觉回归测试

欢迎通过 Issue / PR 参与共建，让 Sangyu UI 成为团队可持续演进的设计系统。
