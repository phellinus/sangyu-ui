# 图标库

> Sangyu UI 的矢量图标集合，开箱即用、可主题化、支持动态注册。

- **即插即用**：所有 SVG 已转换成 Vue 组件并注册到 `SyIcon` 构造器。
- **主题友好**：图标默认继承 `currentColor` 与 `stroke-width`，可被任意 CSS 控制。
- **可扩展**：`registerIcon`/`registerIcons` 允许你在运行时追加或覆盖图标。

## 快速开始

```bash
pnpm add @sangyu-ui/icons
```

```vue
<script setup lang="ts">
import { SyIcon } from '@sangyu-ui/icons';
</script>

<template>
    <SyIcon name="search" size="20" color="#165DFF" />
    <SyIcon name="loading" :stroke-width="5" spin />
</template>
```

## 自定义图标

```ts
import MyLogo from './my-logo.vue';
import { registerIcon } from '@sangyu-ui/icons';

registerIcon('brand-logo', MyLogo, { aliases: ['logo', 'brand'] });
```

也可以通过 `<SyIcon :component="MyLogo" />` 直接渲染单个 SVG。

## 图标一览

<demo src="./demos/basic.vue"></demo>

## 交互 & API

以下示例展示 `SyIcon` 的全部 props（尺寸、颜色、描边、旋转、自定义占位等）：

<demo src="./demos/icon-use.vue"></demo>
