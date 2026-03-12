<template>
	<div :style="tableStyle" :class="cardCls">
		<div v-if="$slots.header" class="sy-card-header" :style="props.headerStyle">
			<slot name="header"></slot>
		</div>

		<div class="sy-card-content" :style="props.bodyStyle">
			<slot></slot>
		</div>

		<div v-if="$slots.footer" class="sy-card-footer" :style="props.footerStyle">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useClassnames } from '@sangyu-ui/utils';
	import { SyCardProps } from './interface';
	import { computed } from 'vue';

	defineOptions({
		name: 'SyCard',
		inheritAttrs: false,
	});
	defineSlots<{
		default: () => void;
		header: () => void;
		footer: () => void;
	}>();
	const props = withDefaults(defineProps<SyCardProps>(), {
		customStyle: '',
		headerStyle: '',
		footerStyle: '',
		bodyStyle: '',
		shadow: 'always',
		borderRadius: '20',
	});
	const { c, cm } = useClassnames('card');
	const cardCls = {
		[c()]: true,
		[c(cm('shadow-' + props.shadow))]: true,
	};
	//表格样式
	const tableStyle = computed(() => [
		props.customStyle,
		{
			borderRadius: `${props.borderRadius}px`,
		},
	]);
</script>

<style scoped></style>
