<docs>
---
title: 顺序点选
---

顺序点选模式。按提示顺序点击图片中的文字，点满后组件自动提交答案。答案以文字的唯一 `id` 序列上报，重复点击同一文字不会生效。出题与校验均为前端 mock，仅用于演示，真实业务请替换为后端接口。
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
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/snow.webp',
	'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/spring.jpg',
];

// 图片中的文字及坐标，基于 400×225 的图片渲染区域；展示顺序故意打乱
const items = [
	{ id: 'qiu', text: '秋', x: 120, y: 148 },
	{ id: 'chun', text: '春', x: 56, y: 48 },
	{ id: 'dong', text: '冬', x: 312, y: 136 },
	{ id: 'xia', text: '夏', x: 284, y: 36 },
];
// 要求点击的顺序，与 items 的展示顺序不同
const prompt = ['春', '夏', '秋', '冬'];

const round = ref(0);
const status = ref('等待验证');

// 每次 refresh 递增 round：换图片并生成新 id，组件据此重建点选进度
const challenge = computed(() => ({
	id: `sequence-${round.value}`,
	mode: 'sequence' as const,
	image: images[round.value % images.length],
	items,
	prompt,
}));

// 模拟后端校验：把 prompt 映射成 id 序列，与提交的点击顺序逐位比对
async function verify(answer: VerifyAnswer): Promise<VerifyResult> {
	if (answer.mode !== 'sequence') return { success: false };
	const expectedIds = prompt.map((text) => items.find((item) => item.text === text)?.id);
	const success = answer.itemIds.join(',') === expectedIds.join(',');
	return { success, token: success ? `mock-token-${challenge.value.id}` : undefined };
}

function onSuccess(result: VerifyResult) {
	status.value = `验证通过，token：${result.token}`;
}

function onFail() {
	status.value = '顺序不正确，请换一张重试';
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
