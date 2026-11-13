<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, provide, ref, watch } from 'vue';
import { collapseKey } from './context';
import type { CollapseName, CollapseValue, SyCollapseProps } from './Collapse.type';

const props = withDefaults(defineProps<SyCollapseProps>(), { accordion: false });
const emit = defineEmits<{ 'update:modelValue': [value: CollapseValue]; change: [value: CollapseValue] }>();
const instance = getCurrentInstance();
const controlled = computed(() => Object.prototype.hasOwnProperty.call(instance?.vnode.props ?? {}, 'modelValue'));
const localValue = ref<CollapseValue>(props.defaultValue);
const names = ref<CollapseName[]>([]);
const value = computed(() => (controlled.value ? props.modelValue : localValue.value));
const asArray = (input: CollapseValue): CollapseName[] =>
	input === undefined ? [] : Array.isArray(input) ? input : [input];
const normalize = (input: CollapseValue): CollapseValue => {
	const valid = asArray(input).filter((name) => names.value.includes(name));
	return props.accordion ? valid[0] : valid;
};
const equal = (left: CollapseValue, right: CollapseValue) => JSON.stringify(left) === JSON.stringify(right);
const update = (next: CollapseValue) => {
	if (equal(value.value, next)) return;
	if (!controlled.value) localValue.value = next;
	emit('update:modelValue', next);
	emit('change', next);
};
provide(collapseKey, {
	isExpanded: (name) => asArray(value.value).includes(name),
	toggle: (name) => {
		const current = asArray(value.value);
		if (props.accordion) update(current.includes(name) ? undefined : name);
		else update(current.includes(name) ? current.filter((entry) => entry !== name) : [...current, name]);
	},
	register: (name) => {
		if (!names.value.includes(name)) names.value = [...names.value, name];
	},
	unregister: (name) => {
		names.value = names.value.filter((entry) => entry !== name);
		nextTick(() => update(normalize(value.value)));
	},
});
watch(
	() => props.accordion,
	() => update(normalize(value.value)),
);
</script>

<template>
	<div class="sy-collapse"><slot /></div>
</template>
