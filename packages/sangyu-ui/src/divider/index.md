# SyDivider 分割线

分割线用于在信息块、表单区段、列表内容和操作区域之间建立清晰层次。相比简单的灰线，合适的分割线应该既能完成内容分组，又不会抢占页面视觉重心。

## 基础用法

<demo src="./demos/basic-divider.vue"></demo>

## 带文案的分割线

<demo src="./demos/content-divider.vue"></demo>

## 垂直与样式变体

<demo src="./demos/vertical-divider.vue"></demo>

## 设计建议

- 默认水平分割线适合切分内容区块、卡片内部模块和表单段落。
- 带文案的分割线适合表示“更多”“OR”“高级设置”等轻量分组提示。
- 垂直分割线更适合按钮组、行内统计信息和工具栏中的元素区隔。
- `dashed` 与 `dotted` 更偏装饰性，适合弱化层级；常规内容区优先使用 `solid`。
- 当页面本身留白较多时，可以通过 `margin` 调整呼吸感，而不是单纯加深颜色。

## API

### 属性

| 属性名      | 类型                              | 说明                               | 默认值                                      |
| ----------- | --------------------------------- | ---------------------------------- | ------------------------------------------- |
| direction   | `'horizontal' \| 'vertical'`      | 分割线方向                         | `'horizontal'`                              |
| align       | `'left' \| 'center' \| 'right'`   | 带内容时的对齐方式                 | `'center'`                                  |
| variant     | `'solid' \| 'dashed' \| 'dotted'` | 线条样式                           | `'solid'`                                   |
| thickness   | `'thin' \| 'medium' \| 'thick'`   | 线条粗细                           | `'thin'`                                    |
| content     | `string`                          | 分割线文案，不传时可使用默认插槽   | `''`                                        |
| color       | `string`                          | 分割线颜色，支持主题色或自定义颜色 | `''`                                        |
| width       | `string \| number`                | 水平分割线宽度                     | `'100%'`                                    |
| height      | `string \| number`                | 垂直分割线高度                     | `'1em'`                                     |
| margin      | `string \| number`                | 外边距；传数字时自动转为 `px`      | `horizontal: '24px 0' / vertical: '0 10px'` |
| customStyle | `string`                          | 自定义内联样式                     | `''`                                        |

### 插槽

| 名称    | 说明                                        |
| ------- | ------------------------------------------- |
| default | 自定义分割线中间内容，优先于 `content` 属性 |

## 行为说明

- `vertical` 模式仅渲染线条本身，不显示中间内容。
- 当同时传入默认插槽和 `content` 时，优先渲染默认插槽。
- `width` 主要作用于水平分割线，`height` 主要作用于垂直分割线。
