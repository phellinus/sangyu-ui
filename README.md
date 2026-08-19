# Sangyu UI

[![npm version](https://img.shields.io/npm/v/sangyu-ui.svg)](https://www.npmjs.com/package/sangyu-ui)
[![npm downloads](https://img.shields.io/npm/dm/sangyu-ui.svg)](https://www.npmjs.com/package/sangyu-ui)
[![license](https://img.shields.io/npm/l/sangyu-ui.svg)](https://www.npmjs.com/package/sangyu-ui)

一个基于 Vue 3 和 TypeScript 开发的组件库，提供常用界面组件、独立图标包、完整类型声明和 CSS Variables 主题能力。

## 特性

- 基于 Vue 3.5 和 TypeScript 开发
- 提供 22 个常用组件和图标能力
- 支持完整引入和组件按需导入
- 提供完整的 TypeScript 类型声明
- 使用 CSS Variables 定制主题
- 提供独立的 `@sangyu-ui/icons` 图标包
- 使用 Vitest 进行组件单元测试
- 使用 VitePress 构建组件文档
- 支持 ESM 和 CommonJS

## 环境要求

- Vue `^3.5.0`
- 支持 Vue 3 的现代浏览器

## 安装

### 安装组件库

使用 pnpm：

```bash
pnpm add sangyu-ui
```

或者使用 npm：

```bash
npm install sangyu-ui
```

### 安装组件库和图标包

如果需要在业务代码中直接导入 `SyIcon` 或具体图标组件，建议同时安装：

```bash
pnpm add sangyu-ui @sangyu-ui/icons
```

或者使用 npm：

```bash
npm install sangyu-ui @sangyu-ui/icons
```

虽然 `@sangyu-ui/icons` 是 `sangyu-ui` 的依赖，但业务代码直接使用图标包时，建议将它声明为项目的直接依赖。

### 只安装图标包

如果只需要使用 Sangyu UI 图标：

```bash
pnpm add @sangyu-ui/icons
```

或者使用 npm：

```bash
npm install @sangyu-ui/icons
```

## 快速开始

### 完整引入

在应用入口文件中注册组件库，并引入完整样式：

```ts
import { createApp } from 'vue';
import SangyuUI from 'sangyu-ui';
import 'sangyu-ui/style.css';
import App from './App.vue';

const app = createApp(App);

app.use(SangyuUI);
app.mount('#app');
```

然后在模板中直接使用组件：

```vue
<template>
	<SyButton type="filled">开始使用</SyButton>
</template>
```

### 按需引入

可以从主包中导入需要使用的组件：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';
import 'sangyu-ui/style.css';

const visible = ref(false);
</script>

<template>
	<SyButton type="filled" @click="visible = true">打开抽屉</SyButton>

	<SyDrawer v-model:visible="visible" title="抽屉标题">
		这里是抽屉内容
	</SyDrawer>
</template>
```

当前版本按需导入组件时，仍然需要引入完整的 `sangyu-ui/style.css`。

## 使用图标

### 局部使用 SyIcon

先安装图标包：

```bash
pnpm add @sangyu-ui/icons
```

然后在需要使用图标的组件中导入：

```vue
<script setup lang="ts">
import { SyIcon } from '@sangyu-ui/icons';
import '@sangyu-ui/icons/style.css';
</script>

<template>
	<SyIcon name="search" :size="20" color="primary" />
	<SyIcon name="setting" size="1.5em" color="#7c3aed" />
	<SyIcon name="loading" :size="20" spin />
</template>
```

如果项目已经引入 `sangyu-ui/style.css`，不需要再次引入 `@sangyu-ui/icons/style.css`。

### 全局注册 SyIcon

如果项目中经常使用图标，可以在应用入口全局注册 `SyIcon`：

```ts
import { createApp } from 'vue';
import SangyuUI from 'sangyu-ui';
import { SyIcon } from '@sangyu-ui/icons';
import 'sangyu-ui/style.css';
import App from './App.vue';

const app = createApp(App);

app.use(SangyuUI);
app.component('SyIcon', SyIcon);
app.mount('#app');
```

全局注册后，可以直接在任意组件模板中使用：

```vue
<template>
	<SyButton type="filled">
		<SyIcon name="save" :size="16" />
		保存
	</SyButton>

	<SyIcon name="search" :size="20" />
	<SyIcon name="setting" :size="24" color="primary" />
	<SyIcon name="loading" :size="20" spin />
</template>
```

需要注意，`app.use(SangyuUI)` 不会自动全局注册独立图标包中的 `SyIcon`，因此需要单独执行：

```ts
app.component('SyIcon', SyIcon);
```

### 直接使用图标组件

也可以直接导入具体图标组件：

```vue
<script setup lang="ts">
import { SySearch, SySetting } from '@sangyu-ui/icons';
import '@sangyu-ui/icons/style.css';
</script>

<template>
	<SySearch style="color: #1677ff; font-size: 24px" />
	<SySetting style="color: #7c3aed; font-size: 24px" />
</template>
```

具体图标组件使用 `currentColor`，可以通过 CSS 的 `color` 和 `font-size` 控制颜色与尺寸。

## TypeScript

组件 Props、Emits 和实例类型可以从主包按类型导入：

```ts
import type { ButtonProps, DrawerEmits, DrawerProps } from 'sangyu-ui';
```

组件库版本也可以从主包获取：

```ts
import { version } from 'sangyu-ui';

console.log(version);
```

## 主题定制

Sangyu UI 使用 CSS Variables 管理主题。请先引入组件库样式，再引入自己的主题文件：

```ts
import 'sangyu-ui/style.css';
import './styles/sangyu-theme.css';
```

在自定义主题文件中覆盖变量：

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

更多配置请查看[主题变量文档](./docs/introduce/theme.md)。

## 组件完成情况

### 基础组件

- [x] Button 按钮
- [x] Divider 分割线

### 表单组件

- [x] Input 输入框
- [x] Radio 单选框
- [x] Checkbox 多选框
- [x] Switch 开关
- [x] Select 选择器
- [x] Form 表单

### 数据展示

- [x] Table 表格
- [x] Card 卡片
- [x] Tag 标签
- [x] Avatar 头像
- [x] Progress 进度条
- [x] Result 结果

### 导航组件

- [x] Breadcrumb 面包屑
- [x] Menu 菜单
- [x] Steps 步骤条
- [x] Pagination 分页器

### 反馈组件

- [x] Tooltip 文字提示
- [x] Notification 通知
- [x] Drawer 抽屉

### 其他

- [x] Icon 图标

## 后续计划

- [ ] Dialog 对话框
- [ ] Message 消息提示
- [ ] Upload 上传
- [ ] Tabs 标签页
- [ ] DatePicker 日期选择器
- [ ] Tree 树形控件
- [ ] Skeleton 骨架屏
- [ ] 组件样式按需引入
- [ ] 暗色主题
- [ ] 在线组件演练场

## 相关包

| 包名 | 说明 | 发布状态 |
| --- | --- | --- |
| [`sangyu-ui`](https://www.npmjs.com/package/sangyu-ui) | Vue 3 组件库主包 | 公开 |
| [`@sangyu-ui/icons`](https://www.npmjs.com/package/@sangyu-ui/icons) | Vue 3 SVG 图标组件包 | 公开 |
| `@sangyu-ui/utils` | 组件库内部工具包 | 不单独发布 |

## 项目结构

```text
sangyu-ui
├── docs
│   └── introduce
├── packages
│   ├── icons
│   ├── sangyu-ui
│   └── utils
├── scripts
├── package.json
└── pnpm-workspace.yaml
```

## 本地开发

克隆项目：

```bash
git clone https://github.com/phellinus/sangyu-ui.git
cd sangyu-ui
```

安装依赖：

```bash
pnpm install
```

启动组件文档：

```bash
pnpm docs:dev
```

运行测试：

```bash
pnpm test:run
```

运行完整质量检查：

```bash
pnpm check
```

## 参与贡献

欢迎提交 Issue 和 Pull Request。

提交代码前，请确保完整质量检查通过：

```bash
pnpm check
```

问题反馈：[GitHub Issues](https://github.com/phellinus/sangyu-ui/issues)

## 许可证

本项目基于 [ISC License](./packages/sangyu-ui/LICENSE) 开源。