# SyTable 表格

在保持轻量的同时提供列配置、列/表头固定以及插槽自定义等常见能力的表格组件。

## 基础用法

<demo src="./demos/basic-table.vue"></demo>

## 插槽自定义列

<demo src="./demos/slots-table.vue"></demo>

## 固定表头 + 列固定

<demo src="./demos/fixed-table.vue"></demo>

## API

### SyTable Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 通过配置项声明列，等价于直接写 `sy-table-column` 插槽 | `ColumnType[]` | `[]` |
| `data` | 表格数据源 | `Record<string, any>[]` | `[]` |
| `height` | 限制表格可视高度（`number` 会自动转 px），设置后启用固定表头 | `number \| string` | `-` |

### ColumnType

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 列头显示的文字 | `string` | `-` |
| `key` | 读取 `data` 中的字段名 | `string` | `-` |
| `width` | 列宽度，支持数字（像素） | `number` | `-` |
| `align` | 列内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| `slots` | 自定义渲染，等价于 `sy-table-column` 的默认插槽 | `Slots` | `-` |
| `fixed` | 固定该列到左侧，需要配合明确的 `width` 值 | `boolean` | `false` |

### Slots

- `default`：使用 `<sy-table-column>` 手动描述列时注入，作用域参数 `{ row, column, $index }`，可自由组合按钮、图标等内容。
