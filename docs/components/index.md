# 组件概览

> 在这里可以浏览 Sangyu UI 所有基础组件与高级组件，查看 Demo、API 说明以及最佳实践。

## 目录结构

- **基础控件**：Button、Input、Select、Radio、Checkbox 等。
- **数据展示**：Table、Card、Badge、Tag、Empty 等。
- **导航**：Tabs、Breadcrumb、Steps、Pagination、Menu。
- **反馈/动效**：Modal、Drawer、Toast、Skeleton、Loading。
- **复合业务**（规划中）：表单生成器、上传、图表、流程节点等。

## 如何阅读组件文档

1. **Demo 区块**：展示常用场景，可直接复制代码片段。
2. **Props / Events / Slots**：结构化表格列出 API，保持与 TS 类型同步。
3. **交互说明**：强调状态、动效与无障碍要求，方便设计与研发统一决策。
4. **最佳实践**：提供搭配图标、布局或主题的建议，减少重复设计。

## 快速使用组件

```ts
import { SyInput, SyButton } from 'sangyu-ui';
import '@sangyu-ui/theme/index.css';
```

```vue
<SyInput v-model="keyword" placeholder="输入关键字" clearable />
<SyButton type="filled" color="primary" @click="search">搜索</SyButton>
```

## 贡献指南

- 若需新增 Demo / 组件，请先在 `docs/components/plan.md` 中登记设计意图。
- 组件代码位于 `packages/sangyu-ui/src`，遵循 `Sy` 前缀、TypeScript、scss/less 变量规范。
- 文档 Demo 位于 `src/<component>/demos/`，尽量覆盖核心场景与 A11y 需求。
- 提交 PR 前运行 `pnpm lint` 与 `pnpm test`，保证类型、单测与构建通过。

## 下一步

- 完成剩余组件的语义化说明与动效规范
- 引入 Playground，支持在线调参导出代码
- 提供按主题、按业务场景的组件组合案例

欢迎在组件文档中留下你的灵感与建议，让文档不仅是说明书，更是团队的设计资产。
