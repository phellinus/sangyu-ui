<template>
	<div :style="props.customStyle" :class="cardCls">
		<slot name="header"></slot>
		<div class="sy-card-content" :style="props.bodyStyle">
			<slot></slot>
		</div>
		<slot name="footer"></slot>
	</div>
</template>

<script setup lang="ts">
	import { useClassnames } from '@sangyu-ui/utils';
	import { SyCardProps } from './interface';

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
	});
	const { c, cm } = useClassnames('card');
	const cardCls = {
		[c()]: true,
		[c(cm(props.shadow))]: true,
	};
</script>

<style scoped></style>
