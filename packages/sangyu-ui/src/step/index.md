# SySteps 步骤条

步骤条用于拆解一段连续流程，把当前进度、已完成节点和后续待办清晰地呈现出来。它适合注册引导、订单履约、审批流、发布流程等带有阶段感的界面。

## 基础用法

<demo src="./demos/basic-steps.vue"></demo>

## 纵向排列

<demo src="./demos/vertical-steps.vue"></demo>

## 自定义图标与内容

<demo src="./demos/custom-steps.vue"></demo>

## 设计建议

- `active` 使用从 `0` 开始的索引，便于直接对应数组位置。
- 未单独设置 `status` 时，组件会根据 `active` 自动推导 `finish / process / wait`。
- 当步骤说明较长时，优先使用 `direction="vertical"`，避免横向布局拥挤。
- 如果业务节点存在失败、驳回、异常中断等状态，可以给单个 `SyStep` 显式设置 `status="error"`。

## API

### SySteps 属性

| 属性名      | 类型                         | 说明                            | 默认值         |
| ----------- | ---------------------------- | ------------------------------- | -------------- |
| active      | `number`                     | 当前激活步骤的索引，从 `0` 开始 | `0`            |
| direction   | `'horizontal' \| 'vertical'` | 步骤条方向                      | `'horizontal'` |
| customStyle | `string`                     | 自定义内联样式                  | `''`           |

### SyStep 属性

| 属性名      | 类型                                         | 说明                                     | 默认值      |
| ----------- | -------------------------------------------- | ---------------------------------------- | ----------- |
| title       | `string`                                     | 步骤标题                                 | `''`        |
| description | `string`                                     | 步骤描述文案                             | `''`        |
| icon        | `string`                                     | 图标名称，渲染为 `SyIcon`                | `''`        |
| status      | `'wait' \| 'process' \| 'finish' \| 'error'` | 当前步骤状态；不传时由 `active` 自动推导 | `undefined` |
| customStyle | `string`                                     | 当前步骤自定义内联样式                   | `''`        |

### SySteps 插槽

| 名称    | 说明                                 |
| ------- | ------------------------------------ |
| default | 默认插槽，仅支持 `SyStep` 作为子节点 |

### SyStep 插槽

| 名称        | 说明               |
| ----------- | ------------------ |
| icon        | 自定义步骤图标区域 |
| title       | 自定义标题内容     |
| description | 自定义描述内容     |

### 状态规则

| 条件                   | 自动状态  |
| ---------------------- | --------- |
| `stepIndex < active`   | `finish`  |
| `stepIndex === active` | `process` |
| `stepIndex > active`   | `wait`    |

如果单个步骤显式传入 `status`，则以该步骤自身设置为准。
