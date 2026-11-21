<docs>
---
title: 基础用法
---

滑动拼图模式。拖动滑块将拼图对齐缺口，松手后组件提交答案，由 `verify` 校验并触发 `success` 或 `fail`。点击「换一张」触发 `refresh`，示例中从图片数组轮换生成新的挑战。出题与校验均为前端 mock，仅用于演示，真实业务请替换为后端接口。
</docs>

<template>
	<div class="demo-stack">
		<SyVerify :challenge="challenge" :verify="verify" @success="onSuccess" @fail="onFail" @refresh="onRefresh" />
		<div class="current-value">{{ status }}</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { SyVerify } from 'sangyu-ui';
import type { VerifyAnswer, VerifyResult } from 'sangyu-ui';

// 挑战图片数组，真实场景由后端随挑战一起下发
const images = [
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/SpringFestival.JPG',
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/full.jpg',
];

const round = ref(0);
const status = ref('等待验证');

/**
 * 每次 refresh 递增 round：换图片、换缺口坐标，并生成新 id
 * 组件以 challenge.id 为 key，id 变化时会重建挑战并清空拖动位置
 */
const challenge = computed(() => ({
	id: `slider-${round.value}`,
	mode: 'slider' as const,
	image: images[round.value % images.length],
	pieceY: 48 + (round.value % 3) * 40,
	targetX: 160 + (round.value % 4) * 48,
}));

// 模拟后端校验：落点与缺口横向误差 8px 内算通过
async function verify(answer: VerifyAnswer): Promise<VerifyResult> {
	if (answer.mode !== 'slider') {
		return {
			success: false,
		};
	}
	const success = Math.abs(answer.offsetX - challenge.value.targetX) <= 8;
	return {
		success,
		token: success ? `mock-token-${challenge.value.id}` : undefined,
	};
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

.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
