<script setup lang="ts">
import { shallowRef } from 'vue';

import type { SequenceChallengeData, VerifyAnswer } from '../Verify.type';

const props = defineProps<{ challenge: SequenceChallengeData; disabled?: boolean }>();
const emit = defineEmits<{ submit: [answer: VerifyAnswer] }>();
const selectedIds = shallowRef<string[]>([]);

function selectItem(id: string) {
	if (props.disabled || selectedIds.value.includes(id)) {
		return;
	}

	selectedIds.value = [...selectedIds.value, id];

	if (selectedIds.value.length === props.challenge.prompt.length) {
		emit('submit', {
			mode: 'sequence',
			challengeId: props.challenge.id,
			itemIds: selectedIds.value,
		});
	}
}
</script>

<template>
	<div class="sy-verify-sequence">
		<div class="sy-verify-sequence-image">
			<img :src="challenge.image" alt="" draggable="false" />
			<button
				v-for="item in challenge.items"
				:key="item.id"
				type="button"
				class="sy-verify-sequence-item"
				:disabled="disabled || selectedIds.includes(item.id)"
				:style="{ left: `${item.x}px`, top: `${item.y}px` }"
				@click="selectItem(item.id)"
			>
				{{ item.text }}
			</button>
		</div>
		<p class="sy-verify-hint">请依次点击：{{ challenge.prompt.join(' → ') }}</p>
	</div>
</template>
