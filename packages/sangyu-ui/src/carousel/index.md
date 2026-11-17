# SyCarousel 轮播

用于在固定展示区域中切换多项内容。`SyCarouselItem` 必须作为 `SyCarousel` 的直接子项；索引从 `0` 开始。

## 基础用法

<demo src="./demos/basic-carousel.vue"></demo>

## 自动播放与暂停

自动播放时提供暂停或继续按钮。悬停、控件获得焦点、页面不可见时暂停；系统开启“减少动态效果”时停止自动播放并取消过渡。

<demo src="./demos/autoplay-carousel.vue"></demo>

## 受控切换

使用 `v-model` 时，父组件需要将新索引回传；如果父组件不回传，自动播放会在发出切换请求后停止。`defaultValue` 仅用于非受控初始值。

<demo src="./demos/controlled-carousel.vue"></demo>

## 横向与纵向

<demo src="./demos/direction-carousel.vue"></demo>

## Fade 动画

<demo src="./demos/fade-carousel.vue"></demo>

## 亮暗主题

<demo src="./demos/theme-carousel.vue"></demo>

## API

### SyCarousel Props

| 属性                     | 类型                             | 默认值       | 说明                                        |
| ------------------------ | -------------------------------- | ------------ | ------------------------------------------- |
| `modelValue` / `v-model` | `number`                         | —            | 受控索引，从 `0` 开始                       |
| `defaultValue`           | `number`                         | `0`          | 非受控初始索引                              |
| `autoplay`               | `boolean`                        | `false`      | 自动播放                                    |
| `interval`               | `number`                         | `3000`       | 自动播放间隔，单位毫秒                      |
| `pauseOnHover`           | `boolean`                        | `true`       | 鼠标悬停时暂停                              |
| `direction`              | `horizontal \| vertical`         | `horizontal` | 切换方向                                    |
| `animation`              | `slide \| fade`                  | `slide`      | 首期支持 Slide 和 Fade                      |
| `indicator`              | `dot \| line \| none`            | `dot`        | 指示器形态                                  |
| `indicatorPosition`      | `top \| bottom \| left \| right` | `bottom`     | 指示器位置                                  |
| `showArrow`              | `always \| hover \| never`       | `always`     | 箭头显示时机                                |
| `loop`                   | `boolean`                        | `true`       | 到达边界后继续循环                          |
| `transitionDuration`     | `number`                         | `500`        | 切换过渡时长，单位毫秒；设为 `0` 可关闭过渡 |

### 事件

| 事件                | 参数                                                  | 说明                             |
| ------------------- | ----------------------------------------------------- | -------------------------------- |
| `update:modelValue` | `index: number`                                       | 请求更新当前索引                 |
| `change`            | `index: number, prevIndex: number, isManual: boolean` | 用户或自动播放发起有效切换时触发 |

### 插槽与子项

`SyCarousel` 默认插槽放置 `SyCarouselItem`。每个子项的默认插槽渲染该页内容。空项和单项不会显示切换控件，也不会启动自动播放。

循环 Slide 在首尾边界会渲染镜像节点。子项内容应避免写死 DOM `id`，以免镜像节点产生重复标识。

根节点使用 `role="region"`，可传入 `aria-label` 指定轮播名称。箭头、指示器和播放按钮均可通过键盘激活。非活动内容不可聚焦。

默认比例由 `--sy-carousel-aspect-ratio` 控制，可在容器上覆盖。箭头、指示器、背景、尺寸和间距均可通过 `ThemeProvider` 的 `components.carousel` Token 定制；亮暗预设随 `mode` 更新。
