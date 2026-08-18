# SyTable 表格

SyTable 是一个面向数据展示的表格组件，支持配置式列、声明式列、固定列、横向滚动、表体纵向滚动、加载态、空状态和作用域插槽

设置 scroll.y 时，纵向滚动条只出现在表体区域，表头不会进入纵向滚动容器。设置 scroll.x 后，表头和表体会同步横向滚动

## 基础用法

<demo src="./demos/basic-table.vue"></demo>

## 插槽与自定义渲染

<demo src="./demos/slots-table.vue"></demo>

## 固定列与表体滚动

<demo src="./demos/fixed-table.vue"></demo>

## API

### SyTable Props

| 名称         | 说明                                      | 类型                        | 默认值   |
| ------------ | ----------------------------------------- | --------------------------- | -------- |
| `columns`    | 通过配置项声明列                          | `TableColumn<RecordType>[]` | `[]`     |
| `dataSource` | 表格数据源，推荐使用该名称                | `RecordType[]`              | `[]`     |
| `data`       | `dataSource` 的兼容别名                   | `RecordType[]`              | `[]`     |
| rowKey       | 行唯一键，可以传字段名或函数              | string 或函数               | key      |
| `scroll.x`   | 横向滚动宽度，支持数字、CSS 宽度或 `true` | number 或 string 或 true    | -        |
| `scroll.y`   | 表体最大高度，纵向滚动条只出现在表体      | number 或 string            | -        |
| loading      | 显示加载遮罩                              | boolean                     | false    |
| emptyText    | 没有数据时的默认文案                      | string                      | 暂无数据 |
| bordered     | 是否显示单元格边框                        | boolean                     | false    |
| striped      | 是否显示斑马纹                            | boolean                     | false    |
| size         | 表格尺寸                                  | small 或 middle 或 large    | middle   |
| rowClassName | 自定义行类名                              | string 或函数               | -        |

### TableColumn

| 名称         | 说明                                      | 类型                     | 默认值 |
| ------------ | ----------------------------------------- | ------------------------ | ------ |
| title        | 列头显示的内容                            | VNodeChild 或函数        | -      |
| key          | 列唯一标识                                | string 或 number         | -      |
| dataIndex    | 读取数据字段，支持点路径或数组路径        | string 或 number 或数组  | -      |
| width        | 列宽度，支持数字或 CSS 宽度               | number 或 string         | -      |
| minWidth     | 最小列宽                                  | number 或 string         | -      |
| align        | 列内容对齐方式                            | left 或 center 或 right  | left   |
| fixed        | 固定到左侧或右侧，需要配合明确的 width 值 | boolean 或 left 或 right | false  |
| ellipsis     | 内容超出时显示省略号                      | boolean                  | false  |
| customRender | 配置式自定义单元格渲染                    | 函数                     | -      |
| slots        | 配置式表头和单元格插槽                    | TableColumnSlots         | -      |

### Slots

- bodyCell：自定义表体单元格，作用域参数 { text, value, record, row, column, index, rowIndex }
- headerCell：自定义表头单元格，作用域参数 { column }
- empty：自定义空状态内容
- loading：自定义加载内容
- default：使用 sy-table-column 声明列时，接收列数组插槽

### SyTableColumn

也可以使用 sy-table-column 声明列，支持 title、data-index、width、min-width、align、fixed、ellipsis 和默认作用域插槽。配置式 columns 和声明式列二选一，columns 优先级更高
