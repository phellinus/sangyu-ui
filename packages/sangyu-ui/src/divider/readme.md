# Divider组件需求分析

（1）水平分隔线（默认）
	•	横向展示
	•	宽度默认 100%
（2）垂直分隔线
	•	用于 inline / flex 布局中
	•	高度跟随容器
2. 内容支持
带文本分隔线
```
————  OR  ————
```
•	支持中间插入文本（如“OR”、“更多”）
•	文本可对齐：
•	左对齐
•	居中（默认）
•	右对齐

3. 样式变体（Variants）
（1）线条类型
	•	solid（默认）
	•	dashed
	•	dotted
（2）粗细（Thickness）
	•	thin（1px）
	•	medium
	•	thick
（3）颜色
	•	默认：中性灰
	•	支持：
	•	自定义 color
	•	主题变量（token）
⸻
4. 间距控制

外边距（margin）
	•	上下间距（vertical spacing）
	•	左右间距（horizontal）
5. 尺寸控制
	•	宽度（水平）
	•	高度（垂直）
```typescript
width?: string | number
height?: string | number
```

6. 对齐方式（仅带文本时）
align?: 'left' | 'center' | 'right'

7. 响应式支持（可选）
	•	不同屏幕下间距变化
	•	是否显示分隔线（如移动端隐藏）
