# SyTabs 标签页

使用 `SyTabs` 与 `SyTabPane` 组织同级内容。标签为单行滚动，当前标签会滚入可视区域。

<demo src="./demos/basic-tabs.vue"></demo>

## API

| 组件      | 属性           | 类型                     | 默认值       | 说明                                                        |
| --------- | -------------- | ------------------------ | ------------ | ----------------------------------------------------------- |
| SyTabs    | `v-model`      | `string \| number`       | 首个可用面板 | 受控当前项，更新事件为 `update:modelValue`，另发出 `change` |
| SyTabs    | `defaultValue` | `string \| number`       | 首个可用面板 | 非受控初值                                                  |
| SyTabs    | `orientation`  | `horizontal \| vertical` | `horizontal` | 标签方向                                                    |
| SyTabs    | `activation`   | `automatic \| manual`    | `automatic`  | 键盘焦点移动时是否立即激活                                  |
| SyTabs    | `lazy`         | `boolean`                | `false`      | 面板首次激活时才挂载，之后保持挂载                          |
| SyTabPane | `name`         | `string \| number`       | 必填         | 唯一标识                                                    |
| SyTabPane | `label`        | `string`                 | 空字符串     | 标签文字                                                    |
| SyTabPane | `disabled`     | `boolean`                | `false`      | 禁止选择                                                    |

默认所有面板挂载，未激活面板隐藏。当前面板动态删除时，选择最近的可用项。方向键、Home、End 可移动焦点并跳过禁用项；手动模式使用 Enter 或 Space 激活。

主题可通过 `components.tabs` 覆盖 `color`、`activeColor`、`borderColor`、`indicatorColor`、`padding`、`gap` 与 `panelPadding`。
