# 图标库

使用 `@sangyu-ui/icons` 时推荐优先通过 `SyIcon` 包装器来渲染图标：它会根据 `name` 自动匹配 SVG，且能统一处理尺寸、颜色、描边、旋转等交互。

- 安装：`pnpm add @sangyu-ui/icons`，然后在需要的地方 `import { SyIcon } from '@sangyu-ui/icons';`
- 基础调用：`<SyIcon name="search" size="20" color="#165DFF" />`
- 自定义： `component` / 默认插槽可传入自定义 SVG，`registerIcon` 可以扩展业务图标。

<demo src="./demos/basic.vue"></demo>

# 图标库的使用

<demo src="./demos/icon-use.vue"></demo>
