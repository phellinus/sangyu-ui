---
'sangyu-ui': minor
---

从统一的 TypeScript 预设生成亮暗主题样式和 Token 类型。`ThemeProvider` 只应用局部覆盖及受影响的引用。同模式嵌套继承父级覆盖，切换模式时恢复目标预设。

有 Vue 主题上下文或浮层的子树可以用 `ThemeProvider` 设置亮暗模式。Drawer 会携带来源作用域的主题，Notification 新增 `theme` 选项，可在点击或异步回调中传入 `useTheme()` 获取的上下文。
