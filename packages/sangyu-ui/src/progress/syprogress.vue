<template>
	<div
		:class="progressCls"
		:style="progressStyle"
		:data-type="props.type"
		:data-percentage="normalizedPercentage"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100"
		:aria-valuenow="normalizedPercentage"
	>
		<template v-if="isLine">
			<div :class="c('line-track')">
				<div :class="c('line-bar')" :style="lineBarStyle"></div>
			</div>
			<span v-if="props.showInfo" :class="c('info')">{{ progressText }}</span>
		</template>

		<template v-else>
			<div :class="c('circle-wrap')">
				<svg
					:class="c('circle-svg')"
					:width="circleSize"
					:height="circleSize"
					:viewBox="`0 0 ${circleSize} ${circleSize}`"
				>
					<circle
						:class="c('circle-track')"
						:cx="circleCenter"
						:cy="circleCenter"
						:r="circleRadius"
						fill="none"
						:stroke="resolvedTrackColor"
						:stroke-width="circleStrokeWidth"
					/>
					<circle
						:class="c('circle-bar')"
						:cx="circleCenter"
						:cy="circleCenter"
						:r="circleRadius"
						fill="none"
						:stroke="resolvedColor"
						:stroke-width="circleStrokeWidth"
						stroke-linecap="round"
						:stroke-dasharray="circleCircumference"
						:stroke-dashoffset="circleDashoffset"
					/>
				</svg>
				<span v-if="props.showInfo" :class="[c('info'), c('info-inside')]">{{ progressText }}</span>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { getColor, useClassnames } from '@sangyu-ui/utils';
import { ProgressProps } from './interface';

defineOptions({
	name: 'SyProgress',
});

const props = withDefaults(defineProps<ProgressProps>(), {
	percentage: 0,
	type: 'line',
	showInfo: true,
	color: 'primary',
	trackColor: '',
	size: undefined,
	borderRadius: 999,
	customStyle: '',
});

const { c } = useClassnames('progress');
const instance = getCurrentInstance();
const hasExplicitProp = (name: string) => instance?.vnode.props?.[name] !== undefined;
const isLine = computed(() => props.type === 'line');
const normalizedPercentage = computed(() => {
	const value = Number.isFinite(props.percentage) ? Number(props.percentage) : 0;
	return Math.min(100, Math.max(0, Math.round(value)));
});
const resolvedColor = computed(() => {
	const color = props.color;
	return hasExplicitProp('color') ? getColor(color) : 'var(--sy-progress-default-color, var(--sy-color-primary))';
});
const resolvedTrackColor = computed(() => {
	if (props.trackColor) {
		return getColor(props.trackColor);
	}

	return 'var(--sy-progress-default-track-color, color-mix(in srgb, var(--sy-progress-color) 16%, transparent))';
});
const lineSize = computed(() => Math.max(4, props.type === 'line' ? (props.size ?? 8) : 8));
const lineRadius = computed(() => {
	const borderRadius = props.borderRadius;
	return hasExplicitProp('borderRadius') ? Math.max(0, borderRadius) : undefined;
});
const circleSize = computed(() => Math.max(56, props.type === 'circle' ? (props.size ?? 120) : 120));
const circleStrokeWidth = computed(() => Math.max(6, Math.round(circleSize.value * 0.08)));
const circleCenter = computed(() => circleSize.value / 2);
const circleRadius = computed(() => (circleSize.value - circleStrokeWidth.value) / 2);
const circleCircumference = computed(() => 2 * Math.PI * circleRadius.value);
const circleDashoffset = computed(() => circleCircumference.value * (1 - normalizedPercentage.value / 100));
const progressText = computed(() => `${normalizedPercentage.value}%`);
const progressCls = computed(() => ({
	[c()]: true,
	[c(props.type)]: true,
	[c('with-info')]: props.showInfo,
}));
const progressStyle = computed(() => [
	props.customStyle,
	{
		'--sy-progress-color': resolvedColor.value,
		'--sy-progress-track-color': resolvedTrackColor.value,
		'--sy-progress-line-size': props.size === undefined ? undefined : `${lineSize.value}px`,
		'--sy-progress-line-radius': lineRadius.value === undefined ? undefined : `${lineRadius.value}px`,
		'--sy-progress-circle-size': props.size === undefined ? undefined : `${circleSize.value}px`,
		'--sy-progress-info-size-override':
			props.size === undefined ? undefined : `${Math.max(12, Math.round(circleSize.value * 0.18))}px`,
	},
]);
const lineBarStyle = computed(() => ({
	width: `${normalizedPercentage.value}%`,
	borderRadius: lineRadius.value === undefined ? undefined : `${lineRadius.value}px`,
}));
</script>

<style scoped></style>
