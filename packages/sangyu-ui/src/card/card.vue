<template>
	<div v-bind="$attrs" :style="tableStyle" :class="cardCls">
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
import { SyCardProps } from './Card.type';
import { computed, getCurrentInstance } from 'vue';

defineOptions({
	name: 'SyCard',
	inheritAttrs: false,
});
defineSlots<{
	default?: () => void;
	header?: () => void;
	footer?: () => void;
}>();
const props = withDefaults(defineProps<SyCardProps>(), {
	customStyle: '',
	headerStyle: '',
	footerStyle: '',
	bodyStyle: '',
	shadow: 'always',
	borderRadius: '20',
});
const instance = getCurrentInstance();
const { c, cm } = useClassnames('card');
const cardCls = {
	[c()]: true,
	[c(cm('shadow-' + props.shadow))]: true,
};
//表格样式
const tableStyle = computed(() => [
	props.customStyle,
	(() => {
		const borderRadius = props.borderRadius;
		return {
			borderRadius:
				instance?.vnode.props?.borderRadius === undefined
					? 'var(--sy-card-border-radius, 20px)'
					: `${borderRadius}px`,
		};
	})(),
]);
</script>

<style scoped></style>
