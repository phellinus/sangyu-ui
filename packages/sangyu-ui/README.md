# Sangyu UI

基于 Vue 3 和 TypeScript 开发的组件库，提供常用界面组件、独立图标包、完整类型声明和 CSS Variables 主题能力。

## 安装

```bash
pnpm add sangyu-ui
```

也可以使用 npm：

```bash
npm install sangyu-ui
```

项目需要安装 Vue 3.5 或更高版本。`@sangyu-ui/icons` 是 `sangyu-ui` 的依赖，安装主包时会自动安装。

## 完整引入

在应用入口引入组件插件和完整样式：

```ts
import { createApp } from 'vue';
import SangyuUI from 'sangyu-ui';
import 'sangyu-ui/style.css';
import App from './App.vue';

createApp(App).use(SangyuUI).mount('#app');
```

完整引入后，可以在模板中直接使用组件：

```vue
<template>
	<SyButton type="filled">保存</SyButton>
</template>
```

## 按需使用组件

可以从主包入口导入单个组件。当前版本仍然使用完整 CSS 文件：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';
import 'sangyu-ui/style.css';

const visible = ref(false);
</script>

<template>
	<SyButton @click="visible = true">打开抽屉</SyButton>
	<SyDrawer v-model:visible="visible" title="抽屉标题">抽屉内容</SyDrawer>
</template>
```

## TypeScript

组件 Props、Emits 和实例类型可以从主包入口按类型导入：

```ts
import type { ButtonProps, DrawerEmits, DrawerProps } from 'sangyu-ui';
```

默认插件和版本号也可以使用具名导出：

```ts
import { SangyuUI, version } from 'sangyu-ui';

console.log(SangyuUI.version);
console.log(version);
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

## 组件

- 基础组件：Button、Divider
- 表单组件：Input、Radio、Checkbox、Switch、Select、Form
- 数据展示：Table、Card、Tag、Avatar、Progress、Result
- 导航组件：Breadcrumb、Menu、Steps、Pagination
- 反馈组件：Tooltip、Notification、Drawer

## 相关包

- [`@sangyu-ui/icons`](https://www.npmjs.com/package/@sangyu-ui/icons)：Vue 3 SVG 图标组件
- `@sangyu-ui/utils`：仅供组件库内部使用，不单独发布

## 问题反馈

如果发现问题，可以前往 [GitHub Issues](https://github.com/phellinus/sangyu-ui/issues) 提交反馈。

## 许可证

ISC License
