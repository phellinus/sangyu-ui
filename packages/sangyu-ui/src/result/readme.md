    1.清晰传达状态
        •用户一眼知道发生了什么
    2.强化情绪表达
        •成功 → 正反馈
        •失败 → 提示修复路径
    3.引导下一步行为
        •提供明确 CTA（按钮）
    4.统一全局状态表达规范
        •避免各页面风格不一致

# 核心功能需求

1. 状态类型（Status）

```typescript
type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
```

各状态含义：
状态 场景
success 操作成功
error 操作失败
info 提示信息
warning 警告
404 页面不存在
403 无权限
500 服务异常 2. 图标 / 插画（Icon）

需求：
• 默认根据 status 自动匹配图标
• 支持自定义 icon

布局类型

（1）居中布局（默认）
• 图标 + 文本 + 按钮居中

（2）紧凑型（嵌入式）
• 用于卡片/局部区域

## 组件设计补充

- 组件命名为 `SyResult`，用于沉淀全局统一的状态反馈表达，避免各页面重复拼装成功/失败页。
- 默认布局应偏页面级、居中、情绪更完整；`compact` 布局应偏局部反馈、可嵌入卡片或抽屉。
- 视觉上要强化状态感，但不能让颜色过度刺眼，建议使用“状态主色 + 柔和背景面”的组合。
- 对于 `403 / 404 / 500` 这类异常状态，默认视觉不一定是普通小图标，可以使用更具识别度的数字化展示。

## 推荐接口

```ts
type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
type ResultLayout = 'default' | 'compact';

interface ResultProps {
	status?: ResultStatus;
	title?: string;
	subTitle?: string;
	icon?: string;
	layout?: ResultLayout;
	customStyle?: string;
}
```

## 插槽设计建议

- `icon`: 覆盖默认图标或异常数字视觉。
- `title`: 自定义标题内容。
- `subTitle`: 自定义副标题内容。
- `default`: 承载补充说明、说明列表、错误原因等扩展内容。
- `extra`: 承载按钮 CTA，是结果页中最重要的下一步引导区域。

## 文档建议

- 至少提供基础状态、带操作按钮、紧凑型异常状态三个示例。
- 文档中说明 `compact` 适合局部反馈而非完整页面。
- 说明 `403 / 404 / 500` 默认视觉与普通状态不同。

## 测试建议

- 验证状态默认标题是否正确。
- 验证 `compact` 与 `default` 的类名和结构变化。
- 验证异常状态默认展示数字视觉。
- 验证 `icon` 插槽优先级高于 `icon` 属性。
- 验证 `extra` 和默认插槽是否正确渲染。
