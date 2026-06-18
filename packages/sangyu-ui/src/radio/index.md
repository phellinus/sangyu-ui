# SyRadio 单选框

`SyRadio` 用于在一组选项中选择唯一结果，适合表单、筛选栏、配置项切换等场景。当前提供三类能力：

- `SyRadio`：基础单选，可独立使用，也可接入分组
- `SyRadioGroup`：统一维护选中值、尺寸、方向和禁用状态
- `SyRadioButton`：按钮化单选，更适合筛选和视图切换

## 基础用法

<demo src="./demos/basic-radio.vue"></demo>

## 尺寸与形状

<demo src="./demos/size-radio.vue"></demo>

## 分组用法

<demo src="./demos/group-radio.vue"></demo>

## 按钮风格

<demo src="./demos/basic-radio-button.vue"></demo>

## 按钮尺寸

<demo src="./demos/button-size-radio.vue"></demo>

## 禁用与纵向排列

<demo src="./demos/disabled-radio.vue"></demo>

## API

### SyRadio Props

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| modelValue | `boolean` | 独立使用时的选中状态 | `false` |
| label | `string \| number \| boolean` | 分组模式下的选项值 | `undefined` |
| disabled | `boolean` | 是否禁用 | `false` |
| shape | `'circle' \| 'square'` | 单选形态 | `'circle'` |
| size | `'small' \| 'default' \| 'large'` | 单选尺寸 | `'default'` |
| name | `string` | 原生 `radio` 的 `name` | `''` |
| content | `string` | 无默认插槽时的文本内容 | `''` |
| customStyle | `string` | 自定义内联样式 | `''` |

### SyRadioButton Props

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| modelValue | `boolean` | 独立使用时的选中状态 | `false` |
| label | `string \| number \| boolean` | 分组模式下的选项值 | `undefined` |
| disabled | `boolean` | 是否禁用 | `false` |
| size | `'small' \| 'default' \| 'large'` | 按钮尺寸 | `'default'` |
| name | `string` | 原生 `radio` 的 `name` | `''` |
| content | `string` | 无默认插槽时的文本内容 | `''` |
| customStyle | `string` | 自定义内联样式 | `''` |

### SyRadioGroup Props

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| modelValue | `string \| number \| boolean` | 当前选中的值 | `undefined` |
| disabled | `boolean` | 是否禁用整个分组 | `false` |
| name | `string` | 传递给子项的原生 `name` | `''` |
| size | `'small' \| 'default' \| 'large'` | 统一控制子项尺寸 | `'default'` |
| direction | `'horizontal' \| 'vertical'` | 排列方向 | `'horizontal'` |
| customStyle | `string` | 自定义内联样式 | `''` |

### Events

| 组件 | 事件名 | 说明 |
| --- | --- | --- |
| `SyRadio` | `update:modelValue` / `change` | 独立使用时切换选中状态触发 |
| `SyRadioButton` | `update:modelValue` / `change` | 独立使用时切换选中状态触发 |
| `SyRadioGroup` | `update:modelValue` / `change` | 分组内选中项切换时触发 |

### 使用建议

- 需要“开关式”的单个选项时，可以直接使用 `SyRadio`
- 需要在多个互斥选项之间切换时，优先使用 `SyRadioGroup`
- 做筛选器、视图切换、套餐切换时，推荐使用 `SyRadioButton + SyRadioGroup`
