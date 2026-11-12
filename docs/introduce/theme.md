# 主题变量

Sangyu Design UI 使用 CSS Variables 管理主题颜色。你可以在不重新编译组件库的情况下覆盖变量，快速调整品牌色、状态色和基础界面颜色。

V2 主题配置按基础 Token、语义 Token、组件 Token 三层组织。`lightTheme` 与 `darkTheme` 是官方预设；`mergeTheme` 合并局部覆盖，`themeToVariables` 或 `themeToCSS` 将合并后的配置转换为现有 `--sy-*` 变量。`ThemeProvider` 会将变量应用到局部 DOM 作用域，并支持嵌套覆盖和亮暗主题切换。

```ts
import { lightTheme, mergeTheme, themeToCSS } from 'sangyu-ui';

const brandTheme = mergeTheme(lightTheme, {
	base: { color: { primary: { 6: '#7c3aed' } } },
});
const scopedCSS = themeToCSS(brandTheme, '.brand-theme');
```

语义色引用基础色板，Select 的焦点边框等组件 Token 引用语义色。覆盖基础值会沿引用传递；显式设置语义或组件值时，以更具体的设置为准。合并不会修改预设或传入的覆盖对象。

暗色静态样式可在目标元素上设置 `data-sy-theme="dark"`，并沿 DOM 层级继承。使用 `ThemeProvider` 时，组件与其后代会自动获得对应主题变量。浮层若挂载到 Provider 之外（例如 Teleport 到 `body`），需在实际容器上设置同样的属性并应用 `themeToVariables` 生成的变量。

## 引入顺序

先引入组件库样式，再引入自己的主题文件。后引入的变量会覆盖组件库默认值。

```ts
import 'sangyu-ui/style.css';
import './styles/sangyu-theme.css';
```

## 修改品牌色

创建 `src/styles/sangyu-theme.css`：

```css
:root {
	--sy-color-primary: #7c3aed;
	--sy-color-primary-hover: #8b5cf6;
	--sy-color-primary-active: #6d28d9;
	--sy-color-primary-select: #f3e8ff;
}
```

建议同时设置主色的默认、悬停、激活和选中状态，避免组件在交互过程中回到默认蓝色。

## 修改状态色

```css
:root {
	--sy-color-success: #16a34a;
	--sy-color-success-hover: #22c55e;
	--sy-color-success-active: #15803d;
	--sy-color-success-select: #dcfce7;

	--sy-color-warning: #f59e0b;
	--sy-color-warning-hover: #fbbf24;
	--sy-color-warning-active: #d97706;
	--sy-color-warning-select: #fef3c7;

	--sy-color-error: #ef4444;
	--sy-color-error-hover: #f87171;
	--sy-color-error-active: #dc2626;
	--sy-color-error-select: #fee2e2;
}
```

## 修改基础界面颜色

```css
:root {
	--sy-color-text: #1f2937;
	--sy-color-text-secondary: #6b7280;
	--sy-color-text-disabled: #9ca3af;
	--sy-color-border: #d1d5db;
	--sy-color-divider: #e5e7eb;
	--sy-color-bg: #f9fafb;
}
```

## 局部主题

CSS Variables 会按照 DOM 层级继承，因此可以只为页面中的一部分组件设置主题。

```css
.purple-theme {
	--sy-color-primary: #7c3aed;
	--sy-color-primary-hover: #8b5cf6;
	--sy-color-primary-active: #6d28d9;
	--sy-color-primary-select: #f3e8ff;
}
```

```vue
<template>
	<section class="purple-theme">
		<SyButton>紫色主题按钮</SyButton>
	</section>
</template>
```

Drawer、Tooltip、Notification 等浮层组件可能渲染到 `body`。这类组件需要将变量设置在 `:root`、`body`，或者实际接收浮层的容器上。

## 常用变量

| 变量                        | 默认值      | 作用         |
| --------------------------- | ----------- | ------------ |
| `--sy-color-primary`        | `#1677ff`   | 品牌主色     |
| `--sy-color-primary-hover`  | `#4096ff`   | 主色悬停状态 |
| `--sy-color-primary-active` | `#0958d9`   | 主色激活状态 |
| `--sy-color-primary-select` | `#e6f4ff`   | 主色选中背景 |
| `--sy-color-success`        | `#52c41a`   | 成功状态色   |
| `--sy-color-warning`        | `#faad14`   | 警告状态色   |
| `--sy-color-error`          | `#ff4d4f`   | 错误状态色   |
| `--sy-color-text`           | `#000000e0` | 主要文字颜色 |
| `--sy-color-text-secondary` | `#000000a6` | 次要文字颜色 |
| `--sy-color-text-disabled`  | `#00000040` | 禁用文字颜色 |
| `--sy-color-border`         | `#d9d9d9`   | 默认边框颜色 |
| `--sy-color-divider`        | `#0505050f` | 分割线颜色   |
| `--sy-color-bg`             | `#f5f5f5`   | 默认浅色背景 |

## 使用组件自身的颜色属性

部分组件提供 `color`、`textColor` 等属性。如果只需要调整单个组件，可以优先使用组件属性；需要统一修改整个应用时，再覆盖主题变量。

```vue
<template>
	<SyButton color="#7c3aed">单个紫色按钮</SyButton>
	<SyButton color="primary">使用主题主色</SyButton>
</template>
```
