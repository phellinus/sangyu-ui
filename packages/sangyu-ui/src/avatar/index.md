# SyAvatar 头像

## 基础用法

<demo src="./demos/basic-avatar.vue"></demo>

## 尺寸

<demo src="./demos/size-avatar.vue"></demo>

## 徽标

<demo src="./demos/badge-avatar.vue"></demo>

## 加载态

<demo src="./demos/loading-avatar.vue"></demo>

## API

### 属性

| 属性名        | 类型                                                           | 说明                               | 默认值           |
| ------------- | -------------------------------------------------------------- | ---------------------------------- | ---------------- |
| bgcolor       | `string`                                                       | 头像背景色，支持主题色或自定义颜色 | `''`             |
| color         | `string`                                                       | 文本/图标颜色                      | `''`             |
| size          | `number`                                                       | 头像尺寸                           | `40`             |
| shape         | `'circle' \| 'square'`                                         | 头像形状                           | `'square'`       |
| loading       | `boolean`                                                      | 是否显示加载态                     | `false`          |
| badge         | `boolean`                                                      | 是否显示圆点 badge                 | `false`          |
| badgeColor    | `string`                                                       | badge 颜色                         | `'primary'`      |
| badgePosition | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | badge 位置                         | `'bottom-right'` |
| badgeOffsetX  | `number`                                                       | badge X 轴偏移量                   | `0`              |
| badgeOffsetY  | `number`                                                       | badge Y 轴偏移量                   | `0`              |
| customStyle   | `string`                                                       | 自定义内联样式                     | `''`             |
| icon          | `string`                                                       | 图标名称                           | `''`             |
| iconsize      | `number`                                                       | 图标大小                           | `-`              |
| src           | `string`                                                       | 图片地址                           | `''`             |

### 插槽

| 插槽名 | 说明                         |
| ------ | ---------------------------- |
| text   | 文本内容插槽（取首字符显示） |
| badge  | 自定义 badge 内容            |
