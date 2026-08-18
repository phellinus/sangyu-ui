### 1. 组件范围

提供三个组件：

- `SyCheckbox`：单个多选框
- `SyCheckboxGroup`：多选框组
- `SyCheckboxButton`：按钮形态多选框，建议作为 P1

核心能力：

- Boolean 双向绑定
- CheckboxGroup 数组绑定
- 自定义选中值与未选中值
- `checked`、`unchecked`、`indeterminate`
- `hover`、`focus`、`disabled`、`loading`
- Small、Default、Large 三档尺寸
- 横向与纵向分组
- 最少、最多选择数量限制
- 自定义选中图标
- 标签前置、后置
- 点击完整标签区域切换

### 2. API 设计

#### SyCheckbox

| 属性            | 类型            | 默认值   | 说明                 |
| --------------- | --------------- | -------- | -------------------- | --------- | ---- |
| `modelValue`    | `CheckboxValue` | `false`  | 当前绑定值           |
| `value`         | `CheckboxValue` | `true`   | Group 中该选项的值   |
| `trueValue`     | `CheckboxValue` | `true`   | 单独使用时的选中值   |
| `falseValue`    | `CheckboxValue` | `false`  | 单独使用时的未选中值 |
| `indeterminate` | `boolean`       | `false`  | 半选状态，仅控制表现 |
| `disabled`      | `boolean`       | `false`  | 禁用                 |
| `loading`       | `boolean`       | `false`  | 加载中，同时禁止操作 |
| `size`          | `small          | default  | large`               | `default` | 尺寸 |
| `label`         | `string`        | -        | 标签文本             |
| `labelPosition` | `before         | after`   | `after`              | 标签位置  |
| `lineThrough`   | `boolean`       | `false`  | 选中后标签删除线     |
| `name`          | `string`        | -        | 原生 `name`          |
| `id`            | `string`        | 自动生成 | 原生 `id`            |
| `color`         | `string`        | 主题主色 | 自定义颜色，P1       |
| `customStyle`   | `CSSProperties` | -        | 自定义样式           |

事件：

```
update:modelValue(value: CheckboxValue): void
change(value: CheckboxValue, checked: boolean): void
```

插槽：

- `default`：标签内容
- `icon`：选中图标
- `indeterminateIcon`：半选图标，P1

#### SyCheckboxGroup

| 属性         | 类型              | 默认值    | 说明         |
| ------------ | ----------------- | --------- | ------------ | --------- | -------- |
| `modelValue` | `CheckboxValue[]` | `[]`      | 已选值       |
| `disabled`   | `boolean`         | `false`   | 禁用整个组   |
| `min`        | `number`          | -         | 最少选择数量 |
| `max`        | `number`          | -         | 最多选择数量 |
| `size`       | `small            | default   | large`       | `default` | 统一尺寸 |
| `direction`  | `horizontal       | vertical` | `horizontal` | 排列方向  |
| `name`       | `string`          | -         | 子项统一名称 |

事件：

```
update:modelValue(value: CheckboxValue[]): void
change(value: CheckboxValue[]): void
```

### 3. 行为规范

- 点击控件或标签均可切换状态。
- 获得焦点后按 `Space` 切换。
- `disabled` 和 `loading` 状态不得触发值更新。
- 达到 `max` 后，未选项进入限制禁用状态。
- 达到 `min` 后，已选项不可继续取消。
- Group 内通过 `value` 判断是否选中。
- 对象值需要深比较，不能只比较引用。
- `indeterminate` 只表示视觉状态，业务方负责更新实际选中值。
- Group 的 `disabled` 和 `size` 优先级高于子组件。
- 每次用户操作只触发一次 `change`。

### 4. 视觉规范

沿用当前 [Figma Checkbox 设计](https://www.figma.com/design/xAiNg6FARpR8L2TzhmOF4z/checkbox?node-id=43-2)：

- 控件尺寸：`14 / 16 / 20px`
- 圆角：`4 / 5 / 6px`
- 标签间距：`6 / 8 / 10px`
- Group 间距：行 `12px`，列 `16px`
- 动画时间：`160-200ms`
- Focus Ring：`3px primary-3`
- 选中状态使用 `--sy-color-primary`
- 半选使用横线图标
- 禁用状态使用 `--sy-color-bg` 和 `--sy-color-text-disabled`

### 5. 验收要求

- 完成键盘操作和焦点可见性测试。
- 支持表单提交所需的原生 `input` 属性。
- `aria-checked="mixed"` 正确表达半选状态。
- 覆盖单独绑定、Group、min/max、对象值、禁用和加载测试。
- 提供基础、尺寸、半选、分组、限制、加载和 CheckboxButton 示例。
- 从 `components.ts` 导出全部公开组件和类型。
