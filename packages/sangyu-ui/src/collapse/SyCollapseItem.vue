<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { collapseKey } from './context';
import type { SyCollapseItemProps } from './Collapse.type';

const props = withDefaults(defineProps<SyCollapseItemProps>(), { disabled: false, lazy: false });
const context = inject(collapseKey);
if (!context) throw new Error('SyCollapseItem must be inside SyCollapse');
const id = useId();
const headerId = `sy-collapse-header-${id}`;
const panelId = `sy-collapse-panel-${id}`;
const expanded = computed(() => context.isExpanded(props.name));
const visited = ref(expanded.value);
watch(expanded, (value) => {
	if (value) visited.value = true;
});
watch(
	() => props.name,
	(name, previous) => {
		context.unregister(previous);
		context.register(name);
	},
);
onMounted(() => context.register(props.name));
onBeforeUnmount(() => context.unregister(props.name));
const toggle = () => {
	if (!props.disabled) context.toggle(props.name);
};
</script>

<template>
	<div class="sy-collapse-item" :class="{ 'is-expanded': expanded, 'is-disabled': disabled }">
		<div class="sy-collapse-item__header">
			<button
				:id="headerId"
				class="sy-collapse-item__trigger"
				type="button"
				:disabled="disabled"
				:aria-expanded="expanded"
				:aria-controls="panelId"
				@click="toggle"
			>
				<span class="sy-collapse-item__title">
					<slot name="header">{{ name }}</slot>
				</span>
				<span class="sy-collapse-item__icon" aria-hidden="true">
					<slot name="expand-icon" :expanded="expanded">⌄</slot>
				</span>
			</button>
			<div v-if="$slots.extra" class="sy-collapse-item__extra"><slot name="extra" /></div>
		</div>
		<div
			:id="panelId"
			class="sy-collapse-item__panel"
			role="region"
			:aria-labelledby="headerId"
			:aria-hidden="!expanded"
		>
			<div class="sy-collapse-item__content"><slot v-if="!lazy || visited" /></div>
		</div>
	</div>
</template>
