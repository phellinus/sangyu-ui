# SyBreadCrumb 面包屑

## 基础用法

<demo src="./demos/basic-breadcrumb.vue"></demo>

## 分隔符

<demo src="./demos/separator-breadcrumb.vue"></demo>

## 点击事件

<demo src="./demos/click-breadcrumb.vue"></demo>

## API

### SyBreadCrumb 属性

| 属性名        | 类型                    | 说明                                         | 默认值      |
| ------------- | ----------------------- | -------------------------------------------- | ----------- |
| separator     | `string`                | 分隔符文本（`separatorIcon` 存在时优先生效） | `'/'`       |
| separatorIcon | `string`                | 分隔符图标名称（渲染为 `SyIcon`）            | `''`        |
| customStyle   | `string`                | 自定义内联样式（任何合法 CSS 字符串）        | `''`        |
| handleClick   | `(to?: string) => void` | 点击面包屑项时触发，参数为当前项的 `to`      | `undefined` |

### SyBreadcrumbItem 属性

| 属性名 | 类型     | 说明                                                     | 默认值      |
| ------ | -------- | -------------------------------------------------------- | ----------- |
| to     | `string` | 当前项的标识/路径，点击时会作为 `handleClick` 的参数传出 | `undefined` |

### SyBreadCrumb 插槽

| 名称    | 说明                                           |
| ------- | ---------------------------------------------- |
| default | 默认插槽，仅支持 `SyBreadcrumbItem` 作为子节点 |

### SyBreadcrumbItem 插槽

| 名称    | 说明                                  |
| ------- | ------------------------------------- |
| default | 当前项内容（可放文本/图标等任意节点） |
