# SyLayout 布局

用页头、侧栏、内容区和页脚组合页面骨架。`SyLayout` 使用 Flexbox；直属侧栏会使当前容器横向排列，侧栏放在内容区前或后即可得到左侧或右侧布局。嵌套容器独立判断方向。

## 基础布局

<demo src="./demos/basic-layout.vue"></demo>

## 左右侧栏与嵌套

<demo src="./demos/sider-layout.vue"></demo>

## 响应式与主题

<demo src="./demos/responsive-layout.vue"></demo>

视口宽度不大于 `768px` 时，带直属侧栏的容器改为纵向排列，侧栏占满容器宽度。布局不内置折叠状态或触发器；交互式导航可自行组合菜单和按钮。

直属侧栏的自动识别依赖 [CSS `:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has)：需使用 Chrome/Edge 105+、Safari 15.4+ 或 Firefox 121+。更旧的浏览器会保持默认纵向布局，带侧栏的页面需自行提供横向布局样式。

## API

| 组件              | 根元素   | 属性                                | 说明                                                  |
| ----------------- | -------- | ----------------------------------- | ----------------------------------------------------- |
| `SyLayout`        | `div`    | —                                   | 默认纵向；有直属 `SyLayoutSider` 时横向               |
| `SyLayoutHeader`  | `header` | —                                   | 页头区域                                              |
| `SyLayoutSider`   | `aside`  | `width?: number \| string`          | 侧栏宽度；数字为像素，字符串为 CSS 长度，默认 `200px` |
| `SyLayoutContent` | `main`   | `as?: 'main' \| 'section' \| 'div'` | 内容区域；嵌套时可改用 `section`，避免多个 `main`     |
| `SyLayoutFooter`  | `footer` | —                                   | 页脚区域                                              |

所有组件支持 Vue 原生 `class` 和 `style` 属性及默认插槽。设置侧栏 `width` 后，窄屏仍会自动转为整宽。

布局颜色来自 `components.layout` 主题 Token：`headerBackground`、`siderBackground`、`contentBackground`、`footerBackground` 引用现有语义颜色，`siderWidth` 控制默认侧栏宽度。可通过 `ThemeProvider` 覆盖并切换亮暗主题。

静态主题同时补齐了全库共享的 `--sy-color-surface`：亮色为 `#ffffff`，暗色为 `#1f1f1f`。现有引用该变量的组件也会获得对应的表面色，无需单独包裹 `ThemeProvider`。
