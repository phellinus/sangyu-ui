<docs>
---
title: 模式切换
---

同一组件通过 `challenge.mode` 区分滑动拼图与顺序点选。切换模式时生成新的 `challenge.id`，组件会重建挑战区域并清空上一次的拖动位置或点选进度。出题与校验均为前端 mock，仅用于演示，真实业务请替换为后端接口。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-actions">
			<SyButton :type="mode === 'slider' ? 'filled' : 'border'" @click="switchMode('slider')">滑动拼图</SyButton>
			<SyButton :type="mode === 'sequence' ? 'filled' : 'border'" @click="switchMode('sequence')">
				顺序点选
			</SyButton>
		</div>
		<SyVerify :challenge="challenge" :verify="verify" @success="onSuccess" @fail="onFail" @refresh="onRefresh" />
		<div class="current-value">{{ status }}</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { SyButton } from '../../button';
import { SyVerify } from 'sangyu-ui';
import type { VerifyAnswer, VerifyChallenge, VerifyResult } from 'sangyu-ui';

// 挑战图片数组，真实场景由后端随挑战一起下发
const images = [
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/SpringFestival.JPG',
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/snow.webp',
];

// 顺序点选的文字及坐标，基于 400×225 的图片渲染区域
const sequenceItems = [
	{ id: 'chun', text: '春', x: 56, y: 48 },
	{ id: 'xia', text: '夏', x: 284, y: 36 },
	{ id: 'qiu', text: '秋', x: 120, y: 148 },
	{ id: 'dong', text: '冬', x: 312, y: 136 },
];
const sequencePrompt = ['夏', '冬', '春', '秋'];

const mode = ref<VerifyChallenge['mode']>('slider');
const round = ref(0);
const status = ref('等待验证');

// 两种模式各出一份挑战，按当前 mode 选用；round 变化时 id 变化，组件重建挑战
const sliderChallenge = computed(() => ({
	id: `slider-${round.value}`,
	mode: 'slider' as const,
	image: images[round.value % images.length],
	pieceY: 48 + (round.value % 3) * 40,
	targetX: 160 + (round.value % 4) * 48,
}));
const sequenceChallenge = computed(() => ({
	id: `sequence-${round.value}`,
	mode: 'sequence' as const,
	image: images[round.value % images.length],
	items: sequenceItems,
	prompt: sequencePrompt,
}));
const challenge = computed(() => (mode.value === 'slider' ? sliderChallenge.value : sequenceChallenge.value));

// 模拟后端校验：按答案模式分别判断落点误差或点击顺序
async function verify(answer: VerifyAnswer): Promise<VerifyResult> {
	const current = challenge.value;
	if (answer.mode === 'slider' && current.mode === 'slider') {
		const success = Math.abs(answer.offsetX - current.targetX) <= 8;
		return { success, token: success ? `mock-token-${current.id}` : undefined };
	}
	if (answer.mode === 'sequence' && current.mode === 'sequence') {
		const expectedIds = current.prompt.map((text) => current.items.find((item) => item.text === text)?.id);
		const success = answer.itemIds.join(',') === expectedIds.join(',');
		return { success, token: success ? `mock-token-${current.id}` : undefined };
	}
	return { success: false };
}

function switchMode(next: VerifyChallenge['mode']) {
	if (mode.value === next) return;
	mode.value = next;
	round.value++;
	status.value = '等待验证';
}

function onSuccess(result: VerifyResult) {
	status.value = `验证通过，token：${result.token}`;
}

function onFail() {
	status.value = '验证失败，请重试或换一张';
}

function onRefresh() {
	round.value++;
	status.value = '等待验证';
}
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.demo-actions {
	display: flex;
	gap: 8px;
}

.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
