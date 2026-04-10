# Step 组件设计说明

## 基础需求

1. 组件由父级 `sy-steps` 和子级 `sy-step` 组成。
2. `sy-steps` 使用默认插槽承载多个 `sy-step`。
3. `sy-steps` 支持 `active` 指定当前激活步骤，支持 `direction` 切换横向/纵向布局。
4. `sy-step` 支持 `title`、`description`、`icon`、`status` 等属性；未设置 `status` 时根据父级 `active` 自动推导。
5. `sy-step` 支持 `icon`、`title`、`description` 三个具名插槽，用于覆盖默认渲染。

## 状态设计

- `wait`: 默认待处理状态。
- `process`: 当前进行中的步骤。
- `finish`: 已完成步骤。
- `error`: 异常或失败步骤。

自动推导规则：

- `index < active` => `finish`
- `index === active` => `process`
- `index > active` => `wait`

如果单个 `sy-step` 显式传入 `status`，则覆盖自动推导结果。

## 视觉设计建议

- 横向模式强调流程推进感，适合向导、分步表单、订单进度等场景。
- 纵向模式强调信息可读性，适合描述文案较长、节点说明较多的场景。
- 已完成步骤使用更强的确认感样式；进行中步骤需要明确聚焦；未开始步骤保持弱化；异常步骤使用高识别度提醒。
- 图标区域既支持自动数字/状态图标，也支持业务侧用插槽替换成更贴近场景的内容。

## 文档建议

- 在组件文档中明确 `active` 为从 `0` 开始的索引。
- 至少提供基础、纵向、自定义内容三个示例。
- API 中说明 `status` 与 `active` 的优先级关系。

## 测试建议

- 验证 `active` 对自动状态的推导是否正确。
- 验证 `direction` 是否会切换布局类名。
- 验证 `status` 显式传入时能覆盖自动状态。
- 验证 `icon`、`title`、`description` 插槽是否正确渲染。
