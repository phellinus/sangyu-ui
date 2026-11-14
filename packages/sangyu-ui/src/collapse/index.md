# SyCollapse 折叠面板

`SyCollapse` 与 `SyCollapseItem` 通过唯一的 `name` 组成折叠面板。默认支持多个面板同时展开，也可以切换为手风琴模式。

## 基础用法

通过 `defaultValue` 设置初始展开项，省略 `modelValue` 时由组件维护展开状态。

<demo src="./demos/basic-collapse.vue"></demo>

## 受控展开

使用 `v-model` 从外部读取或修改展开项。默认多开模式的值为 `name[]`，`update:modelValue` 与 `change` 返回相同形状的值。

<demo src="./demos/controlled-collapse.vue"></demo>

## 手风琴模式

设置 `accordion` 后，同一时间只展开一个面板，绑定值为 `string | number | undefined`。

<demo src="./demos/accordion-collapse.vue"></demo>

## 禁用与懒加载

`disabled` 阻止单个面板切换。默认内容始终挂载；`lazy` 内容在首次展开时挂载，之后保持挂载。

<demo src="./demos/disabled-lazy-collapse.vue"></demo>

## 自定义插槽

`header` 用于自定义标题，`extra` 用于放置不触发面板切换的额外操作，`expand-icon` 接收当前 `expanded` 状态并替换默认图标。

<demo src="./demos/slots-collapse.vue"></demo>

## API

### SyCollapse 属性

| 属性           | 类型            | 默认值  | 说明                   |
| -------------- | --------------- | ------- | ---------------------- |
| `modelValue`   | `CollapseValue` | —       | 受控展开值             |
| `defaultValue` | `CollapseValue` | —       | 非受控模式的初始展开值 |
| `accordion`    | `boolean`       | `false` | 是否启用手风琴模式     |

### SyCollapseItem 属性

| 属性       | 类型               | 默认值  | 说明                         |
| ---------- | ------------------ | ------- | ---------------------------- |
| `name`     | `string \| number` | —       | 面板唯一标识                 |
| `disabled` | `boolean`          | `false` | 是否禁止切换                 |
| `lazy`     | `boolean`          | `false` | 是否在首次展开时挂载面板内容 |

`CollapseValue` 在多开模式下为 `name[]`，手风琴模式下为 `name | undefined`。省略 `modelValue` 时使用非受控模式。

### 事件

| 事件                | 参数            | 说明                       |
| ------------------- | --------------- | -------------------------- |
| `update:modelValue` | `CollapseValue` | 展开值变化，用于 `v-model` |
| `change`            | `CollapseValue` | 展开值变化时触发           |

### 插槽

| 插槽          | 参数                    | 说明                          |
| ------------- | ----------------------- | ----------------------------- |
| `default`     | —                       | Collapse 的面板列表或面板内容 |
| `header`      | —                       | 面板标题                      |
| `extra`       | —                       | 标题区域右侧的额外操作        |
| `expand-icon` | `{ expanded: boolean }` | 自定义展开图标                |

动态移除面板时，组件会清理对应的展开值。
