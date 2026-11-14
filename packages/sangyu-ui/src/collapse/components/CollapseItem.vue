<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { collapseKey } from '../context';
import type { SyCollapseItemProps } from '../Collapse.type';

const props = withDefaults(defineProps<SyCollapseItemProps>(), { disabled: false, lazy: false });
defineSlots<{
	default?: () => unknown;
	header?: () => unknown;
	extra?: () => unknown;
	'expand-icon'?: (props: { expanded: boolean }) => unknown;
}>();
const context = inject(collapseKey);
if (!context) {
	throw new Error('SyCollapseItem must be inside SyCollapse');
}
const expanded = computed(() => {
	return context.isExpanded(props.name);
});
const visited = ref(expanded.value);
// 懒加载内容首次展开后保持挂载
watch(expanded, (value) => {
	if (value) {
		visited.value = true;
	}
});
watch(
	() => props.name,
	(name, previous) => {
		// name 改变时同步更新父级注册表
		context.unregister(previous);
		context.register(name);
	},
);
onMounted(() => context.register(props.name));
onBeforeUnmount(() => context.unregister(props.name));
const toggle = () => {
	if (!props.disabled) {
		context.toggle(props.name);
	}
};
</script>

<template>
	<div class="sy-collapse-item" :class="{ 'is-expanded': expanded, 'is-disabled': disabled }">
		<div class="sy-collapse-item__header">
			<button class="sy-collapse-item__trigger" type="button" :disabled="disabled" @click="toggle">
				<span class="sy-collapse-item__title">
					<slot name="header">{{ name }}</slot>
				</span>
				<span class="sy-collapse-item__icon">
					<slot name="expand-icon" :expanded="expanded">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M3.5 6L8 10.5L12.5 6"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</slot>
				</span>
			</button>
			<div v-if="$slots.extra" class="sy-collapse-item__extra"><slot name="extra" /></div>
		</div>
		<div class="sy-collapse-item__panel">
			<div class="sy-collapse-item__content"><slot v-if="!lazy || visited" /></div>
		</div>
	</div>
</template>
