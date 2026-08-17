# Sangyu UI

基于 Vue 3 和 TypeScript 的组件库。

## 安装

```bash
pnpm add sangyu-ui
```

项目需要安装 Vue 3.5 或更高版本。

## 完整引入

```ts
import { createApp } from 'vue';
import SangyuUI from 'sangyu-ui';
import 'sangyu-ui/style.css';
import App from './App.vue';

createApp(App).use(SangyuUI).mount('#app');
```

## 按需使用

```vue
<script setup lang="ts">
import { SyButton, SyDrawer } from 'sangyu-ui';
import 'sangyu-ui/style.css';
</script>

<template>
	<SyButton>打开抽屉</SyButton>
	<SyDrawer />
</template>
```

## 主题变量

Sangyu UI 使用 CSS Variables 管理主题颜色。先引入组件库样式，再引入自己的主题文件：

```ts
import 'sangyu-ui/style.css';
import './styles/sangyu-theme.css';
```

```css
:root {
	--sy-color-primary: #7c3aed;
	--sy-color-primary-hover: #8b5cf6;
	--sy-color-primary-active: #6d28d9;
	--sy-color-primary-select: #f3e8ff;
	--sy-color-text: #1f2937;
	--sy-color-border: #d1d5db;
}
```

建议同时覆盖主色的默认、悬停、激活和选中状态。完整变量及局部主题用法请查看[主题变量文档](https://github.com/phellinus/sangyu-ui/blob/main/docs/introduce/theme.md)。

## 许可证

ISC License
