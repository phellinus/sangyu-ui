# SyMenu 菜单

## 基本用法
<demo src="./demos/basic-demo.vue"></demo>

## 点击事件
<demo src="./demos/click-menu.vue"></demo>

## expand展开
<demo src="./demos/expand-menu.vue"></demo>

## API

### SyMenu 属性

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| defaultIndex | `string` | 默认激活菜单项索引 | `''` |
| mode | `'horizontal' \| 'vertical'` | 菜单展示方向 | `'vertical'` |
| hoverBgColor | `string` | hover 背景颜色 | `''` |
| hoverColor | `string` | hover 字体颜色 | `''` |
| customStyle | `string` | 自定义内联样式 | `''` |
| verticalPosition | `'left' \| 'right'` | 垂直菜单位置 | `'left'` |
| itemPosition | `'left' \| 'center' \| 'right'` | 水平菜单的菜单位置 | `'left'` |
| expand | `boolean` | 是否展开 | `true` |
| defaultOpenSubMenus | `string[]` | 默认展开的子菜单索引 | `[]` |
| onSelect | `(selectedIndex: string, to?: string) => void` | 菜单选中回调 | `-` |

### SyMenuItem 属性

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| index | `string` | 菜单项索引 | `''` |
| disabled | `boolean` | 是否禁用 | `false` |
| customStyle | `string` | 自定义内联样式 | `''` |
| id | `string` | 自定义 id | `''` |
| icon | `string` | 图标名称 | `''` |
| iconPosition | `'left' \| 'right'` | 图标位置 | `'left'` |
| pure | `boolean` | 纯展示作用，不作为子菜单 | `false` |
| to | `string` | 点击菜单后的跳转路径 | `''` |

### SySubMenu 属性

| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| index | `string` | 子菜单索引 | `''` |
| title | `string` | 子菜单标题 | `''` |
| className | `string` | 追加类名 | `''` |
| customStyle | `string` | 自定义内联样式 | `''` |
| disabled | `boolean` | 是否禁用 | `false` |
| id | `string` | 自定义 id | `''` |
| icon | `string` | 图标名称 | `''` |
| onlyExpand | `boolean` | 仅展开子菜单，不触发父菜单点击 | `false` |
