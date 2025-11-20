# SyButton 按钮

## Filled类型

<demo src="./demos/filled-button.vue"></demo>

## Border类型

<demo src="./demos/border-button.vue"></demo>

## Flat类型

<demo src="./demos/flat-button.vue"></demo>

## Line类型

<demo src="./demos/line-button.vue"></demo>

## Gradient类型

<demo src="./demos/gradient-button.vue"></demo>

## Relief类型

<demo src="./demos/relief-button.vue"></demo>

## 按钮的尺寸

<demo src="./demos/size.vue"></demo>

## 禁用按钮

<demo src="./demos/disable.vue"></demo>

## 按钮圆角

<demo src="./demos/radius.vue"></demo>

## 跳转按钮

<demo src="./demos/href-button.vue"></demo>

## 按钮的文字颜色

<demo src="./demos/text-color.vue"></demo>

## API

### 属性

| 属性名                 | 类型                                                         | 说明                                                         | 默认值      |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------- |
| type                   | ` 'filled' \| 'border' \| 'flat' \| 'line' \| 'gradient' \| 'relief'` | 按钮视觉样式类型                                             | `'filled'`  |
| size                   | `'small' \| 'default' \| 'large'`                            | 按钮尺寸                                                     | `'default'` |
| disabled               | `boolean`写·                                                 | 是否禁用                                                     | `false`     |
| href                   | `string`                                                     | 配置后点击会跳转到该链接                                     | `''`        |
| color                  | `string`                                                     | 支持主题色关键词 (`primary`/`success`/`warning`/`error`) 或任意自定义 CSS 颜色 | `'primary'` |
| textColor              | `string`                                                     | 文本颜色，同样支持主题色或自定义颜色；为空时跟随类型的默认颜色 | `''`        |
| lineOrigin             | `'left' \| 'right' \| 'center'`                              | `line` 类型的动画起点位置                                    | `'center'`  |
| linePosition           | `'top' \| 'bottom'`                                          | `line` 类型的描边位置                                        | `'bottom'`  |
| radius                 | `'small' \| 'default' \| 'large'`                            | 圆角尺寸                                                     | `'default'` |
| gradientColorSecondary | `string`                                                     | 渐变按钮的第二个颜色值                                       | `''`        |
| customStyle            | `string`                                                     | 追加到按钮上的自定义内联样式（支持任何合法 CSS 字符串）      | `''`        |

### 事件

| 事件名    | 说明                               | 类型                          |
| --------- | ---------------------------------- | ----------------------------- |
| click     | 点击按钮后触发                     | `(event: MouseEvent) => void` |
| mouseover | 鼠标进入按钮区域时触发             | `(event: MouseEvent) => void` |
| mouseout  | 鼠标离开按钮区域时触发             | `(event: MouseEvent) => void` |
| blur      | 按钮失去焦点时触发（如点击后转移焦点） | `(event: MouseEvent) => void` |
