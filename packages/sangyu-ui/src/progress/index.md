# SyProgress 进度条

进度条用于表达某项任务、上传、加载或流程执行的完成情况。相比纯数字，它能更快速地传递当前状态，也更适合放在表单提交、资源处理、下载上传和仪表盘类界面中。

## 基础用法

<demo src="./demos/basic-progress.vue"></demo>

## 圆形进度

<demo src="./demos/circle-progress.vue"></demo>

## 颜色、尺寸与圆角

<demo src="./demos/custom-progress.vue"></demo>

## 设计建议

- `line` 更适合列表、表单或内容区块中的任务进度展示。
- `circle` 更适合概览卡片、统计模块或强调单一指标的场景。
- `showInfo` 适合需要明确数值反馈的界面；若视觉上希望更简洁，可关闭数字展示。
- `size` 在 `line` 模式下表示线条厚度，在 `circle` 模式下表示圆形直径。
- `borderRadius` 仅作用于 `line` 模式，传 `0` 可得到更硬朗的方角样式。

## API

### 属性

| 属性名       | 类型                 | 说明                                                              | 默认值                  |
| ------------ | -------------------- | ----------------------------------------------------------------- | ----------------------- |
| percentage   | `number`             | 当前进度值，组件内部会自动限制在 `0 ~ 100`                        | `0`                     |
| type         | `'line' \| 'circle'` | 进度条类型                                                        | `'line'`                |
| showInfo     | `boolean`            | 是否展示百分比信息                                                | `true`                  |
| color        | `string`             | 进度主色，支持 `primary / success / warning / error` 或自定义颜色 | `'primary'`             |
| trackColor   | `string`             | 轨道颜色，支持主题色或自定义颜色                                  | `''`                    |
| size         | `number`             | `line` 下表示高度，`circle` 下表示直径                            | `line: 8 / circle: 120` |
| borderRadius | `number`             | 线形进度条圆角大小，仅 `line` 生效                                | `999`                   |
| customStyle  | `string`             | 自定义内联样式                                                    | `''`                    |

## 行为说明

- 当 `percentage` 小于 `0` 时按 `0` 处理，大于 `100` 时按 `100` 处理。
- 未传 `trackColor` 时，会基于主色自动生成更浅的轨道颜色。
- 组件自带 `progressbar` 语义属性，便于在页面中表达可感知的完成度。
