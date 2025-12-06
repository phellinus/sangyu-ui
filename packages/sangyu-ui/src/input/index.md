# SyInput 输入框

`SyInput` 是 Sangyu 设计体系中的基础输入组件，支持多种视觉样式、带图标/标签的复合布局、可清空的交互以及密码框等场景。所有样式均通过 CSS 变量与 props 控制颜色、尺寸与线条，可搭配 `SyIcon` 或任意自定义插槽完成复杂表单。

## 视觉类型

### Type: filled

沉浸式填充背景，适合浅色面板中的默认输入框。

<demo src="./demos/filled-input.vue"></demo>

### Type: border

描边强化边界层次，适合卡片或分栏布局。

<demo src="./demos/border-input.vue"></demo>

### Type: label-border

支持浮动标签（label）与描边结合，焦点或有值时标签上浮，占位时贴边显示。

<demo src='./demos/label-border-input.vue'></demo>

### Type: underline

仅保留底边描边，强调轻量表单的输入区域。

<demo src='./demos/underline-input.vue'></demo>

### Type: bottom-line

极简底部线条，常用于密集信息输入或带分割背景的场景。

<demo src='./demos/bottom-line.vue'></demo>

## 功能增强

### 图标输入框

提供 `prefix`/`suffix` 与 `fronticon`/`backicon` 插槽，可插入文字或图标；常用于搜索、金额等复合输入。

<demo src='./demos/icon-input.vue'></demo>

### 密码输入框

`password` 配合 `showPassword` 控制明暗文，天然适配所有类型样式。

<demo src='./demos/password-input.vue'></demo>

### label 模式

`label` prop 让占位词变为浮动标签，搭配 `type="label-border"`、`bgColor`、`labelColor` 可定制表单提示。

<demo src='./demos/label-input.vue'></demo>

### Clearable 输入框

`clearable` 自动注入清空图标，点击后触发 `update:modelValue` 为空字符串。

<demo src='./demos/clearable-input.vue'></demo>

### 禁用态

`disabled` 会阻止交互并应用禁用样式，可结合 `bgColor`/`borderColor` 调整灰阶。

<demo src='./demos/disabled-input.vue'></demo>

## API

### 属性

| 属性名        | 类型                                                               | 说明                                                                                          | 默认值            |
| ------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ----------------- |
| modelValue    | `string`                                                           | 输入框的受控值，需配合 `v-model` 使用                                                         | `''`              |
| placeholder   | `string`                                                           | 占位提示，若同时存在 `label` 则仅在无 label 时展示                                            | `''`              |
| label         | `string`                                                           | 启用浮动标签模式时显示的文本                                                                  | `''`              |
| type          | `'filled' \| 'border' \| 'label-border' \| 'underline' \| 'bottom-line'` | 输入框的视觉样式类型                                                                          | `'filled'`        |
| size          | `'small' \| 'default' \| 'large'`                                  | 控制输入框高度、字体与内边距                                                                  | `'default'`       |
| width         | `string`                                                           | 外层容器宽度，例如 `'320px'`、`'100%'`                                                         | `undefined`       |
| height        | `string`                                                           | 外层容器高度，默认跟随 size                                                                   | `undefined`       |
| bgColor       | `string`                                                           | 背景颜色，支持主题关键字或任何合法 CSS 颜色                                                   | `'#F5F7F8'`       |
| borderColor   | `string`                                                           | 边框颜色                                                                                      | `'rgba(0, 0, 0, 0.2)'` |
| focusColor    | `string`                                                           | 聚焦后描边与标签的高亮颜色                                                                    | `undefined`       |
| labelColor    | `string`                                                           | label 模式的文本颜色                                                                          | `undefined`       |
| textColor     | `string`                                                           | 输入文字与 icon 颜色                                                                          | `'black'`         |
| lineColor     | `string`                                                           | `bottom-line`/`underline` 模式的默认线条颜色                                                   | `'#F1F3F4'`       |
| focuLine      | `string`                                                           | 聚焦时底部线条颜色                                                                            | `undefined`       |
| customStyle   | `string`                                                           | 追加到外层容器的内联 style（例如 `margin: 8px 0;`）                                           | `''`              |
| disabled      | `boolean`                                                          | 是否禁用                                                                                      | `false`           |
| clearable     | `boolean`                                                          | 是否显示清空按钮（当 `modelValue` 非空时）                                                    | `false`           |
| password      | `boolean`                                                          | 是否按照密码框行为渲染，搭配 `showPassword` 控制明/暗文                                       | `false`           |
| showPassword  | `boolean`                                                          | 在 `password` 模式下，是否显示明文（`true`）或掩码（`false`）                                 | `false`           |
| focusBorderColor | `string`                                                        | 兼容字段，等价于 `focusColor`                                                                 | `'primary'`       |

> 额外的原生 `<input>` 属性（如 `autocomplete`）可直接写在 `SyInput` 上，会自动透传给真实输入元素。

### 插槽

| 插槽名     | 说明                               |
| ---------- | ---------------------------------- |
| `prefix`   | 位于输入框最左侧，常用于标签或单位 |
| `fronticon`| 紧贴输入框左侧的图标区域           |
| `suffix`   | 输入框右侧的附加文字/按钮          |
| `backicon` | 紧贴输入框右侧的图标区域           |
| `default`  | 不使用（由组件内部渲染 `<input>`） |

### 事件

| 事件名            | 说明                         | 类型                              |
| ----------------- | ---------------------------- | --------------------------------- |
| `update:modelValue` | 输入内容变化时触发，返回最新值 | `(value: string) => void`         |

### 方法

调用 `ref<InstanceType<typeof SyInput>>()` 后，可使用以下公开方法：

| 方法  | 说明           | 类型                |
| ----- | -------------- | ------------------- |
| focus | 让输入框聚焦   | `() => void`        |
| blur  | 让输入框失焦   | `() => void`        |

> 示例：`const inputRef = ref<typeof SyInputInstance>(); inputRef.value?.focus();`
