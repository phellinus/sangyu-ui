# SySpace 间距

在按钮、标签和短文本之间设置间距。组件使用单个 `inline-flex` 容器，子项直接参与布局，间距由原生 `gap` 实现。

## 基础用法

<demo src="./demos/basic-space.vue"></demo>

## 方向与分隔

<demo src="./demos/split-space.vue"></demo>

## API

| 属性        | 类型                                                                 | 默认值                        | 说明                                      |
| ----------- | -------------------------------------------------------------------- | ----------------------------- | ----------------------------------------- |
| `size`      | `'small' \| 'medium' \| 'large' \| number \| [horizontal, vertical]` | `'medium'`                    | 数字单位为 px；元组分别设置水平与垂直间距 |
| `direction` | `'horizontal' \| 'vertical'`                                         | `'horizontal'`                | 子项排列方向                              |
| `align`     | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'`            | 水平 `center`，垂直 `stretch` | 交叉轴对齐方式                            |
| `wrap`      | `boolean`                                                            | `false`                       | 是否换行                                  |
| `split`     | `string \| number`                                                   | —                             | 有效子项之间的分隔内容                    |

`size` 元组的两个值均可为预设尺寸或数字，例如 `:size="['small', 16]"`。预设间距对应 `--sy-space-gap-small`、`--sy-space-gap-medium` 和 `--sy-space-gap-large` 主题变量。

| 插槽      | 说明                                             |
| --------- | ------------------------------------------------ |
| `default` | 子项；注释、空 Fragment 和空白文本不参与分隔计算 |
| `split`   | 自定义分隔内容，优先于 `split` 属性              |

`split` 只在两个有效子项之间渲染。组件不会为每个子项增加包装元素。
