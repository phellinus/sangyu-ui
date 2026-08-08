# Form 表单

用于数据录入、校验、提交和重置。

## 何时使用

- 收集具有明确字段结构的数据，例如登录、注册和资料编辑
- 在提交前进行同步、异步或跨字段校验
- 需要统一管理字段状态、禁用状态、尺寸和错误反馈

## 基础使用

通过 `model` 管理表单数据，通过 `rules` 配置校验规则。原生提交会被 Form 接管，校验通过后触发 `finish`，校验失败时触发 `finishFailed`。

<demo src="./demos/basic-form.vue"></demo>

## 表单布局

Form 提供水平、垂直和行内三种布局。示例可以实时切换布局，观察标签和控件的排列方式。

<demo src="./demos/layout-form.vue"></demo>

## 常用校验规则

展示必填、长度、类型、正则表达式、校验触发方式和 `warningOnly` 警告规则。

<demo src="./demos/validation-form.vue"></demo>

## 异步校验

自定义校验函数可以返回 Promise，适合用户名占用检查等需要请求服务端的场景。

<demo src="./demos/async-validation-form.vue"></demo>

## 自定义与跨字段校验

校验函数可以读取完整表单模型，适合确认密码、日期范围等字段相互依赖的场景。

<demo src="./demos/custom-validation-form.vue"></demo>

## 动态增减字段

动态挂载的 FormItem 会自动注册，卸载时会自动注销。使用稳定 ID 作为字段路径，可以避免删除中间项后其他字段路径发生变化。

<demo src="./demos/dynamic-form.vue"></demo>

## 禁用状态与尺寸继承

Form 的 `disabled` 和 `size` 会传递给支持表单上下文的子控件，子控件的显式配置具有更高优先级。

<demo src="./demos/form-state.vue"></demo>

## Form 实例方法

通过组件 `ref` 调用校验、重置、清除校验、字段读写、错误查询和滚动聚焦等实例方法。

<demo src="./demos/form-methods.vue"></demo>

## API

### Form 属性

| 属性                    | 说明                               | 类型                                              | 默认值               |
| ----------------------- | ---------------------------------- | ------------------------------------------------- | -------------------- |
| model                   | 表单数据模型                       | `Record<string, unknown>`                         | 必填                 |
| rules                   | 表单校验规则                       | `FormRules`                                       | `{}`                 |
| layout                  | 表单布局                           | `'horizontal' \| 'vertical' \| 'inline'`          | `'horizontal'`       |
| label-align             | 标签文字对齐方式                   | `'left' \| 'right'`                               | `'right'`            |
| label-width             | 标签统一宽度，数字按照 px 处理     | `string \| number`                                | `undefined`          |
| disabled                | 是否禁用表单及内部支持上下文的控件 | `boolean`                                         | `false`              |
| size                    | 内部控件的统一尺寸                 | `'small' \| 'default' \| 'large'`                 | `'default'`          |
| colon                   | 水平布局下是否在标签后显示冒号     | `boolean`                                         | `true`               |
| hide-required-mark      | 是否隐藏必填标记                   | `boolean`                                         | `false`              |
| validate-trigger        | 默认校验触发方式                   | `'change' \| 'blur' \| Array<'change' \| 'blur'>` | `['change', 'blur']` |
| validate-on-rule-change | rules 变化后是否重新校验已注册字段 | `boolean`                                         | `true`               |
| scroll-to-first-error   | 提交失败后是否滚动到第一个错误字段 | `boolean \| FormScrollOptions`                    | `false`              |
| custom-style            | 表单根元素的自定义样式             | `string \| CSSProperties`                         | `undefined`          |

### Form 事件

| 事件          | 说明                               | 回调参数                                     |
| ------------- | ---------------------------------- | -------------------------------------------- |
| submit        | 原生 submit 事件被 Form 接管后触发 | `(event: SubmitEvent) => void`               |
| finish        | 所有字段校验通过后触发             | `(values: Record<string, unknown>) => void`  |
| finish-failed | 表单校验失败后触发                 | `(errorInfo: ValidateErrorInfo) => void`     |
| validate      | 单个字段完成校验后触发             | `(result: { name, status, errors }) => void` |

### Form 实例方法

| 方法            | 说明                                       | 类型                                                       |
| --------------- | ------------------------------------------ | ---------------------------------------------------------- |
| validateFields  | 校验全部字段或指定字段，成功后返回数据快照 | `(names?: NamePath[]) => Promise<Record<string, unknown>>` |
| validateField   | 校验一个指定字段                           | `(name: NamePath) => Promise<void>`                        |
| resetFields     | 重置全部字段或指定字段的值和状态           | `(names?: NamePath[]) => void`                             |
| clearValidate   | 清除全部字段或指定字段的校验状态           | `(names?: NamePath[]) => void`                             |
| scrollToField   | 将指定字段滚动到可视区域并尝试聚焦         | `(name: NamePath, options?: FormScrollOptions) => void`    |
| getFieldError   | 获取指定字段的错误信息                     | `(name: NamePath) => string[]`                             |
| getFieldsError  | 获取全部字段或指定字段的错误信息           | `(names?: NamePath[]) => FieldError[]`                     |
| isFieldsTouched | 判断字段是否已经被用户操作                 | `(names?: NamePath[], allTouched?: boolean) => boolean`    |
| getFieldValue   | 获取指定字段的当前值                       | `(name: NamePath) => unknown`                              |
| setFieldValue   | 设置指定字段的值                           | `(name: NamePath, value: unknown) => void`                 |

### FormItem 属性

| 属性             | 说明                                 | 类型                                                      | 默认值      |
| ---------------- | ------------------------------------ | --------------------------------------------------------- | ----------- |
| name             | 字段在 model 中的数据路径            | `NamePath`                                                | `undefined` |
| label            | 字段标签                             | `string`                                                  | `undefined` |
| rules            | 当前字段的独立校验规则               | `FormRule \| FormRule[]`                                  | `undefined` |
| required         | 是否为必填字段，同时合并一条必填规则 | `boolean`                                                 | `false`     |
| validate-trigger | 当前字段的校验触发方式               | `ValidateTrigger \| ValidateTrigger[]`                    | 继承 Form   |
| help             | 手动指定帮助或错误信息               | `string`                                                  | `undefined` |
| extra            | 显示在校验信息下方的补充说明         | `string`                                                  | `undefined` |
| validate-status  | 手动指定校验状态                     | `'' \| 'validating' \| 'success' \| 'warning' \| 'error'` | `undefined` |
| has-feedback     | 是否显示校验反馈图标                 | `boolean`                                                 | `false`     |
| label-width      | 当前字段标签宽度，优先于 Form 配置   | `string \| number`                                        | 继承 Form   |
| show-label       | 是否显示标签区域                     | `boolean`                                                 | `true`      |
| custom-style     | FormItem 根元素的自定义样式          | `string \| CSSProperties`                                 | `undefined` |

### FormItem 插槽

| 插槽    | 说明                 |
| ------- | -------------------- |
| default | 表单控件内容         |
| label   | 自定义字段标签       |
| help    | 自定义帮助或校验信息 |
| extra   | 自定义补充说明       |

### FormRule

| 属性        | 说明                       | 类型                                          |
| ----------- | -------------------------- | --------------------------------------------- |
| required    | 是否必填                   | `boolean`                                     |
| type        | 期望的数据类型             | `FormRuleType`                                |
| min         | 最小数值或最小长度         | `number`                                      |
| max         | 最大数值或最大长度         | `number`                                      |
| len         | 固定数值或固定长度         | `number`                                      |
| enum        | 允许的值集合               | `FormRuleEnumValue[]`                         |
| pattern     | 需要匹配的正则表达式       | `RegExp`                                      |
| whitespace  | 是否将纯空白字符串视为空值 | `boolean`                                     |
| message     | 校验失败时的提示信息       | `string`                                      |
| trigger     | 当前规则的校验触发方式     | `ValidateTrigger \| ValidateTrigger[]`        |
| warningOnly | 是否只产生警告且不阻止提交 | `boolean`                                     |
| transform   | 校验前转换字段值           | `(value: unknown) => unknown`                 |
| validator   | 自定义同步或异步校验函数   | `(rule, value, model) => FormValidatorReturn` |
