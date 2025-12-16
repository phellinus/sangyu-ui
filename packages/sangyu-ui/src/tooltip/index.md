# SyTooltip 提示

轻量的提示组件，基于 `@floating-ui/vue` 实现，提供颜色、展示形式、触发方式、箭头等多种定制能力。可通过 props 直接传入 `content`，也可使用具名插槽 `#content` 渲染更复杂的结构。

```vue
<template>
  <SyTooltip content="气泡内容" placement="bottom">
    <SyButton>Hover me</SyButton>
  </SyTooltip>
</template>
```

## 基础用法

最常见的 hover 触发提示，默认展示 `filled` 样式与箭头。

<demo src="./demos/basic-tooltip.vue"></demo>

## 自定义背景色

通过 `color` prop 直接设置背景色，内部会自动计算透明度与箭头颜色。

<demo src="./demos/color-tooltip.vue"></demo>

## 类型（type）

支持三种风格：`filled`、`border`、`border-thick`，适配不同的品牌或信息层级需求。

<demo src="./demos/border-tooltip.vue"></demo>
<demo src="./demos/border-thick.vue"></demo>

## 触发方式

`trigger` 默认为 `hover`，若需要点击后才展示可以改为 `click`。

<demo src="./demos/trigger-tooltip.vue"></demo>

## 控制箭头

通过 `showArrow` 关闭箭头，或使用 `arrowSize` 调整箭头尺寸，从而在空间有限的场景保留更多内容展示空间。

<demo src="./demos/arrow-tooltip.vue"></demo>

## Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `placement` | `Placement` | `top` | 浮层位置，透传给 `@floating-ui/vue`，支持 `top-start`、`bottom-end` 等全部变体。 |
| `content` | `string` | `-` | 简单文本内容；若需要自定义内容可改用 `#content` 插槽。 |
| `trigger` | `'hover' \| 'click'` | `hover` | 控制展示的交互方式。 |
| `type` | `'border' \| 'filled' \| 'border-thick'` | `filled` | 定义背景与边框的视觉样式。 |
| `color` | `string` | `#2C3F51` | 自定义背景色（`filled` 时）或边框色（`border` / `border-thick` 时）。 |
| `showArrow` | `boolean` | `true` | 是否展示箭头。 |
| `arrowSize` | `number` | `6` | 箭头尺寸（像素），会同步影响偏移量。 |
| `customStyle` | `CSSProperties` | `-` | 传入额外样式覆盖默认浮层样式。 |

## Slots

| Slot | 说明 |
| --- | --- |
| `default` | 仅接收单个根元素作为触发节点。 |
| `content` | 自定义提示内容，覆盖 `content` prop。 |

## Tips

- 组件只接受**单个子节点**作为触发器，多于一个子节点时会提示警告。
