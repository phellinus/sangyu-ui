## form表单的需求分析

## 1. 背景与目标

Form 不是单纯的布局容器，而是负责协调“字段注册、数据绑定、校验、状态展示、提交与重置”的复合组件。它需要允许 `SyInput`、`SySelect`、`SyCheckbox`、`SyRadio`、`SySwitch` 等现有输入类组件以统一方式参与表单。

本组件的目标：

- 提供统一的表单布局、标签、必填标记、帮助信息和错误反馈。
- 基于一个外部 `model` 管理字段值，不在 Form 内维护第二份业务数据。
- 支持同步、异步、跨字段以及嵌套字段校验。
- 提供提交、局部校验、重置、清除错误、滚动到错误字段等能力。
- 保持 Vue 3 Composition API 和 TypeScript 友好。
- 建立输入组件接入协议，使后续组件无需被 Form 特殊适配。

非目标：

- 首期不做低代码表单 Schema 渲染器。
- 不负责接口提交、数据持久化、防重复请求等业务逻辑。
- 不内置复杂栅格系统；布局只消费统一的标签/内容布局参数。
- 不保证与 Ant Design Vue 的内部实现或所有边缘 API 逐项兼容。

## 2. 用户场景

1. 登录、注册等简单纵向表单。
2. 后台编辑页：标签对齐、多个输入控件、提交与重置。
3. 搜索表单：行内布局、部分字段可选、回车提交。
4. 动态表单：增删联系人、地址等数组字段。
5. 异步校验：用户名、手机号等需服务端确认。
6. 联动校验：确认密码、开始/结束时间、条件必填。
7. 长表单：提交失败后定位并聚焦首个错误字段。

## 3. 组件范围

建议形成三个公开入口：

| 能力       | 建议名称              | 职责                                       |
| ---------- | --------------------- | ------------------------------------------ |
| 表单容器   | `SyForm`              | 提供模型、规则、布局、校验上下文和实例方法 |
| 字段容器   | `SyFormItem`          | 注册字段，渲染标签、控件区、说明与校验状态 |
| 组合式 API | `useForm`（第二阶段） | 脱离组件实例调用校验、重置等能力           |

内部建议拆分为字段注册中心、路径读写工具、校验适配层、布局层和反馈层。公开 API 不应暴露这些内部模块。

## 4. 核心概念

### 4.1 数据模型

- `SyForm` 接收响应式 `model` 对象，字段通过 `name`/`prop` 指向其中的值。
- Form 不复制业务模型，也不通过一个巨大的 `v-model` 替代子控件的双向绑定。
- 字段路径支持字符串、数字或路径数组，例如 `user.name`、`users.0.email`、`['users', 0, 'email']`。
- 文档建议主推 `name`；若需降低已有用户理解成本，可将 `prop` 作为别名，但两者同时传入时必须告警。

### 4.2 字段生命周期

每个 `SyFormItem` 在挂载时注册，卸载时注销，至少保存：

- 字段路径与初始值快照。
- 当前规则、校验状态和错误消息。
- `touched`、`dirty`、`validating` 状态。
- DOM 定位和可聚焦控件引用。

动态字段卸载后默认清除其校验状态，但不主动删除业务模型中的值。

### 4.3 输入组件接入协议

Sangyu UI 输入类组件应满足：

- 通过 `modelValue` / `update:modelValue` 工作。
- 透传或触发 `change`、`blur` 等校验触发事件。
- 支持 `disabled`；只读能力由具体控件决定。
- 最好暴露 `focus()`，供错误定位使用。
- 可接收或被 FormItem 包裹层表达 `aria-invalid`、`aria-describedby`。

现有 `SyInput` 已具备 `modelValue`、更新事件和 `focus/blur` 暴露，是可接入基础；但其事件目前主要是内部处理，实施时需要确认 `blur/change` 是否能稳定被 FormItem 感知。

## 5. 功能需求

### 5.1 布局与展示

支持三种布局：

- `horizontal`：标签和控件横向排列。
- `vertical`：标签位于控件上方。
- `inline`：字段在同一行流式排列，适合搜索表单。

Form 级别配置可被 FormItem 覆盖：

- 标签对齐：左/右。
- 标签与控件宽度或栅格配置。
- 标签换行。
- 冒号显示。
- 必填标记显示策略。
- 字段间距、反馈区最小高度。

FormItem 展示顺序建议为：标签 → 控件 → 附加内容 → 校验错误/帮助信息。`help` 显式传入时优先展示；是否覆盖自动错误信息需写入公开契约，建议覆盖。

### 5.2 校验规则

首期规则类型建议覆盖：

| 规则                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| `required`            | 必填；需定义空字符串、空数组、`null`、`undefined` 的空值语义 |
| `type`                | string、number、boolean、array、object、email、url 等        |
| `min` / `max` / `len` | 字符长度、数值大小或数组长度                                 |
| `pattern`             | 正则校验                                                     |
| `enum`                | 枚举值约束                                                   |
| `whitespace`          | 是否将纯空白字符串视为空                                     |
| `transform`           | 仅用于校验前转换，不应静默改写 model                         |
| `validator`           | 自定义同步/异步校验函数                                      |
| `message`             | 单条规则错误文案                                             |
| `trigger`             | `change`、`blur` 或两者                                      |

规则来源支持：

- Form 级 `rules`，按字段路径组织。
- FormItem 级 `rules`。
- 两者同时存在时合并，FormItem 规则排在字段全局规则之后；不要静默覆盖。
- 规则可以是对象、对象数组，或返回规则的函数，以支持依赖其他字段。

异步校验要求：

- 返回 Promise。
- 新校验开始后，旧校验结果不得覆盖新结果。
- 字段卸载后忽略未完成结果。
- `validating` 期间可展示加载状态。
- 校验异常与“业务校验不通过”应分开处理，避免吞掉程序错误。

### 5.3 校验触发与状态

默认建议：

- 文本输入：`blur`，避免每次键入立即显示错误。
- Select、Checkbox、Radio、Switch：`change`。
- 用户可通过 Form 或规则级 `validateTrigger` 覆盖。
- 首次提交后，错误字段后续变化可即时重校验，提高修正反馈速度。

字段状态：`idle | validating | success | error | warning`。其中 `success` 是否默认展示图标由 `hasFeedback` 控制；无反馈图标时仍保留语义状态。

### 5.4 提交、重置与错误定位

- 原生 `<form>` 语义，监听 `submit` 并阻止默认刷新。
- 提交时校验全部已注册且有规则的字段。
- 校验成功触发 `finish(values)`；失败触发 `finishFailed(errorInfo)`。
- `values` 是当前模型的值快照，避免消费者误以为可安全原地修改原模型。
- 支持 `scrollToFirstError`，可配置滚动行为；滚动后尽量聚焦首个可聚焦控件。
- `resetFields()` 恢复字段首次注册时的初始值并清除交互、错误状态。
- 明确边界：若业务异步加载完数据后才把字段挂载，则该值是初始值；若挂载后再赋值，重置仍回到挂载时快照。可提供刷新初始快照的内部方案，但首期不公开。

## 6. 建议公开 API

### 6.1 SyForm Props

| 属性                   | 类型（概念）                       | 默认值         | 优先级 |
| ---------------------- | ---------------------------------- | -------------- | ------ |
| `model`                | `Record<string, unknown>`          | 必填           | P0     |
| `rules`                | `FormRules`                        | `{}`           | P0     |
| `layout`               | `horizontal \| vertical \| inline` | `horizontal`   | P0     |
| `labelAlign`           | `left \| right`                    | `right`        | P0     |
| `labelWidth`           | `string \| number`                 | -              | P0     |
| `disabled`             | `boolean`                          | `false`        | P0     |
| `validateTrigger`      | trigger 或 trigger[]               | 见控件策略     | P0     |
| `validateOnRuleChange` | `boolean`                          | `true`         | P1     |
| `hideRequiredMark`     | `boolean`                          | `false`        | P1     |
| `colon`                | `boolean`                          | `true`（横向） | P1     |
| `scrollToFirstError`   | `boolean \| ScrollOptions`         | `false`        | P1     |
| `validateMessages`     | 消息模板对象                       | 内置中文       | P1     |
| `size`                 | `small \| default \| large`        | `default`      | P1     |

说明：Ant Design Vue 的 `labelCol/wrapperCol` 可作为后续栅格能力；当前项目尚未看到统一 Grid 组件，首期用 `labelWidth` + CSS 布局更可控。

### 6.2 SyForm Events

| 事件           | 参数                                 | 含义                     |
| -------------- | ------------------------------------ | ------------------------ |
| `submit`       | 原生 SubmitEvent                     | 用户发起提交，可用于观测 |
| `finish`       | values                               | 全量校验成功             |
| `finishFailed` | `{ values, errorFields, outOfDate }` | 全量校验失败             |
| `validate`     | `{ name, status, errors }`           | 单字段校验完成           |

不建议同时设计 `@submit` 自动返回校验结果和 `@finish` 两套同义流程；`submit` 保持原生语义，业务提交统一使用 `finish`。

### 6.3 SyForm Expose / FormInstance

| 方法                                   | 结果                                        | 优先级 |
| -------------------------------------- | ------------------------------------------- | ------ |
| `validateFields(names?)`               | Promise，成功返回值，失败 reject 结构化错误 | P0     |
| `validateField(name)`                  | 校验单字段                                  | P0     |
| `resetFields(names?)`                  | 恢复初始值并清状态                          | P0     |
| `clearValidate(names?)`                | 仅清校验结果                                | P0     |
| `scrollToField(name, options?)`        | 定位字段                                    | P1     |
| `getFieldError(name)`                  | 获取单字段错误                              | P1     |
| `getFieldsError(names?)`               | 获取字段错误列表                            | P1     |
| `isFieldsTouched(names?, allTouched?)` | 查询交互状态                                | P1     |
| `getFieldValue(name)`                  | 获取单值                                    | P2     |
| `setFieldValue(name, value)`           | 设置单值                                    | P2     |

建议避免首期照搬大量命令式 set/get API。Vue 中业务应优先直接读写响应式 model，FormInstance 聚焦校验与状态管理。

### 6.4 SyFormItem Props

| 属性              | 类型（概念）         | 说明                          | 优先级 |
| ----------------- | -------------------- | ----------------------------- | ------ |
| `name`            | `NamePath`           | 字段路径                      | P0     |
| `label`           | string               | 标签                          | P0     |
| `rules`           | Rule 或 Rule[]       | 字段规则                      | P0     |
| `required`        | boolean              | 展示/补充必填约束，语义须统一 | P0     |
| `validateTrigger` | trigger 或 trigger[] | 字段触发方式                  | P0     |
| `help`            | string               | 显式帮助/错误文案             | P0     |
| `validateStatus`  | status               | 外部覆盖状态                  | P1     |
| `hasFeedback`     | boolean              | 显示状态反馈                  | P1     |
| `extra`           | string               | 与错误并存的补充说明          | P1     |
| `labelWidth`      | string 或 number     | 覆盖 Form                     | P1     |
| `showLabel`       | boolean              | 保留布局但可隐藏标签          | P2     |

### 6.5 Slots

`SyForm`：`default`。  
`SyFormItem`：`default`、`label`、`help`、`extra`；状态图标 slot 可列为 P2。

## 7. 错误对象契约

失败结果必须结构稳定，便于业务与测试消费：

```ts
interface ValidateErrorInfo {
  values: Record<string, unknown>
  errorFields: Array<{
    name: Array<string | number>
    errors: string[]
    warnings?: string[]
  }>
  outOfDate: boolean
}
```

同一字段多条规则的执行策略建议默认遇到首错即停；可通过 `validateFirst` 扩展为字段级或全表级首错。错误顺序按照字段注册顺序，再按照规则声明顺序，确保稳定可预测。

## 8. 视觉与交互规范

- 标签和控件的垂直对齐需适配 small/default/large 三种尺寸。
- 必填星号属于视觉提示，不能代替校验规则与无障碍语义。
- error 使用错误色边框/文字；disabled 不触发 hover/focus 视觉。
- 错误文案切换应避免布局突然跳动；是否预留反馈高度由设计系统统一决定。
- 长错误文案允许换行，不遮挡下一个字段。
- inline 模式下错误信息不应撑坏整行；建议允许换行到下一行或由产品选择紧凑展示。
- 动效尊重 `prefers-reduced-motion`。
- 色彩使用项目 token/CSS 变量，不在组件中散落硬编码颜色。

## 9. 无障碍要求

- 使用原生 `<form>`，允许 Enter 提交；textarea 等场景不能误提交。
- Label 与真实输入元素通过 `for/id` 关联；无法关联时使用 `aria-labelledby`。
- 错误状态设置 `aria-invalid="true"`。
- 帮助和错误节点生成稳定 id，通过 `aria-describedby` 关联。
- 动态错误提示可使用适度的 `aria-live="polite"`，避免每次键入造成重复播报。
- 错误定位后将焦点移到控件，而不只是滚动页面。
- 仅靠颜色不可区分状态，应同时有文字或图标。

## 10. 校验引擎技术决策

当前 `packages/sangyu-ui` 没有直接声明校验库。锁文件中出现的 `async-validator` 只是其他可选依赖关系，不能视为本组件可稳定使用的直接依赖。

建议二选一：

1. **采用 `async-validator`（推荐）**：规则能力与 Ant Design Vue 接近、成熟度高；需在 `packages/sangyu-ui/package.json` 明确声明直接依赖，并在外层做字段状态、竞态取消与错误结构适配。
2. **自研轻量校验器**：包体和契约完全可控，但 required/type/嵌套路径/异步竞态/消息模板等边界成本很高，首版风险更大。

无论采用哪种方案，Form 的公开类型应由 Sangyu UI 自己定义，避免消费者直接依赖第三方校验器类型，使未来可替换实现。

## 11. 分阶段范围

### P0：可发布最小版本

- `SyForm`、`SyFormItem`、字段注册/注销。
- model、嵌套路径、Form/FormItem rules。
- required/type/min/max/len/pattern/custom validator。
- change/blur 触发、同步与异步校验、竞态保护。
- horizontal/vertical/inline 布局。
- 标签、必填标记、help、错误状态。
- validate、validateField、resetFields、clearValidate。
- finish、finishFailed、validate 事件。
- Input、Select、Checkbox/Group、Radio/Group、Switch 接入。
- 基础无障碍和单元测试。

### P1：完整实用版本

- `scrollToFirstError` / `scrollToField` 和聚焦。
- validateMessages 与全局中文模板。
- touched/dirty 查询、反馈图标、warning 状态。
- 动态数组字段的完整测试。
- `useForm`。
- Form 级 disabled/size 可靠下传。

### P2：增强版本

- 栅格 `labelCol/wrapperCol`（待 Grid 能力稳定后）。
- 并行/串行首错策略高级配置。
- 状态图标插槽、复杂消息模板、国际化注入。
- 面向超大型表单的性能优化与虚拟化协作。
- Schema Form 作为独立上层组件评估，不塞入基础 Form。

## 12. 验收标准

### 功能验收

- 必填、格式、范围、正则和自定义异步规则结果正确。
- 修改嵌套字段只影响对应字段，数组增删后路径与错误能正确对应。
- 快速连续输入时，旧异步结果不会覆盖新结果。
- `validateFields()` 的成功值和失败结构稳定。
- `resetFields()` 恢复初始值，并清除错误、touched、dirty、validating。
- 动态卸载字段后不再参与校验，也不被未完成 Promise 回写状态。
- 全局规则与字段规则合并顺序可预测。
- 提交成功/失败事件各只触发一次。

### 兼容验收

- 现有主流 Sangyu 输入组件均能显示错误状态并按预期触发校验。
- 表单整体 disabled 时，子控件不可交互；子控件显式 disabled 始终优先。
- SSR/首次水合不依赖浏览器 DOM；滚动与聚焦只在客户端执行。
- TypeScript 能从公开类型中约束 NamePath、Rule、FormInstance。

### 无障碍验收

- 键盘可完成填写、提交、重置。
- label、help、error 与输入框关联正确。
- 首错滚动后焦点可见。
- 屏幕阅读器能识别必填与错误状态。

## 13. 测试计划

- 单元测试：路径工具、规则合并、空值判断、消息生成、竞态处理。
- 组件测试：布局、插槽、字段注册、事件、方法、动态挂载卸载。
- 集成测试：每一种现有输入组件与 FormItem 的接入。
- 异步测试：延迟倒序返回、组件卸载、规则变化、重复提交。
- 可访问性测试：属性关联、焦点、键盘提交。
- 类型测试：合法/非法 NamePath、规则函数和实例方法参数。
- 视觉回归：三种布局、三种尺寸、disabled/error/success、长文案。

## 14. 风险与待确认项

1. **校验依赖**：是否接受新增 `async-validator` 直接依赖。
2. **API 命名**：统一使用 `name`，还是兼容当前 Vue 社区常见的 `prop`。
3. **输入事件协议**：现有控件能否一致提供 blur/change/focus，以及 Form 级 disabled/size 下传方式。
4. **布局系统**：项目暂无明确统一 Grid 时，不应提前承诺 Ant Design Vue 式 `labelCol/wrapperCol`。
5. **初始值语义**：异步回填页面必须明确何时建立 reset 快照。
6. **动态数组**：按索引作为路径时，删除中间项会导致后续字段路径变化，实施时需在重新注册和错误迁移间选择清晰策略；建议索引变化后清除受影响字段错误并重校验。
7. **`required` 二义性**：FormItem 的 required 不能只画星号而不参与规则，也不能与 rules 产生重复错误；建议它补充一条 required 规则，仅在现有规则未声明 required 时生效。

## 15. 推荐结论

建议首版以“Ant Design Vue 的使用心智 + Sangyu UI 自有 API 类型”为方向：保留 Form/FormItem、model、rules、validate/reset/scroll 等成熟概念，但先完成 P0，不照搬 Grid、全部实例方法和历史兼容项。

实现顺序建议为：字段路径与注册机制 → 校验适配层 → FormItem 状态展示 → 提交/重置 → 现有控件接入 → 无障碍与测试。发布前必须先确定校验依赖和输入组件事件协议，这两项会直接决定 Form 的稳定性。