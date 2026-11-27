# sangyu-ui

## 0.2.0

### Minor Changes

- ff29d7d: 从统一的 TypeScript 预设生成亮暗主题样式和 Token 类型。`ThemeProvider` 只应用局部覆盖及受影响的引用。同模式嵌套继承父级覆盖，切换模式时恢复目标预设。

    有 Vue 主题上下文或浮层的子树可以用 `ThemeProvider` 设置亮暗模式。Drawer 会携带来源作用域的主题，Notification 新增 `theme` 选项，可在点击或异步回调中传入 `useTheme()` 获取的上下文。

## 0.1.1

### Patch Changes

- 3dc8bcd: Validate automated npm publishing via OIDC
- Updated dependencies [3dc8bcd]
    - @sangyu-ui/icons@0.1.1
