<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue';

import SliderChallenge from './components/SliderChallenge.vue';
import SequenceChallenge from './components/SequenceChallenge.vue';
import type { VerifyAnswer, VerifyProps, VerifyResult } from './Verify.type';

const props = defineProps<VerifyProps>();
const emit = defineEmits<{
	success: [result: VerifyResult];
	fail: [answer: VerifyAnswer];
	refresh: [];
}>();

const verifying = shallowRef(false);
const slider = useTemplateRef<{ reset: () => void }>('slider');
let requestId = 0;

function fail(answer: VerifyAnswer) {
	slider.value?.reset();
	emit('fail', answer);
}

async function submit(answer: VerifyAnswer) {
	if (verifying.value) return;

	const currentRequest = ++requestId;
	verifying.value = true;

	try {
		const result = await props.verify(answer);
		if (currentRequest !== requestId || answer.challengeId !== props.challenge.id) return;

		if (result.success) emit('success', result);
		else fail(answer);
	} catch {
		if (currentRequest === requestId) fail(answer);
	} finally {
		if (currentRequest === requestId) verifying.value = false;
	}
}

function refresh() {
	requestId++;
	verifying.value = false;
	emit('refresh');
}
</script>

<template>
	<div class="sy-verify">
		<header class="sy-verify-header">
			<strong>安全验证</strong>
			<button type="button" @click="refresh">换一张</button>
		</header>

		<SliderChallenge
			v-if="challenge.mode === 'slider'"
			ref="slider"
			:key="`slider-${challenge.id}`"
			:challenge="challenge"
			:disabled="loading || verifying"
			@submit="submit"
		/>
		<SequenceChallenge
			v-else
			:key="`sequence-${challenge.id}`"
			:challenge="challenge"
			:disabled="loading || verifying"
			@submit="submit"
		/>
	</div>
</template>
