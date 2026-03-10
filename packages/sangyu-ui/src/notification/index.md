# Notification 通知

## 基础用法

<demo src="./demos/basic.vue" />

## 持续时间

<demo src="./demos/durnation-notification.vue" />

## 通知类型

<demo src="./demos/type-notification.vue" />

## 不显示关闭按钮

<demo src="./demos/unclose-notification.vue" />

## 手动关闭

<demo src="./demos/close-notification.vue" />

## 内容折叠

<demo src="./demos/clamp-notification.vue" />

## 弹出位置

<demo src="./demos/position-notification.vue" />

## API

### NotificationConfig

| 属性名    | 类型                                                           | 说明                                                  | 默认值        |
| --------- | -------------------------------------------------------------- | ----------------------------------------------------- | ------------- |
| title     | `string \| VNode`                                              | 通知标题                                              | -             |
| content   | `string \| VNode`                                              | 通知内容                                              | -             |
| type      | `'success' \| 'info' \| 'warning' \| 'error'`                  | 通知类型                                              | -             |
| durnation | `number`                                                       | 自动销毁时间，单位：毫秒（设置为 `0` 表示不自动关闭） | `3000`        |
| showClose | `boolean`                                                      | 是否显示关闭按钮                                      | `true`        |
| clamp     | `number`                                                       | 内容折叠行数                                          | `3`           |
| position  | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | 弹出位置                                              | `'top-right'` |
| onClose   | `() => void`                                                   | 关闭时触发的回调函数                                  | -             |
