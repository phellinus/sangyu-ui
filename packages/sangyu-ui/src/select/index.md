# SySelect 选择器

`SySelect` 用于从一组选项中选择单个或多个值，适合表单输入、筛选条件、分页条数选择和大数据选项选择等场景。

组件支持：

- 单选与多选
- 可清空、禁用、加载中和选项禁用
- 本地搜索与自定义过滤
- 自定义选项、回显内容、前缀、后缀和多选标签
- 默认开启虚拟滚动，适合大量选项

## 基础用法

<demo src="./demos/basic-select.vue"></demo>

## 可清空与状态

<demo src="./demos/state-select.vue"></demo>

## 多选

<demo src="./demos/multiple-select.vue"></demo>

## 标签模式

<demo src="./demos/label-select.vue"></demo>

## 搜索

<demo src="./demos/search-select.vue"></demo>

## 异步搜索

<demo src="./demos/async-search-select.vue"></demo>

## 自定义内容

<demo src="./demos/custom-select.vue"></demo>

## 大数据

<demo src="./demos/big-data-select.vue"></demo>

## API

### SySelect Props

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | `SelectValue \| SelectValue[] \| undefined` | 当前选中值；多选时为数组 | `undefined` |
| options | `SelectOption[]` | 选项数据 | `[]` |
| placeholder | `string` | 未选中时的占位提示 | `'请选择'` |
| disabled | `boolean` | 是否禁用整个选择器 | `false` |
| loading | `boolean` | 是否展示加载状态 | `false` |
| clearable | `boolean` | 是否允许清空当前值 | `false` |
| multiple | `boolean` | 是否启用多选 | `false` |
| mode | `'default' \| 'label'` | 工作模式；标签模式下输入内容并按 Enter 可创建标签 | `'default'` |
| filterable | `boolean` | 是否启用搜索输入 | `false` |
| remoteMethod | `(query: string, signal: AbortSignal) => void \| Promise<void>` | 远程搜索方法；`signal` 用于取消上一次未完成的请求 | `undefined` |
| remoteDebounce | `number` | 远程搜索防抖时间，单位为毫秒 | `300` |
| filterMethod | `(query: string, option: SelectOption) => boolean` | 自定义本地过滤方法 | `undefined` |
| size | `'small' \| 'default' \| 'large'` | 选择器尺寸 | `'default'` |
| width | `string` | 选择器宽度，例如 `'280px'`、`'100%'` | `undefined` |
| placement | `'top' \| 'bottom'` | 下拉方向，预留配置 | `'bottom'` |
| virtual | `boolean` | 是否启用虚拟滚动 | `true` |
| itemHeight | `string \| number` | 单个选项高度，用于虚拟滚动计算 | `32` |
| listHeight | `string \| number` | 下拉列表最大高度 | `256` |
| overscan | `number` | 虚拟滚动额外渲染数量 | `6` |
| emptyText | `string` | 空状态文本 | `'暂无数据'` |
| max | `number` | 多选时最多允许选择的数量 | `undefined` |
| maxTagCount | `number` | 多选时最多直接展示的标签数量 | `undefined` |
| customStyle | `string \| CSSProperties` | 根元素的自定义内联样式 | `undefined` |

`SelectValue` 为 `string | number | boolean`。

`SelectOption` 结构如下：

```ts
interface SelectOption {
	label: string;
	value: SelectValue;
	disabled?: boolean;
	[key: string]: unknown;
}
```

### Events

| 事件名 | 回调参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `(value: SelectModelValue)` | 选中值变化时触发，用于更新 `v-model` |
| change | `(value: SelectModelValue, option?: SelectOption \| SelectOption[])` | 选中项变化时触发 |
| clear | `()` | 点击清空按钮时触发 |
| search | `(query: string)` | 搜索关键词变化时触发 |
| visibleChange | `(visible: boolean)` | 下拉面板展开或收起时触发 |
| focus | `(event: FocusEvent)` | 选择器获得焦点时触发 |
| blur | `(event: FocusEvent)` | 选择器失去焦点时触发 |

### Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| default | - | 预留插槽，可用于后续扩展声明式选项 |
| option | `{ option, selected, disabled, index }` | 自定义下拉选项内容 |
| label | `{ option, value }` | 自定义选择器内的单选回显内容 |
| prefix | - | 选择器前缀内容 |
| suffix | `{ open, disabled, loading }` | 选择器后缀内容 |
| empty | - | 自定义空状态内容 |
| loading | - | 自定义加载状态内容 |
| tag | `{ option, value, remove, disabled }` | 自定义多选标签内容 |

## 使用建议

- 少量固定选项直接使用 `options`，保持数据结构稳定。
- 选项数量较大时保持 `virtual` 开启，并确保 `itemHeight` 与实际选项高度一致。
- 多选场景建议设置稳定且唯一的 `value`，不要依赖 `label` 作为业务值。
- 远程搜索时由业务层更新 `options`，组件会展示最新传入的数据。
- 使用 `filterMethod` 时，应保证函数只负责判断是否展示选项，不在函数内部修改外部状态。
