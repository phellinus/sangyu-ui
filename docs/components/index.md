---
title: 组件概览
description: 浏览 Sangyu Design UI 已提供的组件，按分类查看示例与 API 文档。
pageClass: sy-components-page
aside: false
---

<script setup lang="ts">
import ComponentsOverview from '../../.vitepress/theme/ComponentsOverview.vue';
</script>

<ComponentsOverview />

## 快速使用组件

通过按需导入，组合你需要的界面控件。安装与完整引入方式可以查看[使用指南](/introduce/)。

```ts
import { SyInput, SyButton } from 'sangyu-ui';
import 'sangyu-ui/style.css';
```

```vue
<SyInput v-model="keyword" placeholder="输入关键字" clearable />
<SyButton type="filled" color="primary" @click="search">搜索</SyButton>
```

## 定制组件主题

V2 通过基础 Token、语义 Token 和组件 Token 管理样式。你可以统一调整品牌主色，也可以用 `ThemeProvider` 修改局部区域内某类组件的样式。参见 [自定义主题示例](/introduce/#自定义主题)。

## 参与共建

组件源码和示例位于 `packages/sangyu-ui/src`，欢迎通过 [Issue 或 Pull Request](https://github.com/phellinus/sangyu-ui) 反馈问题、完善文档和分享使用场景。
