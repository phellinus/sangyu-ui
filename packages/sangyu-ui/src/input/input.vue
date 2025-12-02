<template>
    <div :class="cls" :style="inputStyle">
        <input ref="inputRef" :class="inputCls" :value="modelValue" :disabled="props.disabled" @input="handleInput" />
    </div>
</template>

<script setup lang="ts">
    import { nextTick, onMounted, ref } from 'vue';
    import { InputProps } from './interface';
    import { getColor, useClassnames } from '@sangyu-ui/utils';
    const inputRef = ref<HTMLInputElement>();

    defineOptions({
        name: 'SyInput',
    });
    const props = withDefaults(defineProps<InputProps>(), {
        focusBorderColor: 'primary',
        borderColor: '#1a1a1a',
        disabled: false,
        size: 'default',
    });
    const emit = defineEmits<{
        'update:modelValue': [string];
    }>();
    const { c, cx, cm } = useClassnames('input');
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
    onMounted(() => {
        setInputValue();
    });
</script>

<style scoped></style>
