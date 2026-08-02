<template>
	<div v-bind="rootAttrs" :class="classes" :style="[styles, props.customStyle]">
		<span v-if="$slots.prefix" :class="c(ce('prefix'))">
			<slot name="prefix" />
		</span>

		<span v-if="$slots.fronticon" :class="c(ce('fronticon'))">
			<slot name="fronticon" />
		</span>

		<div :class="c('center')">
			<input
				v-bind="mergedInputAttrs"
				:id="inputId"
				ref="inputRef"
				:class="c('input')"
				:type="inputType"
				:name="props.name"
				:value="value"
				:disabled="props.disabled"
				:readonly="props.readonly"
				:autocomplete="props.autocomplete"
				:maxlength="props.maxlength"
				:minlength="props.minlength"
				:placeholder="props.placeholder ? ' ' : undefined"
				:aria-label="ariaLabel"
				@input="handleInput"
				@change="handleChange"
				@compositionstart="handleCompositionStart"
				@compositionend="handleCompositionEnd"
				@focus="handleFocus"
				@blur="handleBlur"
			/>

			<label
				v-if="props.label"
				:for="inputId"
				:class="[c('center-ph'), c('center-ph', cm('label')), { 'is-float': isFloat }]"
			>
				{{ props.label }}
			</label>

			<transition v-else name="sy-input-center-placeholder">
				<span v-if="props.placeholder && !focused && !value" :class="c('center-ph')" aria-hidden="true">
					{{ props.placeholder }}
				</span>
			</transition>
		</div>

		<span v-if="$slots.suffix" :class="c(ce('suffix'))">
			<slot name="suffix" />
		</span>

		<span v-if="$slots.backicon" :class="c(ce('backicon'))">
			<slot name="backicon" />
		</span>

		<InputClear v-if="showClear" :aria-label="props.clearAriaLabel" @clear="handleClear">
			<template v-if="$slots['clear-icon']" #default>
				<slot name="clear-icon" />
			</template>
		</InputClear>
	</div>
</template>

<script setup lang="ts">
import { useClassnames } from '@sangyu-ui/utils';
import { computed, mergeProps, useAttrs } from 'vue';
import type { InputEmits, InputProps, InputSlots, SyInputInstance } from './Input.type';
import { InputClear } from './components';
import { useInput } from './composables';
import { splitInputAttrs } from './helpers';

defineOptions({
	name: 'SyInput',
	inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
	modelValue: '',
	type: 'filled',
	nativeType: 'text',
	size: 'default',
	disabled: false,
	readonly: false,
	clearable: false,
	password: false,
	showPassword: false,
	bgColor: '#f5f7f8',
	textColor: 'black',
	labelColor: 'primary',
	borderColor: 'rgba(0, 0, 0, 0.2)',
	focusColor: 'primary',
	lineColor: '#f1f3f4',
	focuLine: 'primary',
	clearAriaLabel: '清空输入内容',
});

const emit = defineEmits<InputEmits>();
defineSlots<InputSlots>();

const { c, cx, ce, cm } = useClassnames('input');
const attrs = useAttrs();

/**
 * 将外部属性拆分到组件根节点和真实 input。
 */
const forwardedAttrs = computed(() => splitInputAttrs(attrs));

/**
 * inputAttrs 的优先级高于自动转发属性，
 * 允许调用方显式覆盖自动分流结果。
 */
const mergedInputAttrs = computed(() => mergeProps(forwardedAttrs.value.inputAttrs, props.inputAttrs ?? {}));

/**
 * class、style、data-* 等属性继续绑定到组件根节点。
 */
const rootAttrs = computed(() => forwardedAttrs.value.rootAttrs);

const {
	inputRef,
	inputId,
	value,
	focused,
	isFloat,
	showClear,
	inputType,
	ariaLabel,
	styles,
	handleInput,
	handleChange,
	handleCompositionStart,
	handleCompositionEnd,
	handleFocus,
	handleBlur,
	handleClear,
	focus,
	blur,
	select,
} = useInput(props, emit);

const classes = cx(() => ({
	[c()]: true,
	[c(cm(props.type))]: true,
	[c(cm(props.size))]: true,
	[c(cm('label'))]: Boolean(props.label),
	[c(cm('disabled'))]: props.disabled,
	[c(cm('readonly'))]: props.readonly,
	hasfocu: isFloat.value,
}));

defineExpose<SyInputInstance>({
	focus,
	blur,
	select,
});
</script>
