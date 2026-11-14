# SyTabs 标签页

在同一内容区域切换关联面板。组件采用组合式写法，通过 `SyTabPane` 声明标签；支持线型/卡片样式、四个导航位置、受控状态、键盘导航和按需挂载。

## 基础线型

默认使用 `line` 样式；`defaultValue` 指定非受控初始标签。

<demo src="./demos/basic-tabs.vue"></demo>

## 受控切换与外部控制

`v-model` 由父组件保存当前名称；点击标签会发出 `update:modelValue`，也会发出 `change`。外部按钮可直接更新同一个值。

<demo src="./demos/controlled-tabs.vue"></demo>

## 卡片样式

<demo src="./demos/card-tabs.vue"></demo>

## 导航位置

`tabPosition` 支持上、右、下、左四个位置。

<demo src="./demos/position-tabs.vue"></demo>

## 对齐方式

<demo src="./demos/alignment-tabs.vue"></demo>

## 禁用标签

禁用项不可激活，键盘导航会跳过它。

<demo src="./demos/disabled-tabs.vue"></demo>

## 关闭与新增

`removable` / `editable` 显示关闭按钮，`showAddButton` 显示新增按钮；组件只发出 `remove` / `add` 事件。消费者需要在事件处理器里更新面板数组，并按需更新当前项。`closable="false"` 可保护单个面板。

<demo src="./demos/editable-tabs.vue"></demo>

## 附加内容、标题与图标

`extra` 插槽位于导航末尾；面板可用 `title`、`icon`、`iconPosition` 或 `title` 插槽定制标签。

<demo src="./demos/extra-tabs.vue"></demo>

## 自定义颜色与主题

`color` 只作用于当前 Tabs 实例；`ThemeProvider` 的 `components.tabs` Token 作用于其子树。

<demo src="./demos/theme-tabs.vue"></demo>

## 手动键盘激活与延迟挂载

在 `activation="manual"` 下，方向键只移动焦点，Enter 或 Space 才切换面板。`lazy` 让面板首次激活时挂载，之后保持挂载。

<demo src="./demos/keyboard-lazy-tabs.vue"></demo>

## API

### SyTabs Props

| 属性                             | 类型                                  | 默认值       | 说明                                                                            |
| -------------------------------- | ------------------------------------- | ------------ | ------------------------------------------------------------------------------- |
| `v-model`                        | `string \| number`                    | 首个可用标签 | 受控当前项；更新时发出 `update:modelValue` 和 `change`。                        |
| `defaultValue`                   | `string \| number`                    | 首个可用标签 | 非受控初始项。                                                                  |
| `activeKey` / `defaultActiveKey` | `string \| number`                    | —            | Arco 风格别名；`modelValue` / `defaultValue` 优先，也支持 `v-model:activeKey`。 |
| `type`                           | `line \| card`                        | `line`       | 标签视觉样式。                                                                  |
| `tabPosition` / `position`       | `top \| right \| bottom \| left`      | `top`        | 导航栏位置；`tabPosition` 优先。                                                |
| `orientation` / `direction`      | `horizontal \| vertical`              | 根据位置推导 | 方向兼容配置；`vertical` 将导航放在左侧。                                       |
| `alignment`                      | `default \| center \| right \| fixed` | `default`    | 导航项的排列方式。                                                              |
| `size`                           | `mini \| small \| medium \| large`    | `medium`     | 标签项尺寸。                                                                    |
| `activation`                     | `automatic \| manual`                 | `automatic`  | 方向键移动焦点时是否同步切换面板。手动模式按 Enter 或 Space 激活。              |
| `trigger`                        | `click \| hover`                      | `click`      | 切换触发方式；键盘导航始终可用。                                                |
| `lazy` / `lazyLoad`              | `boolean`                             | `false`      | 首次激活时挂载面板，之后保持挂载。                                              |
| `removable`                      | `boolean`                             | `false`      | 显示可关闭按钮；实际移除由父组件更新面板数据完成。                              |
| `editable`                       | `boolean`                             | `false`      | 显示可编辑模式；可用 `showAddButton` 显示新增按钮。                             |
| `showAddButton`                  | `boolean`                             | `false`      | 在可编辑模式显示新增按钮。                                                      |
| `autoSwitch`                     | `boolean`                             | `false`      | 新面板加入后切换到最后一个面板。                                                |
| `color`                          | `string`                              | 主题主色     | 覆盖当前实例的激活文字和指示器颜色。                                            |
| `className`                      | `string`                              | —            | 根节点自定义类名。                                                              |
| `customStyle`                    | `string \| CSSProperties`             | —            | 根节点自定义样式。                                                              |

### SyTabs Events

| 事件                | 参数                     | 说明                                           |
| ------------------- | ------------------------ | ---------------------------------------------- |
| `update:modelValue` | `name: string \| number` | 当前项变更时更新 v-model。                     |
| `change`            | `name: string \| number` | 当前项变更时触发。                             |
| `tabClick`          | `name, event`            | 用户点击标签时触发。                           |
| `remove` / `delete` | `name, event`            | 用户点击关闭按钮时触发；组件不会自行删除标签。 |
| `add`               | `event`                  | 用户点击新增按钮时触发；组件不会自行创建标签。 |

### SyTabs Slots

| 插槽      | 说明                         |
| --------- | ---------------------------- |
| `default` | 放置一个或多个 `SyTabPane`。 |
| `extra`   | 放在导航栏末尾的附加内容。   |

### SyTabPane Props 和 Slots

| 属性 / 插槽       | 类型               | 默认值  | 说明                                 |
| ----------------- | ------------------ | ------- | ------------------------------------ |
| `name`            | `string \| number` | 必填    | 标签的唯一标识。                     |
| `label` / `title` | `string`           | `name`  | 导航项标题，`title` 优先。           |
| `disabled`        | `boolean`          | `false` | 禁止激活。                           |
| `closable`        | `boolean`          | `true`  | 在可关闭或可编辑模式下允许关闭该项。 |
| `icon`            | `VNodeChild`       | —       | 标签图标。                           |
| `iconPosition`    | `left \| right`    | `left`  | 图标位置。                           |
| `title` 插槽      | —                  | —       | 自定义标签标题内容。                 |
| `default` 插槽    | —                  | —       | 面板内容。                           |

方向键会跳过禁用项，Home/End 移动到首个/末个可用项。导航保持单行滚动，激活项会滚入可见区域。Tab 与面板通过 `aria-controls`、`aria-labelledby` 关联。

线型底部指示器默认宽 `30px`，可在 `SyTabs` 的 `customStyle` 中设置 `--sy-tabs-indicator-width`（例如 `40px`）；指示器仍会在当前标签下居中。

组件主题可通过 `ThemeProvider` 的 `components.tabs` 覆盖文字、激活色、边框、表面、间距、圆角和尺寸 Token；根节点的 `color` 与 `customStyle` 可用于单实例定制。
