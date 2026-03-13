# SyTag 卡片组件

## 基础用法

<demo src="./demos/basic-tag.vue"></demo>

## 尺寸用法

<demo src="./demos/size-tag.vue"></demo>

## 关闭用法

<demo src="./demos/close-tag.vue"></demo>

## 点击事件用法

<demo src="./demos/click-tag.vue"></demo>

## API

### 属性

| 属性名       | 类型                              | 说明                                                    | 默认值      |
| ------------ | --------------------------------- | ------------------------------------------------------- | ----------- |
| type         | `string`                          | 标签主题色，支持主题色关键词或自定义颜色                | `'primary'` |
| color        | `string`                          | 文字颜色，优先级高于 `type`                             | `''`        |
| bgColor      | `string`                          | 背景颜色，优先级高于 `type`                             | `''`        |
| hit          | `boolean`                         | 是否显示描边边框                                        | `false`     |
| size         | `'small' \| 'default' \| 'large'` | 标签尺寸                                                | `'default'` |
| borderRadius | `number \| string`                | 标签圆角大小，单位为 px                                 | `6`         |
| customStyle  | `string`                          | 追加到标签上的自定义内联样式（支持任何合法 CSS 字符串） | `''`        |
| closable     | `boolean`                         | 是否显示关闭按钮                                        | `false`     |
| clickable    | `boolean`                         | 是否允许点击触发事件                                    | `false`     |

### 插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 标签内容区域 |

### 事件

| 事件名 | 说明               | 类型         |
| ------ | ------------------ | ------------ |
| click  | 点击标签后触发     | `() => void` |
| close  | 点击关闭按钮后触发 | `() => void` |
