# SySwitch 需求文档

## 1. 组件定位

`SySwitch` 用于表达“开 / 关”这类即时切换的二元状态，适用于：

1. 设置项开关，如消息提醒、自动保存、权限控制
2. 表单中的布尔值录入
3. 列表中的快速启停操作
4. 配置面板中的状态切换

和 `radio`、`checkbox` 的区别：

1. `switch` 更强调“立即生效”的状态切换
2. `checkbox` 更偏向“勾选后统一提交”
3. `radio` 用于多选一，不适合替代 `switch`

## 2. 参考来源

本组件需求参考 `vuesax-alpha` 的 `switch` 设计与实现，重点参考以下能力：

1. 支持自定义激活值和非激活值，而不是只返回 `true / false`
2. 支持加载态，加载时自动禁用交互
3. 支持不确定态 `indeterminate`
4. 支持圆角和方形两类视觉形态
5. 支持按状态切换文案
6. 支持在滑块圆钮或轨道中承载图标，并直接复用 `SyIcon`

参考文件：

1. `/private/tmp/vuesax-alpha/packages/components/switch/src/switch.ts`
2. `/private/tmp/vuesax-alpha/packages/components/switch/src/switch.vue`
3. `/private/tmp/vuesax-alpha/packages/components/switch/src/use-switch.ts`
4. `/private/tmp/vuesax-alpha/docs/components/switch.md`
5. `/private/tmp/vuesax-alpha/packages/theme-chalk/src/switch.scss`

## 3. 设计目标

`SySwitch` 不直接照搬 `vuesax-alpha` 的风格，需求目标应对齐 `sangyu-ui` 现有视觉系统：

1. 延续 `--sy-color-primary`、`--sy-color-border`、`--sy-color-text` 等现有 token
2. 保持与 `radio`、`checkbox`、`input` 同级别的圆角、阴影和动效节奏
3. 视觉上强调精致、轻量、有层次，不做夸张拟物
4. 交互上强调即时反馈和可访问性

## 4. 功能需求

### 4.1 基础能力

1. 支持 `v-model`
2. 支持 `disabled`
3. 支持 `loading`
4. 支持 `small / default / large`
5. 支持自定义 `name`
6. 支持自定义内联样式 `customStyle`
7. 支持 `change` 事件
8. 支持 `focus()` / `blur()` 暴露方法

### 4.2 值语义能力

为了兼容更真实的业务场景，不能只停留在 `boolean`：

1. 支持 `activeValue`
2. 支持 `inactiveValue`
3. `modelValue` 类型建议支持 `boolean | string | number`
4. 当传入值既不是 `activeValue` 也不是 `inactiveValue` 时，需要有明确策略

建议策略：

1. 默认回退到 `inactiveValue`
2. 在开发阶段给出 warning，方便定位异常数据

### 4.3 文案与插槽

参考 `vuesax-alpha` 的状态文案思路，建议拆成更清晰的能力：

1. `checkedText`：选中态文案
2. `uncheckedText`：未选中态文案
3. `default` 插槽：统一说明内容
4. `checked` 插槽：选中态内容
5. `unchecked` 插槽：未选中态内容
6. `thumb` 插槽：圆钮内容，常用于渲染 `SyIcon`

优先级建议：

1. `checked / unchecked` 插槽优先级最高
2. 其次是 `default` 插槽
3. 最后才是 `checkedText / uncheckedText`

### 4.4 视觉扩展能力

1. 支持 `color` 自定义激活态颜色
2. 支持 `inactiveColor` 自定义未激活态底色
3. 支持 `shape`，建议值为 `'round' | 'square'`
4. 支持 `icon` 模式，用于承载圆钮图标或状态图标
5. 图标实现优先复用 `@sangyu-ui/icons` 中的 `SyIcon`
6. 不建议为 `switch` 单独引入新的图标库

## 5. 状态需求

组件至少需要覆盖以下状态：

1. 默认未选中
2. 默认已选中
3. hover 未选中
4. hover 已选中
5. active / pressed
6. focus-visible
7. disabled 未选中
8. disabled 已选中
9. loading
10. indeterminate

其中：

1. `loading` 状态下必须禁止点击切换
2. `indeterminate` 是视觉与语义上的第三态，不应与普通未选中混淆
3. `disabled + loading` 时以 `loading` 反馈为主，但仍不可交互

## 6. 交互需求

1. 点击整个开关容器可以切换
2. 键盘 `Tab` 可聚焦
3. 键盘 `Space` / `Enter` 可触发切换
4. `disabled` 和 `loading` 状态不可切换
5. 状态切换要有平滑过渡，但不应拖沓
6. 焦点态要有清晰可见的 ring，满足可访问性要求

## 7. API 建议

### 7.1 Props

建议最终 props 至少包含：

1. `modelValue?: boolean | string | number`
2. `activeValue?: boolean | string | number`
3. `inactiveValue?: boolean | string | number`
4. `disabled?: boolean`
5. `loading?: boolean`
6. `indeterminate?: boolean`
7. `size?: 'small' | 'default' | 'large'`
8. `shape?: 'round' | 'square'`
9. `color?: string`
10. `inactiveColor?: string`
11. `checkedText?: string`
12. `uncheckedText?: string`
13. `name?: string`
14. `icon?: boolean`
15. `iconName?: string`
16. `activeIconName?: string`
17. `inactiveIconName?: string`
18. `customStyle?: string`

图标相关约定建议如下：

1. 若只需要单一装饰图标，可使用 `iconName`
2. 若选中态和未选中态图标不同，可使用 `activeIconName / inactiveIconName`
3. 上述图标名称统一交给 `SyIcon` 渲染
4. 若业务需要更复杂图标结构，仍以 `thumb` 或状态插槽覆盖为准

### 7.2 Events

建议事件统一为：

1. `update:modelValue`
2. `change`

是否增加 `input` 事件：

1. 若库里整体坚持 Vue 3 简洁风格，可以不单独暴露 `input`
2. 若要参考 `vuesax-alpha` 的兼容性，可以补充 `input`

当前更建议先保持简单，只保留：

1. `update:modelValue`
2. `change`

## 8. 样式与视觉要求

### 8.1 基础视觉

1. 默认高度建议与现有 `input`、`radio` 的尺寸体系对齐
2. 默认形态为圆角胶囊
3. 圆钮需要有轻微高光和阴影
4. 轨道不能只是纯色块，应有轻微层次

### 8.2 尺寸建议

建议尺寸层级：

1. `small`：适合表格或紧凑设置项
2. `default`：常规表单和设置页默认尺寸
3. `large`：适合配置面板或需要更强可点击性的场景

### 8.3 配色要求

1. 默认激活色使用 `var(--sy-color-primary)`
2. hover 态使用 `var(--sy-color-primary-hover)` 或等价混色
3. 激活文案和图标颜色需要和轨道底色形成足够对比
4. disabled 态要统一弱化，不要只降低 opacity
5. 图标尺寸需要跟随 `small / default / large` 自动缩放，避免业务侧手动反复调尺寸

## 9. 可访问性要求

1. 使用原生 `input[type="checkbox"]` 承载语义
2. 需要保留键盘可操作性
3. 需要支持屏幕阅读器读取当前状态
4. 文案型 `switch` 在视觉和语义上都要清晰表达当前状态
5. `disabled`、`loading`、`indeterminate` 状态要能被辅助技术识别

## 10. 测试需求

### 10.1 单元测试

至少覆盖：

1. 默认渲染
2. `v-model` 更新
3. `disabled` 状态不可切换
4. `loading` 状态不可切换
5. `activeValue / inactiveValue` 的映射逻辑
6. `checkedText / uncheckedText` 的显示逻辑
7. 插槽优先级
8. `shape / size / color` 的 class 或 style 生效
9. `indeterminate` 状态渲染

### 10.2 交互测试

1. 点击切换
2. 键盘切换
3. focus 样式
4. 暴露方法 `focus()` / `blur()`

## 11. 文档与 Demo 需求

文档页建议至少提供这些 demo：

1. 基础开关
2. 不同尺寸
3. 禁用和加载态
4. 自定义颜色
5. 文案模式
6. 图标模式，使用 `SyIcon`
7. `activeValue / inactiveValue` 非布尔值场景
8. `indeterminate` 状态
9. 方形模式
10. 设置项组合示例

## 12. 分阶段实现建议

### 第一阶段

先完成核心可用版本：

1. `v-model`
2. `disabled`
3. `loading`
4. `size`
5. `color / inactiveColor`
6. `checkedText / uncheckedText`
7. 基于 `SyIcon` 的基础图标模式
8. 基础测试和 demo

### 第二阶段

补齐增强能力：

1. `activeValue / inactiveValue`
2. `shape`
3. `thumb / checked / unchecked` 插槽
4. `indeterminate`
5. `activeIconName / inactiveIconName`

### 第三阶段

打磨体验：

1. 设置页组合 demo
2. 更完整的无障碍支持
3. 更细的动画和视觉层次
4. 补齐文档说明和边界行为

## 13. 当前结论

参考 `vuesax-alpha` 后，`SySwitch` 不应该只做成一个简单的布尔开关，而应该至少具备以下产品级能力：

1. 立即切换的交互体验
2. 完整状态集
3. 支持业务值映射
4. 支持状态文案和基于 `SyIcon` 的图标扩展
5. 和 `sangyu-ui` 现有 token 与视觉体系一致

如果后续继续开发，建议优先补 `activeValue / inactiveValue`、`shape`、`indeterminate` 和按状态切换的插槽能力，这四项是当前和 `vuesax-alpha` 参考方案相比最明显的能力差距。
