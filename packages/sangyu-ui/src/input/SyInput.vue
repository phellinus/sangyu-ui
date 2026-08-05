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
				:disabled="disabled"
				:readonly="props.readonly"
				:autocomplete="props.autocomplete"
				:maxlength="props.maxlength"
				:minlength="props.minlength"
				:placeholder="props.placeholder ? ' ' : undefined"
				:aria-label="ariaLabel"
				:aria-invalid="inputAriaInvalid"
				:aria-describedby="inputAriaDescribedby"
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
import { useFormItemContext } from '../form/composable/useFormItemContext';
import { computed, mergeProps, useAttrs } from 'vue';
import type { AriaAttributes } from 'vue';
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
// 获取当前输入框所在的 FormItem 上下文
const formItemContext = useFormItemContext();

// 输入框最终使用的禁用状态
const mergedDisabled = computed(() => {
	return Boolean(props.disabled || formItemContext?.disabled.value);
});
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
// aria-invalid 支持的有效值
type AriaInvalidValue = Exclude<AriaAttributes['aria-invalid'], undefined>;
/**
 * 判断属性值是否为有效的 aria-invalid
 * @param value 待判断的属性值
 * @returns 是否为有效值
 */
function isAriaInvalidValue(value: unknown): value is AriaInvalidValue {
	return (
		typeof value === 'boolean' ||
		value === 'true' ||
		value === 'false' ||
		value === 'grammar' ||
		value === 'spelling'
	);
}
/**
 * 合并多个 aria-describedby id
 * @param values 待合并的 id
 * @returns 合并后的 id 字符串
 */
function mergeAriaIds(...values: unknown[]): string | undefined {
	const ids = values.flatMap((value) => {
		if (typeof value !== 'string') return [];

		return value.trim().split(/\s+/).filter(Boolean);
	});

	const result = [...new Set(ids)].join(' ');

	return result || undefined;
}

// 输入框最终使用的 aria-invalid
const inputAriaInvalid = computed<AriaAttributes['aria-invalid']>(() => {
	const externalValue = mergedInputAttrs.value['aria-invalid'];

	if (isAriaInvalidValue(externalValue)) {
		return externalValue;
	}

	return formItemContext?.ariaInvalid.value;
});

/** 输入框最终使用的 aria-describedby */
const inputAriaDescribedby = computed(() => {
	return mergeAriaIds(mergedInputAttrs.value['aria-describedby'], formItemContext?.ariaDescribedby.value);
});
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
	disabled,
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
} = useInput(props, emit, mergedDisabled);

const classes = cx(() => ({
	[c()]: true,
	[c(cm(props.type))]: true,
	[c(cm(props.size))]: true,
	[c(cm('label'))]: Boolean(props.label),
	[c(cm('disabled'))]: disabled.value,
	[c(cm('readonly'))]: props.readonly,
	hasfocu: isFloat.value,
}));

defineExpose<SyInputInstance>({
	focus,
	blur,
	select,
});
</script>
