# @sangyu-ui/icons

Sangyu UI 的 Vue 3 SVG 图标组件包，支持直接使用图标组件，也支持通过 `SyIcon` 按名称渲染和注册自定义图标。

## 安装

```bash
pnpm add @sangyu-ui/icons
```

也可以使用 npm：

```bash
npm install @sangyu-ui/icons
```

项目需要安装 Vue 3.5 或更高版本。

## 引入样式

使用 `SyIcon` 的尺寸、旋转和占位样式时，需要在应用入口引入 CSS：

```ts
import '@sangyu-ui/icons/style.css';
```

如果项目已经引入 `sangyu-ui/style.css`，不需要再次引入图标样式。

## 直接使用图标组件

```vue
<script setup lang="ts">
import { SySearch, SySetting } from '@sangyu-ui/icons';
import '@sangyu-ui/icons/style.css';
</script>

<template>
	<SySearch />
	<SySetting />
</template>
```

图标使用 `currentColor`，可以通过 CSS 的 `color` 和 `font-size` 控制颜色及尺寸：

```vue
<SySearch style="color: #1677ff; font-size: 24px" />
```

## 使用 SyIcon

内置图标已经注册到图标表中，可以通过名称使用：

```vue
<script setup lang="ts">
import { SyIcon } from '@sangyu-ui/icons';
import '@sangyu-ui/icons/style.css';
</script>

<template>
	<SyIcon name="search" :size="24" color="primary" />
	<SyIcon name="setting" size="1.5em" color="#7c3aed" />
	<SyIcon name="loading" :size="20" spin />
</template>
```

### SyIcon 属性

| 属性          | 类型               | 默认值      | 说明                                |
| ------------- | ------------------ | ----------- | ----------------------------------- |
| `name`        | `string`           | `''`        | 已注册的图标名称                    |
| `component`   | `Component`        | `null`      | 直接传入图标组件                    |
| `size`        | `string \| number` | `'1em'`     | 图标尺寸，数字会转换为 px           |
| `color`       | `string`           | `undefined` | 图标颜色，支持主题色名称和 CSS 颜色 |
| `strokeWidth` | `number`           | `undefined` | SVG 描边宽度                        |
| `spin`        | `boolean`          | `false`     | 是否启用旋转动画                    |

## 注册自定义图标

```ts
import { registerIcon } from '@sangyu-ui/icons';
import BrandLogo from './BrandLogo.vue';

registerIcon('brand-logo', BrandLogo, {
	aliases: ['brand', 'logo'],
});
```

注册后可以通过名称使用：

```vue
<SyIcon name="brand-logo" :size="32" />
```

也可以一次注册多个图标：

```ts
import { registerIcons } from '@sangyu-ui/icons';
import BrandLogo from './BrandLogo.vue';
import ProductLogo from './ProductLogo.vue';

registerIcons({
	'brand-logo': BrandLogo,
	'product-logo': ProductLogo,
});
```

## 注册表 API

| API                   | 说明                       |
| --------------------- | -------------------------- |
| `registerIcon`        | 注册一个图标和可选别名     |
| `registerIcons`       | 批量注册图标               |
| `getIconComponent`    | 根据名称获取图标组件       |
| `listRegisteredIcons` | 获取所有已经注册的图标名称 |

## 问题反馈

如果发现问题，可以前往 [GitHub Issues](https://github.com/phellinus/sangyu-ui/issues) 提交反馈。

## 许可证

ISC License
