<template>
    <div :class="cls" :style="inputStyle" v-bind="omit($attrs, originInputProps)">
        <span v-if="$slots.prefix" :class="c(ce('prefix'))">
            <slot name="prefix"></slot>
        </span>
        <div class="sy-input-center">
            <input
                ref="inputRef"
                v-bind="pick($attrs, originInputProps)"
                :class="inputCls"
                :value="modelValue"
                :placeholder="props.placeholder ? ' ' : ''"
                :disabled="props.disabled"
                @input="handleInput"
            />
            <span class="sy-input-center-ph" aria-hidden="true">{{ props.placeholder }}</span>
        </div>

        <span v-if="$slots.suffix" :class="c(ce('suffix'))">
            <slot name="suffix"></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
    import { nextTick, onMounted, ref } from 'vue';
    import { InputProps, originInputProps } from './interface';
    import { getColor, useClassnames } from '@sangyu-ui/utils';
    import { omit, pick } from 'lodash-es';
    const inputRef = ref<HTMLInputElement>();

    defineOptions({
        name: 'SyInput',
        inheritAttrs: false,
    });
    defineSlots<{
        prefix(): any;
        suffix(): any;
    }>();
    const props = withDefaults(defineProps<InputProps>(), {
        focusBorderColor: 'primary',
        borderColor: '#1a1a1a',
        disabled: false,
        size: 'default',
    });
    const emit = defineEmits<{
        'update:modelValue': [string];
    }>();
    const { c, cx, cm, ce } = useClassnames('input');
    const cls = cx(() => {
        return {
            [c()]: true,
            [c(cm('disabled'))]: props.disabled,
            [c(cm(props.size))]: !!props.size,
        };
    });
    const inputCls = cx(() => {
        return {
            [c('input')]: true,
        };
    });
    //输入框样式
    const inputStyle = {
        '--border-color': getColor(props.borderColor),
        '--focus-border-color': getColor(props.focusBorderColor),
    };
    const setInputValue = () => {
        const _input = inputRef.value;
        if (!_input || _input.value === props.modelValue) return;

        _input.value = props.modelValue ?? '';
    };
    //输入
    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (props.modelValue === target.value) return;
        emit('update:modelValue', target.value);
        nextTick(() => {
            setInputValue();
        });
    };
    const focus = () => {
        inputRef.value?.focus();
    };
    const blur = () => {
        inputRef.value?.blur();
    };
    onMounted(() => {
        setInputValue();
    });
    defineExpose({
        focus,
        blur,
    });
</script>

<style scoped></style>
