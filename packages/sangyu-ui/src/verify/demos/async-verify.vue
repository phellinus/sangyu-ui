<docs>
---
title: 异步校验与加载
---

`verify` 支持异步校验，校验期间组件自动禁用交互，避免重复提交。刷新挑战时如果新数据需要请求后端，可以配合 `loading` 禁用组件；示例用定时器模拟这两个过程的耗时。出题与校验均为前端 mock，仅用于演示，真实业务请替换为后端接口。
</docs>

<template>
	<div class="demo-stack">
		<SyVerify
			:challenge="challenge"
			:verify="verify"
			:loading="loading"
			@success="onSuccess"
			@fail="onFail"
			@refresh="onRefresh"
		/>
		<div class="current-value">{{ status }}</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { SyVerify } from 'sangyu-ui';
import type { VerifyAnswer, VerifyResult } from 'sangyu-ui';

// 挑战图片数组，真实场景由后端随挑战一起下发
const images = [
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/full.jpg',
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/spring.jpg',
];

const round = ref(0);
const loading = ref(false);
const status = ref('等待验证');

// 每次 refresh 递增 round：换图片、换缺口坐标，并生成新 id
const challenge = computed(() => ({
	id: `slider-${round.value}`,
	mode: 'slider' as const,
	image: images[round.value % images.length],
	pieceY: 48 + (round.value % 3) * 40,
	targetX: 160 + (round.value % 4) * 48,
}));

// 收集定时器，组件卸载时统一清理，避免卸载后继续改状态
const timers: ReturnType<typeof setTimeout>[] = [];

function delay(ms: number) {
	return new Promise<void>((resolve) => {
		timers.push(setTimeout(resolve, ms));
	});
}

// 模拟后端校验耗时：期间组件自动禁用交互
async function verify(answer: VerifyAnswer): Promise<VerifyResult> {
	if (answer.mode !== 'slider') return { success: false };
	status.value = '校验中…';
	await delay(800);
	const success = Math.abs(answer.offsetX - challenge.value.targetX) <= 8;
	return { success, token: success ? `mock-token-${challenge.value.id}` : undefined };
}

function onSuccess(result: VerifyResult) {
	status.value = `验证通过，token：${result.token}`;
}

function onFail() {
	status.value = '验证失败，请重试或换一张';
}

// 模拟刷新挑战的请求耗时：期间用 loading 禁用组件
async function onRefresh() {
	loading.value = true;
	status.value = '正在获取新的挑战…';
	await delay(500);
	round.value++;
	loading.value = false;
	status.value = '等待验证';
}

onBeforeUnmount(() => {
	timers.forEach(clearTimeout);
});
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
