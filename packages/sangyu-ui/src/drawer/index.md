# Drawer 抽屉

Drawer 是从页面边缘滑出的浮层面板，用于在不离开当前页面的情况下承载表单、详情、筛选条件和辅助操作。

组件支持四个出现方向、自定义尺寸、遮罩与关闭行为、关闭后销毁、Teleport 挂载、页面滚动锁、键盘交互和焦点管理。

## 何时使用

- 当前任务需要保留页面上下文，例如查看详情或编辑数据
- 内容比 Dialog 更长，需要独立滚动区域
- 需要从页面边缘展示筛选面板、导航或辅助信息
- 用户完成操作后需要快速返回原页面

对于需要用户立即确认的简短操作，建议使用 Dialog；对于完全独立的复杂流程，建议使用单独页面。

## 基础用法

使用 `v-model:visible` 控制抽屉显示状态。默认从右侧打开，宽度为 `320px`，点击遮罩、关闭按钮或按下 Esc 均可请求关闭。

<demo src="./demos/basic-drawer.vue"></demo>

## 方向与尺寸

`placement` 支持 `top`、`right`、`bottom` 和 `left`。左右方向通过 `width` 设置宽度，上下方向通过 `height` 设置高度，数值类型会自动转换为 `px`。

<demo src="./demos/placement-drawer.vue"></demo>

## 遮罩与关闭方式

通过 `mask` 控制是否显示遮罩，通过 `maskClosable` 控制点击遮罩是否关闭，通过 `closable` 控制标题栏关闭按钮。`customStyle` 作用于抽屉根节点，`zIndex` 用于调整浮层层级。

<demo src="./demos/behavior-drawer.vue"></demo>

## 关闭后销毁

默认情况下，抽屉关闭后会保留内部组件及其状态。开启 `destroyOnClose` 后，关闭抽屉会销毁内部组件，再次打开时会重新创建内容。

<demo src="./demos/destroy-drawer.vue"></demo>

## 自定义挂载位置

抽屉默认通过 Teleport 挂载到 `document.body`。`getContainer` 可以传入 CSS 选择器、HTML 元素或返回 HTML 元素的函数；传入 `false` 时禁用 Teleport，在当前组件位置渲染。

<demo src="./demos/teleport-drawer.vue"></demo>

## 键盘、焦点与事件

抽屉默认支持 Esc 关闭、页面滚动锁、自动聚焦、Tab 焦点循环和关闭后的焦点恢复。多个抽屉同时打开时，只有最上层抽屉响应 Esc 和 Tab 焦点管理。

<demo src="./demos/focus-event-drawer.vue"></demo>

## API

### Props

| 属性名                    | 类型                                                    | 说明                                             | 默认值      |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------------ | ----------- |
| visible / v-model:visible | `boolean`                                               | 是否显示抽屉                                     | `false`     |
| title                     | `string`                                                | 抽屉标题，使用 `title` 插槽时以插槽内容为准      | `undefined` |
| placement                 | `'top' \| 'right' \| 'bottom' \| 'left'`                | 抽屉出现方向                                     | `'right'`   |
| width                     | `string \| number`                                      | 左右方向抽屉的宽度，数值按照 px 处理             | `320`       |
| height                    | `string \| number`                                      | 上下方向抽屉的高度，数值按照 px 处理             | `256`       |
| closable                  | `boolean`                                               | 是否显示标题栏关闭按钮                           | `true`      |
| mask                      | `boolean`                                               | 是否显示遮罩                                     | `true`      |
| maskClosable              | `boolean`                                               | 点击遮罩是否请求关闭抽屉                         | `true`      |
| zIndex                    | `number`                                                | 抽屉根节点的层级                                 | `1000`      |
| destroyOnClose            | `boolean`                                               | 关闭时是否销毁内部组件                           | `false`     |
| getContainer              | `string \| HTMLElement \| (() => HTMLElement) \| false` | Teleport 挂载位置，传入 `false` 时在当前位置渲染 | `'body'`    |
| customStyle               | `string \| CSSProperties`                               | 抽屉根节点的自定义内联样式                       | `undefined` |
| keyboard                  | `boolean`                                               | 是否允许按下 Esc 请求关闭抽屉                    | `true`      |
| lockScroll                | `boolean`                                               | 打开时是否锁定页面滚动                           | `true`      |
| autoFocus                 | `boolean`                                               | 打开后是否自动聚焦抽屉面板                       | `true`      |
| trapFocus                 | `boolean`                                               | 是否将 Tab 焦点限制在抽屉内部                    | `true`      |
| restoreFocus              | `boolean`                                               | 关闭后是否恢复打开前的焦点                       | `true`      |

### Events

| 事件名         | 回调参数                          | 说明                                                                      |
| -------------- | --------------------------------- | ------------------------------------------------------------------------- |
| update:visible | `(visible: boolean) => void`      | 用户请求关闭时触发，用于更新 `visible`，可通过 `v-model:visible` 自动处理 |
| close          | `(originalEvent?: Event) => void` | 点击关闭按钮、点击可关闭的遮罩或按下 Esc 时触发，并返回原始事件           |

直接由父组件将 `visible` 设置为 `false` 不会触发 `close` 事件。

### Slots

| 插槽名    | 说明                                    |
| --------- | --------------------------------------- |
| default   | 抽屉主体内容                            |
| title     | 自定义标题内容，优先级高于 `title` 属性 |
| closeIcon | 自定义关闭按钮图标                      |
| footer    | 抽屉底部操作区域                        |

## 行为说明

### Teleport

- `getContainer` 为字符串时会通过 `document.querySelector` 查找目标元素
- CSS 选择器找不到目标元素时会回退到 `document.body`
- `getContainer` 为 `false` 时只禁用 Teleport，不会改变抽屉自身的 `position: fixed` 定位方式

### 滚动锁

- `lockScroll` 开启后，抽屉会在打开时锁定 `body` 滚动
- 多个抽屉同时打开时使用共享计数，最后一个抽屉关闭后才会恢复页面滚动
- 页面原有的 `overflow` 和 `padding-right` 会在解锁时恢复

### 键盘与焦点

- `keyboard` 开启时，按下 Esc 会触发 `update:visible` 和 `close`
- `autoFocus` 开启时，打开后焦点会移动到抽屉面板
- `trapFocus` 开启时，Tab 和 Shift + Tab 会在抽屉内部循环
- `restoreFocus` 开启时，关闭动画结束后焦点会回到打开抽屉前的元素
- 多层抽屉场景中，只有最上层抽屉处理 Esc 和焦点循环

## 无障碍

- 抽屉面板使用 `role="dialog"`
- 显示遮罩时自动设置 `aria-modal="true"`
- 存在标题时通过 `aria-labelledby` 关联标题节点
- 没有标题时使用默认的 `aria-label="抽屉"`
- 自定义 `closeIcon` 时，关闭按钮仍会保留“关闭抽屉”的无障碍名称

## 使用建议

- 建议始终提供清晰的 `title`，帮助用户理解当前操作上下文
- 表单类抽屉建议在 `footer` 插槽中提供取消和确认操作
- 需要保留未提交内容时保持 `destroyOnClose` 为 `false`
- 对状态敏感或开销较大的内容，可以在关闭后启用销毁
- 非模态辅助面板可以关闭 `mask`，并根据业务需要决定是否启用 `lockScroll`
- 自定义挂载节点时，应确保目标元素在抽屉打开前已经存在
