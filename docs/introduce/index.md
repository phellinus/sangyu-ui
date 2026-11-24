# Sangyu Design UI 介绍

> 一套基于 Vue 3 和 TypeScript 开发的组件库，提供常用界面组件、独立图标包、完整类型声明和三层设计 Token 主题体系

## 愿景

- **一致**：统一设计语言和代码规范，降低项目的开发与维护成本
- **高效**：提供常用组件、图标库和完整示例，帮助开发者快速搭建界面
- **可塑**：通过设计 Token 自定义品牌色，并为页面局部设置主题
- **可靠**：通过 TypeScript、单元测试和完整质量检查保证组件质量

## 核心能力

1. **常用组件**：覆盖基础组件、表单组件、数据展示、导航和反馈组件，参见 [组件概览](/components/)
2. **独立图标包**：提供 `@sangyu-ui/icons` 图标组件和 `SyIcon` 图标包装器
3. **主题定制**：通过基础、语义和组件三层设计 Token 管理样式，支持用 `ThemeProvider` 在局部区域切换亮暗主题
4. **类型支持**：组件 Props、Emits 和实例类型均提供 TypeScript 声明
5. **工程化**：基于 Vite、Vue 3、TypeScript、Vitest 和 VitePress 构建

## 快速上手

### 环境要求

- Vue `^3.5.0`
- 支持 Vue 3 的现代浏览器
- 支持 ESM 的构建环境，`sangyu-ui` 和 `@sangyu-ui/icons` 均提供 ESM 入口

### 安装组件库

如果只使用 Sangyu Design UI 组件，可以安装主组件库：

```bash
pnpm add sangyu-ui
```

也可以使用 npm：

```bash
npm install sangyu-ui
```

### 安装组件库和图标包

如果需要在业务代码中直接导入 `SyIcon` 或其他图标组件，建议同时安装主组件库和图标包：

```bash
pnpm add sangyu-ui @sangyu-ui/icons
```

也可以使用 npm：

```bash
npm install sangyu-ui @sangyu-ui/icons
```

虽然 `@sangyu-ui/icons` 是 `sangyu-ui` 的依赖，但业务代码直接使用图标包时，建议将它声明为项目的直接依赖。

### 只安装图标包

如果项目只需要使用 Sangyu Design UI 图标：

```bash
pnpm add @sangyu-ui/icons
```

也可以使用 npm：

```bash
npm install @sangyu-ui/icons
```

### 完整引入

在应用入口文件中注册 Sangyu Design UI，并引入完整样式：

```ts
import { createApp } from 'vue';
import SangyuUI from 'sangyu-ui';
import 'sangyu-ui/style.css';
import App from './App.vue';

const app = createApp(App);

app.use(SangyuUI);
app.mount('#app');
```

注册完成后，可以直接在模板中使用组件：

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

	<SyDrawer v-model:visible="visible" title="抽屉标题">这里是抽屉内容</SyDrawer>
</template>
```

使用具名导入时，构建工具可以裁剪未使用的组件 JavaScript。样式需要显式引入完整的 `sangyu-ui/style.css`。

## 使用图标

### 局部使用 SyIcon

安装图标包：

```bash
pnpm add @sangyu-ui/icons
```

在需要使用图标的组件中导入 `SyIcon`：

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

如果项目入口已经引入了 `sangyu-ui/style.css`，则不需要重复引入 `@sangyu-ui/icons/style.css`。

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

全局注册后，不需要在每个组件中重复导入：

```vue
<template>
	<SyButton type="filled">
		<SyIcon name="save" :size="16" />
		保存
	</SyButton>

	<SyIcon name="search" :size="20" />
	<SyIcon name="setting" :size="24" color="primary" />
</template>
```

### 直接使用图标组件

也可以直接导入具体的图标组件：

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

图标使用 `currentColor`，可以通过 CSS 的 `color` 和 `font-size` 控制颜色与尺寸。

## TypeScript

组件的 Props、Emits 和实例类型可以从主包导入：

```ts
import type { ButtonProps, DrawerEmits, DrawerProps } from 'sangyu-ui';
```

组件库版本也可以从主包获取：

```ts
import { version } from 'sangyu-ui';

console.log(version);
```

## 自定义主题

Sangyu Design UI 将主题配置组织为三层设计 Token，并通过 `--sy-*` CSS 变量应用到组件样式。

### 三层设计 Token

- **基础 Token**（`base`）定义色板、字号、间距和圆角等基础值。例如，`base.color.primary[6]` 是主色色板里的第 6 阶颜色。
- **语义 Token**（`semantic`）为值赋予界面用途。例如，`semantic.color.primary` 默认引用主色色板的第 6 阶。修改它可以调整使用这一语义的组件样式。
- **组件 Token**（`components`）对应具体组件的样式。例如，`components.select.focusBorderColor` 默认引用语义主色。修改它可以单独调整 Select 的焦点边框。

修改色板第 6 阶时，变化会沿引用传递到语义主色和 Select 焦点边框。单独设置语义主色时，它会使用显式值。再单独设置 Select 的焦点边框时，该边框会使用组件层的值。

### 使用 ThemeProvider 定制局部主题

`ThemeProvider` 根据 `mode` 选择亮色或暗色预设，将 `tokens` 中的覆盖应用到包裹的区域。下面的按钮使用修改后的默认主色，Select 获得焦点时使用单独设置的深紫色边框。

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
import { SyButton, SySelect, ThemeProvider } from 'sangyu-ui';
import type { SelectModelValue, ThemeOverride } from 'sangyu-ui';
import 'sangyu-ui/style.css';

const tokens: ThemeOverride = {
	base: { color: { primary: { 6: '#7c3aed' } } },
	components: { select: { focusBorderColor: '#6d28d9' } },
};

const options = [
	{ label: '设计', value: 'design' },
	{ label: '开发', value: 'development' },
];

const selectedDirection = shallowRef<SelectModelValue>();
</script>

<template>
	<ThemeProvider mode="light" :tokens="tokens">
		<SyButton type="filled">主题主色</SyButton>
		<SySelect v-model="selectedDirection" :options="options" placeholder="请选择方向" />
	</ThemeProvider>
</template>
```

了解如何生成静态 CSS、直接覆盖变量和配置嵌套主题，可查看 [主题变量](/introduce/theme)。

## 设计准则

- **易识别**：通过清晰的留白、对比和层级保证信息结构明确
- **反馈明确**：为 hover、focus、active 和 disabled 等交互状态提供反馈
- **保持一致**：相同类型的组件使用统一的颜色、间距和交互规则
- **可访问性**：持续完善键盘操作、ARIA 属性和焦点管理

## 生态配套

- [`sangyu-ui`](https://www.npmjs.com/package/sangyu-ui)：Vue 3 组件库主包
- [`@sangyu-ui/icons`](https://www.npmjs.com/package/@sangyu-ui/icons)：Vue 3 SVG 图标组件包
- `@sangyu-ui/utils`：组件库内部工具包，不单独发布
- `docs/`：基于 VitePress 构建的组件文档

## 发展计划

- 持续扩展 Dialog、Upload、Tree 和 DatePicker 等组件
- 补充应用级亮暗主题切换示例
- 支持组件样式按需引入
- 增加自动化可访问性和视觉回归测试
- 建设在线组件演练场

欢迎通过 [GitHub Issues](https://github.com/phellinus/sangyu-ui/issues) 和 Pull Request 参与项目建设。
