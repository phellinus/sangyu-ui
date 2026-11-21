# SyVerify 人机验证

Verify 用于登录、注册、找回密码等需要人机校验的场景，在业务提交前插入一次轻量验证。组件内置两种挑战模式，共用同一套弹层结构与结果事件：

- 滑动拼图：拖动滑块将拼图对齐缺口
- 顺序点选：按提示顺序点击图片中的文字
- 答案统一交给 `verify` 异步校验，校验期间自动禁用交互
- `success / fail / refresh` 事件，挑战数据完全由业务方控制
- 挑战切换时自动清空拖动位置与点选进度

## 基础用法

<demo src="./demos/basic-verify.vue"></demo>

## 顺序点选

<demo src="./demos/sequence-verify.vue"></demo>

## 模式切换

<demo src="./demos/mode-verify.vue"></demo>

## 异步校验与加载

<demo src="./demos/async-verify.vue"></demo>

## API

### SyVerify Props

| 属性名    | 类型                                              | 说明                                                       | 默认值      |
| --------- | ------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| challenge | `VerifyChallenge`                                 | 当前挑战数据，`mode` 决定渲染滑动拼图还是顺序点选          | 必填        |
| verify    | `(answer: VerifyAnswer) => Promise<VerifyResult>` | 答案校验函数，返回 `success: true` 时组件才触发 `success`  | 必填        |
| loading   | `boolean`                                         | 外部加载状态，为 `true` 时禁用交互，适合刷新挑战的请求期间 | `undefined` |

### Events

| 事件名  | 回调参数                 | 说明                                                         |
| ------- | ------------------------ | ------------------------------------------------------------ |
| success | `(result: VerifyResult)` | `verify` 返回 `success: true` 时触发，可携带后端签发的 token |
| fail    | `(answer: VerifyAnswer)` | 校验失败或校验函数抛出异常时触发，参数为本次提交的答案       |
| refresh | `()`                     | 点击「换一张」时触发，业务方据此生成新的 `challenge`         |

### 类型定义

挑战数据与答案按 `mode` 区分为两组：

```ts
interface SliderChallengeData {
	id: string;
	mode: 'slider';
	image: string;
	// 拼图缺口的纵向位置与横向目标位置，单位为图片渲染区域的像素
	pieceY: number;
	targetX: number;
}

interface SequenceItem {
	id: string;
	text: string;
	x: number;
	y: number;
}

interface SequenceChallengeData {
	id: string;
	mode: 'sequence';
	image: string;
	items: SequenceItem[];
	// 展示给用户的点击顺序
	prompt: string[];
}

type VerifyChallenge = SliderChallengeData | SequenceChallengeData;
```

答案只描述用户的操作结果，不携带正确答案：

```ts
type VerifyAnswer =
	| { mode: 'slider'; challengeId: string; offsetX: number }
	| { mode: 'sequence'; challengeId: string; itemIds: string[] };

interface VerifyResult {
	success: boolean;
	token?: string;
}
```

### 使用建议

- 真实登录场景应由后端生成挑战并校验答案，`verify` 内请求后端接口，`success` 携带后端签发的 token；不要在前端保存正确答案做判断
- `challenge.id` 需要保证每次挑战唯一，组件以 `id` 作为 key，`id` 变化时会重建挑战区域并清空局部状态
- 图片数组由业务方持有，`refresh` 时从中挑选图片生成新挑战即可，组件不关心图片来源
- `targetX / pieceY / x / y` 都基于图片渲染区域的像素坐标，前后端需使用同一套尺寸基准
- 顺序点选的答案是文字 `id` 序列，同一文字出现多次时也能通过 `id` 区分
- 校验失败后建议引导用户点击「换一张」，避免在同一挑战上反复尝试
