# SyPagination 需求文档

## 1. 组件定位

`SyPagination` 用于在大量数据或多页内容中提供分页导航，适用于：

1. 表格、列表、卡片流等数据集分页
2. 搜索结果、订单列表、用户列表、日志列表等后台场景
3. 可选择每页条数、跳页、显示总数的复杂分页
4. 需要更强视觉反馈的轻量展示型分页

组件需要同时覆盖“功能完整”和“视觉丝滑”两类目标：基础能力要能支撑业务分页，视觉动效要参考 `vuesax-alpha` 的 `Pagination`，当前页切换时高亮块平滑滑动，点击时有轻微缩放反馈。

## 2. 参考来源

本组件需求参考 `vuesax-alpha` 的 `pagination` 设计与实现，重点参考以下能力：

1. 当前页高亮层通过绝对定位跟随目标按钮滑动
2. 当前页变化时高亮层触发轻微放大，形成柔和的动态反馈
3. 支持页码折叠、省略号快速前进 / 后退
4. 支持圆形、方形、无间距、圆点页码等视觉形态
5. 支持禁用指定页码和加载指定页码，并在翻页时自动跳过
6. 支持 `total` 或 `pageCount` 两种页数来源
7. 支持 `layout` 自定义布局，包括上一页、页码、下一页、跳页、总数、每页条数、自定义插槽和右侧对齐
8. 支持进度条模式和无限循环翻页

参考文件：

1. `/private/tmp/vuesax-alpha/packages/components/pagination/src/pagination.ts`
2. `/private/tmp/vuesax-alpha/packages/components/pagination/src/components/pager.vue`
3. `/private/tmp/vuesax-alpha/packages/components/pagination/src/components/prev.vue`
4. `/private/tmp/vuesax-alpha/packages/components/pagination/src/components/next.vue`
5. `/private/tmp/vuesax-alpha/packages/components/pagination/src/components/progress.vue`
6. `/private/tmp/vuesax-alpha/packages/theme-chalk/src/pagination.scss`
7. `/private/tmp/vuesax-alpha/docs/components/pagination.md`

## 3. 设计目标

`SyPagination` 不需要逐行照搬 `vuesax-alpha`，但交互体验和动画质感需要对齐：

1. 当前页切换必须是“滑过去”的，而不是简单切换背景色
2. 页码按钮点击要有短促、克制的按压反馈
3. hover、focus、loading、disabled 状态要清晰但不喧宾夺主
4. API 命名需要符合 `sangyu-ui` 现有 Vue 3 组件风格
5. 样式 token 使用 `--sy-*` 体系，默认主题与现有组件保持一致
6. 图标优先复用 `@sangyu-ui/icons` 或现有 `SyIcon`

## 4. 功能需求

### 4.1 基础分页

1. 支持 `v-model:currentPage`
2. 支持 `total` 表示总条数
3. 支持 `pageSize` 表示每页条数
4. 支持 `pageCount` 直接指定总页数
5. 当同时传入 `pageCount` 和 `total` 时，建议 `pageCount` 优先
6. 未传入 `currentPage` 时支持内部非受控状态
7. 支持 `defaultCurrentPage` 作为非受控默认页码
8. 支持 `defaultPageSize` 作为非受控默认每页条数
9. 页码范围需要被限制在 `1 ~ pageCount`
10. 当 `pageSize` 或 `total` 变化导致总页数减少时，当前页要自动回退到合法页码

### 4.2 页码折叠

1. 支持 `pagerCount` 控制最多展示的页码按钮数量
2. `pagerCount` 建议只允许大于 4、小于 22 的奇数
3. 总页数超过 `pagerCount` 时自动折叠中间页码
4. 首页和尾页始终可见
5. 当前页靠近开头时展示前段页码和后省略号
6. 当前页靠近结尾时展示前省略号和后段页码
7. 当前页位于中间时展示前省略号、当前页附近页码、后省略号
8. 点击前省略号向前跳 `pagerCount - 2` 页
9. 点击后省略号向后跳 `pagerCount - 2` 页
10. 省略号 hover 时切换为双箭头图标，并带透明度与位移动画

### 4.3 上一页 / 下一页

1. 支持上一页按钮
2. 支持下一页按钮
3. 第一页时上一页禁用
4. 最后一页时下一页禁用
5. `disabled` 为 `true` 时上一页、下一页和页码全部不可交互
6. 支持 `prevText` / `nextText` 自定义按钮文案
7. 支持 `prevIcon` / `nextIcon` 自定义按钮图标
8. 图标优先级高于文案，除非明确配置展示文案

### 4.4 每页条数

1. 支持 `pageSizes` 配置可选每页条数
2. 支持 `v-model:pageSize`
3. 支持在 `layout` 中通过 `sizes` 显示每页条数选择器
4. `pageSize` 变化后需要重新计算总页数
5. 如果当前页超过新的总页数，需要自动回退到最后一页
6. 每页条数选择器应复用现有 `SySelect`，不重复实现选择器

### 4.5 跳页

1. 支持在 `layout` 中通过 `jumper` 显示跳页输入框
2. 输入框只接受数字
3. 输入小于 1 的值时回到第 1 页
4. 输入大于总页数的值时回到最后一页
5. 回车或失焦时触发跳转
6. 跳页输入框应复用现有 `SyInput` 或数字输入能力

### 4.6 总数展示

1. 支持在 `layout` 中通过 `total` 显示总条数
2. 默认文案建议为 `共 {total} 条`
3. 后续可通过 locale 或插槽支持国际化
4. `disabled` 时总数字体颜色需要弱化

### 4.7 布局组合

参考 `vuesax-alpha`，建议支持 `layout`：

1. `prev`：上一页
2. `pager`：页码列表
3. `next`：下一页
4. `jumper`：跳页输入
5. `total`：总条数
6. `sizes`：每页条数选择器
7. `slot`：自定义插槽
8. `->`：右侧对齐分隔符，之后的内容放入右侧容器

默认布局建议：

```ts
['prev', 'pager', 'next', 'jumper', '->', 'total', 'slot', 'sizes']
```

如果希望更贴近常见中文后台，也可以提供更紧凑的默认值：

```ts
['total', 'sizes', 'prev', 'pager', 'next', 'jumper']
```

最终默认值以 `sangyu-ui` 现有文档风格和业务场景为准。

### 4.8 特殊页码状态

1. 支持 `disabledItems: number[]`
2. 支持 `loadingItems: number[]`
3. 指定页码处于 disabled 时不可点击
4. 指定页码处于 loading 时不可点击，并显示加载图标
5. 使用上一页、下一页或省略号翻页时，需要跳过 disabled / loading 页码
6. 如果目标页连续处于 disabled / loading，需要继续查找下一个可用页
7. 找不到可用页时保持当前页不变

### 4.9 无限翻页

1. 支持 `infinite`
2. `infinite` 为 `true` 时，第 1 页点击上一页跳到最后一页
3. `infinite` 为 `true` 时，最后一页点击下一页跳到第 1 页
4. 无限翻页仍需要遵守 `disabledItems` 和 `loadingItems` 跳过规则

### 4.10 单页隐藏

1. 支持 `hideOnSinglePage`
2. 当总页数小于等于 1 时隐藏整个分页
3. 如果 `layout` 为空，组件不渲染

## 5. 视觉与动效需求

### 5.1 丝滑高亮层

这是本组件最重要的视觉需求，需要复刻 `vuesax-alpha` 的核心体验：

1. 页码按钮本身保持普通背景
2. 当前页额外渲染一个绝对定位的高亮层
3. 高亮层宽高与页码按钮一致
4. 高亮层根据当前页按钮的 `offsetLeft` 移动
5. `currentPage` 改变后，在 DOM 更新完成后重新计算高亮层位置
6. 高亮层使用 `transform` / `left` 过渡，时长建议 `250ms ~ 300ms`
7. 切换瞬间添加 `is-change` 类，高亮层短暂 `scale(1.08 ~ 1.12)`
8. 变化结束后移除 `is-change`
9. 高亮层需要带柔和阴影，参考 `0 5px 20px rgba(primary, 0.3)`
10. 高亮层在圆点模式下缩放更明显，可使用 `scale(1.2)`

实现建议：

1. `pager` 容器设置 `position: relative`
2. 每个页码按钮设置稳定宽高
3. 当前页高亮层设置 `position: absolute; z-index`
4. 通过 `ref` 查询当前页按钮位置
5. 使用 `nextTick` 保证折叠页码变更后的 DOM 已更新
6. 避免只通过 `.is-active` 改背景色，否则达不到参考组件的丝滑效果

### 5.2 按钮反馈

1. 页码按钮 hover 时背景轻微加深
2. 按钮 active 时 `scale(0.93)` 左右，反馈短促
3. 禁用按钮降低透明度并禁止指针事件
4. focus-visible 需要有清晰描边
5. 所有按钮过渡统一使用同一个 motion token

### 5.3 省略号动效

1. 默认展示 `...`
2. hover / focus 时隐藏 `...`
3. 同时显示双箭头图标
4. 双箭头从轻微偏移位置滑入中心
5. `...` 和图标切换需要使用 opacity + visibility + transform

### 5.4 进度条

1. 支持 `progress`
2. 开启后在页码下方显示进度条
3. 进度百分比为 `currentPage / pageCount * 100%`
4. 进度条宽度变化使用 `250ms ease` 过渡
5. 进度条圆角与主题保持一致

## 6. 视觉形态

### 6.1 默认形态

1. 默认按钮为轻圆角矩形
2. 默认尺寸建议与现有按钮 / 输入框体系对齐
3. 页码按钮需要固定最小宽度，避免数字位数变化导致布局跳动
4. 页码容器不换行，保持 `white-space: nowrap`

### 6.2 Shape

建议使用一个 `shape` prop：

1. `default`：默认圆角
2. `circle`：上一页、下一页、页码、高亮层全部圆形
3. `square`：所有元素圆角为 0

也可以兼容布尔写法：

1. `circle?: boolean`
2. `square?: boolean`

但更建议统一为 `shape`，减少 API 分裂。

### 6.3 无间距模式

1. 支持 `notMargin`
2. 开启后页码按钮之间无间距
3. 中间页码圆角为 0
4. 上一页保留左侧圆角
5. 下一页保留右侧圆角
6. 高亮层仍需要平滑移动，不能因为按钮贴合导致抖动

### 6.4 圆点模式

1. 支持 `buttonsDotted`
2. 开启后页码按钮不显示数字，只显示圆点
3. 上一页 / 下一页按钮缩小为紧凑图标按钮
4. 当前页高亮层变为圆点
5. 当前页变化时高亮圆点需要有更明显的放大反馈
6. 圆点模式下不展示省略号快速跳转

### 6.5 尺寸

建议支持：

1. `size="small"`：适合表格底部、紧凑列表
2. `size="default"`：默认场景
3. `size="large"`：可选，适合展示型页面

如果第一期只做两个尺寸，至少需要 `default` 和 `small`。

## 7. API 建议

### 7.1 Props

建议最终 props 至少包含：

1. `currentPage?: number`
2. `defaultCurrentPage?: number`
3. `pageSize?: number`
4. `defaultPageSize?: number`
5. `total?: number`
6. `pageCount?: number`
7. `pagerCount?: number`
8. `pageSizes?: number[]`
9. `layout?: string | string[]`
10. `disabled?: boolean`
11. `hideOnSinglePage?: boolean`
12. `prevText?: string`
13. `nextText?: string`
14. `prevIcon?: string | Component`
15. `nextIcon?: string | Component`
16. `color?: string`
17. `shape?: 'default' | 'circle' | 'square'`
18. `notMargin?: boolean`
19. `buttonsDotted?: boolean`
20. `progress?: boolean`
21. `infinite?: boolean`
22. `disabledItems?: number[]`
23. `loadingItems?: number[]`
24. `size?: 'small' | 'default' | 'large'`

### 7.2 Events

建议事件：

1. `update:currentPage`
2. `update:pageSize`
3. `pageChange`
4. `sizeChange`
5. `prevClick`
6. `nextClick`

事件触发约定：

1. 点击页码、省略号、跳页、上一页、下一页后触发 `pageChange`
2. 上一页按钮额外触发 `prevClick`
3. 下一页按钮额外触发 `nextClick`
4. 每页条数变化触发 `sizeChange`
5. 受控模式下必须同步触发对应 `update:*`

### 7.3 Slots

建议插槽：

1. `default`：对应 `layout` 中的 `slot`
2. `prev`：自定义上一页内容
3. `next`：自定义下一页内容
4. `total`：自定义总数展示
5. `jumper`：自定义跳页区域

`default` 插槽建议暴露：

```ts
{
  currentPage: number
  total?: number
  pageSize: number
  pageSizes: number[]
  pagerCount: number
  pageCount: number
}
```

### 7.4 Expose

可暴露方法：

1. `prev()`
2. `next()`
3. `setCurrentPage(page: number)`
4. `setPageSize(size: number)`

## 8. 受控与非受控策略

1. 传入 `currentPage` 时为受控模式
2. 受控模式下必须依赖 `update:currentPage` 修改外部值
3. 未传入 `currentPage` 时使用内部状态
4. `defaultCurrentPage` 只在初始化时生效
5. `pageSize` 同理支持受控与非受控
6. 开发环境需要对非法用法给出 warning

需要 warning 的情况：

1. 未传入 `total` 且未传入 `pageCount`
2. 传入 `currentPage` 但没有监听 `update:currentPage`
3. `layout` 包含 `sizes`，传入受控 `pageSize` 但没有监听 `update:pageSize`
4. `pagerCount` 不是合法奇数
5. `currentPage`、`pageSize`、`total`、`pageCount` 不是合法数字

## 9. 可访问性要求

1. 根节点建议使用 `role="navigation"` 和 `aria-label="pagination"`
2. 页码按钮使用原生 `button`
3. 当前页按钮设置 `aria-current="page"`
4. 上一页 / 下一页禁用时设置 `disabled` 和 `aria-disabled`
5. disabled / loading 页码 `tabindex="-1"`
6. 可交互页码 `tabindex="0"`
7. 支持键盘 `Enter` 触发页码和省略号
8. 建议同时支持 `Space`
9. focus-visible 样式必须清楚可见
10. 圆点模式下仍需要通过 `aria-label` 表达页码数字

## 10. 样式 Token 建议

建议沉淀以下 token：

1. `--sy-pagination-font-size`
2. `--sy-pagination-font-size-small`
3. `--sy-pagination-button-width`
4. `--sy-pagination-button-width-small`
5. `--sy-pagination-button-height`
6. `--sy-pagination-button-height-small`
7. `--sy-pagination-button-margin`
8. `--sy-pagination-item-gap`
9. `--sy-pagination-border-radius`
10. `--sy-pagination-bg-color`
11. `--sy-pagination-button-bg-hover`
12. `--sy-pagination-button-color`
13. `--sy-pagination-text-color`
14. `--sy-pagination-active-color`
15. `--sy-pagination-active-shadow`
16. `--sy-pagination-transition`

默认颜色：

1. 激活色使用 `var(--sy-color-primary)`
2. hover 背景使用浅层填充色或 primary 低透明度
3. disabled 使用现有 disabled token，不只依赖 opacity
4. focus ring 使用 primary 或 focus token

## 11. 边界规则

1. `total = 0` 时总页数建议为 0 或 1，需要和现有组件体系统一
2. 如果选择 `pageCount = 0` 不渲染页码，上一页 / 下一页禁用
3. `currentPage < 1` 时纠正为 1
4. `currentPage > pageCount` 时纠正为 `pageCount`
5. `pageSize <= 0` 时开发环境 warning，并回退默认值
6. `disabledItems` / `loadingItems` 中不存在的页码忽略
7. 当前页被设置为 disabled / loading 时，需要自动寻找相邻可用页
8. 所有跳转都不能产生死循环

## 12. 测试需求

### 12.1 单元测试

至少覆盖：

1. 默认渲染
2. 根据 `total` 和 `pageSize` 计算总页数
3. `pageCount` 优先级高于 `total`
4. `v-model:currentPage` 更新
5. 非受控 `defaultCurrentPage`
6. 上一页 / 下一页边界禁用
7. `infinite` 首尾循环
8. `pagerCount` 折叠逻辑
9. 省略号快速跳转
10. `disabled` 整体禁用
11. `disabledItems` 不可点击并被跳过
12. `loadingItems` 显示加载并被跳过
13. `hideOnSinglePage`
14. `layout` 顺序和 `->` 右对齐
15. `pageSize` 变化触发页数重算
16. `jumper` 输入越界纠正
17. `progress` 宽度计算

### 12.2 交互与动效测试

需要重点验证：

1. 当前页变化后高亮层移动到正确页码
2. 高亮层移动时没有闪烁
3. 折叠页码变化后高亮层仍能定位正确
4. 圆点模式下高亮层尺寸正确
5. `notMargin` 模式下高亮层不抖动
6. 省略号 hover 时 `...` 和双箭头平滑切换
7. loading 页码不响应点击
8. 键盘 Enter / Space 能触发跳转

### 12.3 视觉回归

建议为以下场景保留快照或截图：

1. 默认分页
2. 超长分页折叠
3. 当前页位于中间
4. 圆形分页
5. 方形分页
6. 无间距分页
7. 圆点分页
8. 进度条分页
9. disabled / loading items
10. small 尺寸

## 13. 第一阶段实现建议

第一阶段优先级：

1. 基础分页：`currentPage`、`total`、`pageSize`、`pageCount`
2. 页码折叠：`pagerCount`、省略号跳转
3. 上一页 / 下一页
4. 丝滑高亮层动效
5. `disabled`、`disabledItems`、`loadingItems`
6. `shape`、`notMargin`、`buttonsDotted`
7. `layout`、`total`、`sizes`、`jumper`
8. `progress`、`infinite`

如果时间有限，不能牺牲高亮层动效。这个组件的识别度主要来自当前页高亮块的平滑移动和轻微缩放，它是对齐 `vuesax-alpha` 质感的关键验收点。
