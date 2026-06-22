# SyCheckbox 多选框

Checkbox 用于标记一个或多个可同时成立的选项，适合协议确认、功能配置、批量筛选和任务状态等场景：

- `SyCheckbox`：基础多选框，支持布尔值、自定义真假值和数组绑定
- `SyCheckboxGroup`：统一维护选中值、排列方向、尺寸、禁用状态和数量限制

组件内置选中背景缩放与边框扩散动效，并尊重系统的“减少动态效果”设置。

## 基础用法

<demo src="./demos/basic-checkbox.vue"></demo>

## 尺寸

<demo src="./demos/size-checkbox.vue"></demo>

## 状态

<demo src="./demos/state-checkbox.vue"></demo>

## 自定义值与数组绑定

<demo src="./demos/value-checkbox.vue"></demo>

## 多选框组

<demo src="./demos/group-checkbox.vue"></demo>

## 分组排列与尺寸

<demo src="./demos/group-layout-checkbox.vue"></demo>

## 数量限制与禁用

<demo src="./demos/group-limit-checkbox.vue"></demo>

## 标签与外观

<demo src="./demos/custom-checkbox.vue"></demo>

## API

### SyCheckbox Props

| 属性名               | 类型                               | 说明                                       | 默认值      |
| -------------------- | ---------------------------------- | ------------------------------------------ | ----------- |
| modelValue / v-model | `CheckboxValue \| CheckboxValue[]` | 当前绑定值；可使用布尔值、自定义值或数组   | `false`     |
| value                | `CheckboxValue`                    | 数组绑定时代表当前选项的值                 | `true`      |
| trueValue            | `CheckboxValue`                    | 单值模式下选中时写入的值                   | `true`      |
| falseValue           | `CheckboxValue`                    | 单值模式下取消选中时写入的值               | `false`     |
| indeterminate        | `boolean`                          | 是否显示半选状态；只改变视觉与无障碍状态   | `false`     |
| disabled             | `boolean`                          | 是否禁用交互                               | `false`     |
| loading              | `boolean`                          | 是否显示加载状态；加载时不可交互           | `false`     |
| size                 | `'small' \| 'default' \| 'large'`  | 复选框尺寸                                 | `'default'` |
| label                | `string`                           | 无默认插槽和 `content` 时显示的文本        | `undefined` |
| content              | `string`                           | 无默认插槽时显示的文本，优先级高于 `label` | `undefined` |
| labelPosition        | `'before' \| 'after'`              | 标签显示在控件之前或之后                   | `'after'`   |
| lineThrough          | `boolean`                          | 选中后是否为标签添加删除线                 | `false`     |
| name                 | `string`                           | 原生 `input` 的 `name`                     | `undefined` |
| id                   | `string`                           | 原生 `input` 的 `id`；未传入时自动生成     | 自动生成    |
| color                | `string`                           | 选中状态的主题色，支持合法 CSS 颜色值      | 主题主色    |
| customStyle          | `string \| CSSProperties`          | 根元素的自定义内联样式                     | `undefined` |

`CheckboxValue` 为 `string | number | boolean | Record<string, unknown>`。

### SyCheckboxGroup Props

| 属性名               | 类型                              | 说明                             | 默认值         |
| -------------------- | --------------------------------- | -------------------------------- | -------------- |
| modelValue / v-model | `CheckboxValue[]`                 | 当前已选值数组                   | `[]`           |
| disabled             | `boolean`                         | 是否禁用组内全部复选框           | `false`        |
| min                  | `number`                          | 最少必须保留的选中数量           | `undefined`    |
| max                  | `number`                          | 最多允许选中的数量               | `undefined`    |
| size                 | `'small' \| 'default' \| 'large'` | 统一设置子项尺寸                 | `'default'`    |
| direction            | `'horizontal' \| 'vertical'`      | 组内选项的排列方向               | `'horizontal'` |
| name                 | `string`                          | 传递给子项原生 `input` 的 `name` | `''`           |
| customStyle          | `string \| CSSProperties`         | Group 根元素的自定义内联样式     | `undefined`    |

### Events

| 组件              | 事件名            | 回调参数                                        | 说明                                 |
| ----------------- | ----------------- | ----------------------------------------------- | ------------------------------------ |
| `SyCheckbox`      | update:modelValue | `(value: CheckboxModelValue)`                   | 有效交互后更新绑定值                 |
| `SyCheckbox`      | change            | `(value: CheckboxModelValue, checked: boolean)` | 值发生变化时触发，并返回最终选中状态 |
| `SyCheckboxGroup` | update:modelValue | `(value: CheckboxValue[])`                      | 有效交互后更新完整的已选值数组       |
| `SyCheckboxGroup` | change            | `(value: CheckboxValue[])`                      | 已选值变化时触发                     |

### Slots

| 组件              | 插槽名  | 参数                         | 说明                   |
| ----------------- | ------- | ---------------------------- | ---------------------- |
| `SyCheckbox`      | default | -                            | 自定义标签内容         |
| `SyCheckbox`      | icon    | `{ checked, indeterminate }` | 自定义选中区域图标     |
| `SyCheckboxGroup` | default | -                            | 放置 `SyCheckbox` 子项 |

### 使用建议

- 少量选项可以直接绑定同一个数组；需要统一配置时优先使用 `SyCheckboxGroup`
- 存在“部分子项已选”的父级选项时使用 `indeterminate`，并由业务逻辑同步其绑定值
- 异步提交期间使用 `loading`，避免用户重复切换
- 为 Group 中的每个选项设置稳定且唯一的 `value`，不要依赖显示文本作为业务值
- 同时设置 `min` 和 `max` 时，应保证 `0 ≤ min ≤ max`
