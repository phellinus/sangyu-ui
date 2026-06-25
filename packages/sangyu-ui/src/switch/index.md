# SySwitch 开关

Switch 用于在两个互斥状态之间快速切换，强调“即时生效”的反馈体验，适合设置项、状态开关、发布控制和权限启停等场景。

组件支持：

- 布尔值与自定义值双向绑定
- `small / default / large` 三档尺寸
- `round / square` 两类形态
- `loading`、`disabled`、`indeterminate` 状态
- 基于 `SyIcon` 的图标模式
- 按状态切换的文案与具名插槽

## 基础用法

<demo src="./demos/basic-switch.vue"></demo>

## 尺寸与形状

<demo src="./demos/size-switch.vue"></demo>

## 状态展示

<demo src="./demos/state-switch.vue"></demo>

## 自定义值

<demo src="./demos/value-switch.vue"></demo>

## 状态文案插槽

<demo src="./demos/text-switch.vue"></demo>

## 图标与配色

<demo src="./demos/icon-switch.vue"></demo>

## API

### SySwitch Props

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | `boolean \| string \| number` | 当前绑定值 | `false` |
| activeValue | `boolean \| string \| number` | 选中态对应的值 | `true` |
| inactiveValue | `boolean \| string \| number` | 未选中态对应的值 | `false` |
| disabled | `boolean` | 是否禁用交互 | `false` |
| loading | `boolean` | 是否显示加载状态；加载中同时不可交互 | `false` |
| indeterminate | `boolean` | 是否显示半选态；仅改变视觉与 `aria` 状态 | `false` |
| size | `'small' \| 'default' \| 'large'` | 开关尺寸 | `'default'` |
| shape | `'round' \| 'square'` | 开关形状 | `'round'` |
| name | `string` | 原生 `input` 的 `name` | `''` |
| color | `string` | 选中态主色，支持主题色关键词或合法 CSS 颜色值 | `'primary'` |
| inactiveColor | `string` | 未选中态轨道底色 | `'#eef1f4'` |
| checkedText | `string` | 选中态文案 | `''` |
| uncheckedText | `string` | 未选中态文案 | `''` |
| icon | `boolean` | 是否启用图标模式 | `false` |
| iconName | `string` | 单一图标名称，两种状态共用 | `''` |
| activeIconName | `string` | 选中态图标名称 | `''` |
| inactiveIconName | `string` | 未选中态图标名称 | `''` |
| customStyle | `string \| CSSProperties` | 根元素的自定义内联样式 | `''` |

### Events

| 事件名 | 回调参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `(value: SwitchModelValue)` | 有效交互后更新绑定值 |
| change | `(value: SwitchModelValue, checked: boolean)` | 值变化时触发，并返回最终选中状态 |

`SwitchModelValue` 为 `string | number | boolean`。

### Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 默认标签内容；未提供状态插槽时作为统一标签显示 |
| checked | `{ checked, indeterminate, disabled, loading }` | 选中态标签内容 |
| unchecked | `{ checked, indeterminate, disabled, loading }` | 未选中态标签内容 |
| thumb | `{ checked, indeterminate, disabled, loading }` | 圆钮内容，常用于自定义 `SyIcon` |

### Expose

| 方法名 | 说明 |
| --- | --- |
| focus | 聚焦到底层原生 `input` |
| blur | 让底层原生 `input` 失焦 |

## 使用建议

- 需要“即时生效”的布尔配置时优先使用 `SySwitch`
- 需要字符串或数字类型的业务值时，使用 `activeValue / inactiveValue`
- 异步保存配置时使用 `loading`，避免重复切换
- 同时使用图标和文案时，优先保证对比度和信息层级，不要让圆钮内容过于拥挤
- `indeterminate` 更适合表示“部分生效”或“待确认”的视觉态，实际值仍建议由业务层明确维护
