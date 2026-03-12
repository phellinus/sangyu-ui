# SyCard 卡片组件

## 基础用法

<demo src="./demos/basic-card.vue"></demo>

## 插槽结构

<demo src="./demos/slot-card.vue"></demo>

## 阴影模式

<demo src="./demos/shadow-card.vue"></demo>

## 自定义样式

<demo src="./demos/custom-card.vue"></demo>

## API

### 属性

| 属性名       | 类型                             | 说明                                    | 默认值     |
| ------------ | -------------------------------- | --------------------------------------- | ---------- |
| shadow       | `'always' \| 'never' \| 'hover'` | 阴影模式                                | `'always'` |
| customStyle  | `string`                         | 卡片容器的自定义内联样式                | `''`       |
| headerStyle  | `string`                         | 头部区域的自定义内联样式                | `''`       |
| bodyStyle    | `string`                         | 内容区域的自定义内联样式                | `''`       |
| footerStyle  | `string`                         | 底部区域的自定义内联样式                | `''`       |
| borderRadius | `string \| number`               | 卡片圆角尺寸（数值默认会被拼接为 `px`） | `'20'`     |

### 插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 卡片主体内容 |
| header  | 头部区域内容 |
| footer  | 底部区域内容 |
