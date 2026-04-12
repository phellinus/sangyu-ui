# Divider组件需求分析

（1）水平分隔线（默认）
• 横向展示
• 宽度默认 100%
（2）垂直分隔线
• 用于 inline / flex 布局中
• 高度跟随容器 2. 内容支持
带文本分隔线

```
————  OR  ————
```

• 支持中间插入文本（如“OR”、“更多”）
• 文本可对齐：
• 左对齐
• 居中（默认）
• 右对齐

3. 样式变体（Variants）
   （1）线条类型
   • solid（默认）
   • dashed
   • dotted
   （2）粗细（Thickness）
   • thin（1px）
   • medium
   • thick
   （3）颜色
   • 默认：中性灰
   • 支持：
   • 自定义 color
   • 主题变量（token）
   ⸻
4. 间距控制

外边距（margin）
• 上下间距（vertical spacing）
• 左右间距（horizontal）5. 尺寸控制
• 宽度（水平）
• 高度（垂直）

```typescript
width?: string | number
height?: string | number
```

6. 对齐方式（仅带文本时）
   align?: 'left' | 'center' | 'right'

7. 响应式支持（可选）
   • 不同屏幕下间距变化
   • 是否显示分隔线（如移动端隐藏）

## 组件设计补充

- 组件命名为 `SyDivider`，默认提供轻量、克制、偏中性灰的视觉风格，避免抢占正文注意力。
- 水平分割线应覆盖最常用场景，宽度默认 `100%`，并提供合理的上下留白。
- 带文案模式除了支持 `content` 属性，也应支持默认插槽，以便放入图标、徽标或更灵活的文本结构。
- 垂直模式应偏向工具栏、标签组、行内数据分隔场景，因此默认高度跟随上下文文本区域即可。
- `solid / dashed / dotted` 应通过统一的接口控制，避免拆成多个布尔属性。
- `thin / medium / thick` 负责表达线条权重，既满足弱分隔，也满足强调型区块分割。

## 推荐接口

- `direction?: 'horizontal' | 'vertical'`
- `align?: 'left' | 'center' | 'right'`
- `variant?: 'solid' | 'dashed' | 'dotted'`
- `thickness?: 'thin' | 'medium' | 'thick'`
- `content?: string`
- `color?: string`
- `width?: string | number`
- `height?: string | number`
- `margin?: string | number`
- `customStyle?: string`

## 文档建议

- 至少提供基础分隔线、带文案、垂直分隔线三个示例。
- 强调 `vertical` 更适合 inline / flex 容器内部使用。
- 说明默认插槽优先级高于 `content`，方便业务做富文本扩展。

## 测试建议

- 验证默认水平渲染与无障碍属性。
- 验证 `content` / 默认插槽及 `align` 对应的结构与类名。
- 验证 `vertical` 渲染时尺寸和方向行为。
- 验证 `variant`、`thickness`、`color`、`margin` 是否正确映射到样式。
