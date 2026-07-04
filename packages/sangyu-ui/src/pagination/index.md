# SyPagination 分页

Pagination 用于在大量数据或多页内容中提供分页导航，适合表格、列表、搜索结果、日志页和多步骤内容切换等场景。

组件支持：

- `total / pageCount` 两种页数来源
- 当前页与每页条数的双向绑定
- 页码折叠、省略号快速跳转
- 平滑滑动的当前页高亮块
- `circle / square / notMargin / buttonsDotted` 多种形态
- 指定页码禁用、指定页码加载
- 自定义布局、跳页、总数、每页条数与默认插槽
- 进度条与无限翻页

## 基础用法

<demo src="./demos/basic-pagination.vue"></demo>

## 布局组合

<demo src="./demos/layout-pagination.vue"></demo>

## 尺寸与形状

<demo src="./demos/shape-pagination.vue"></demo>

## 圆点模式

<demo src="./demos/dotted-pagination.vue"></demo>

## 禁用与加载

<demo src="./demos/disabled-pagination.vue"></demo>

## 进度条

<demo src="./demos/progress-pagination.vue"></demo>

## 无限翻页

<demo src="./demos/infinite-pagination.vue"></demo>

## API

### SyPagination Props

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| currentPage / v-model:current-page | `number` | 当前页码；传入后为受控模式 | `undefined` |
| defaultCurrentPage | `number` | 非受控模式下的默认当前页 | `1` |
| pageSize / v-model:page-size | `number` | 每页条数；传入后为受控模式 | `undefined` |
| defaultPageSize | `number` | 非受控模式下的默认每页条数 | `10` |
| total | `number` | 数据总条数，会根据 `pageSize` 自动计算总页数 | `undefined` |
| pageCount | `number` | 直接指定总页数；同时传入 `total` 时优先使用 | `undefined` |
| pagerCount | `number` | 最多展示的页码按钮数量，建议为大于 4 的奇数 | `7` |
| pageSizes | `number[]` | 每页条数选择器的选项 | `[10, 20, 30, 40, 50, 100]` |
| layout | `string \| PaginationLayoutItem[]` | 分页布局配置，支持逗号分隔字符串或数组 | 默认布局 |
| disabled | `boolean` | 是否禁用整个分页 | `false` |
| hideOnSinglePage | `boolean` | 总页数小于等于 1 时是否隐藏分页 | `false` |
| prevText | `string` | 上一页按钮文案 | `undefined` |
| nextText | `string` | 下一页按钮文案 | `undefined` |
| prevIcon | `string \| Component` | 上一页按钮图标 | `undefined` |
| nextIcon | `string \| Component` | 下一页按钮图标 | `undefined` |
| color | `string` | 激活态主题色，影响当前页、高亮块、进度条等 | 主题主色 |
| shape | `'default' \| 'circle' \| 'square'` | 分页按钮形状 | `'default'` |
| notMargin | `boolean` | 是否移除按钮之间的间距 | `false` |
| buttonsDotted | `boolean` | 是否启用圆点分页模式 | `false` |
| progress | `boolean` | 是否展示分页进度条 | `false` |
| infinite | `boolean` | 是否启用首尾循环翻页 | `false` |
| disabledItems | `number[]` | 指定禁用的页码列表 | `[]` |
| loadingItems | `number[]` | 指定加载中的页码列表 | `[]` |
| size | `'small' \| 'default' \| 'large'` | 分页尺寸 | `'default'` |
| customStyle | `string \| CSSProperties` | 根元素自定义内联样式 | `undefined` |

`PaginationLayoutItem` 为：

```ts
'prev' | 'pager' | 'next' | 'jumper' | 'total' | 'sizes' | 'slot' | '->'
```

默认布局为：

```ts
['prev', 'pager', 'next', 'jumper', '->', 'total', 'slot', 'sizes']
```

### Events

| 事件名 | 回调参数 | 说明 |
| --- | --- | --- |
| update:currentPage | `(page: number)` | 当前页变化时触发 |
| update:pageSize | `(size: number)` | 每页条数变化时触发 |
| pageChange | `(page: number)` | 页码变化后的业务事件 |
| sizeChange | `(size: number)` | 每页条数变化后的业务事件 |
| prevClick | `(page: number)` | 点击上一页后触发 |
| nextClick | `(page: number)` | 点击下一页后触发 |

### Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| default | `{ currentPage, pageSize, pageCount, total, pageSizes, pagerCount }` | 对应 `layout` 中的 `slot` 区域 |

### 使用建议

- 普通数据列表优先使用 `total` + `pageSize`，后端已经返回总页数时可直接使用 `pageCount`
- 需要完整工具栏时使用 `layout` 组合 `total / sizes / jumper`
- `pagerCount` 建议保持奇数，这样当前页可以更自然地居中
- 异步加载指定页时使用 `loadingItems`，不可访问页码使用 `disabledItems`
- 展示型场景可以使用 `buttonsDotted`，数据型表格更推荐保留数字页码
- 开启 `progress` 时，建议使用较短布局，如 `prev, pager, next`
