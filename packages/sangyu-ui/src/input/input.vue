<template>
    <div>
        <input ref="inputRef" style="border: 1px solid black" :value="modelValue" @input="handleInput" />
    </div>
</template>

<script setup lang="ts">
    import { nextTick, onMounted, ref } from 'vue';
    import { InputProps } from './interface';
    const inputRef = ref<HTMLInputElement>();

    defineOptions({
        name: 'SyInput',
    });
    const props = defineProps<InputProps>();
    const emit = defineEmits<{
        'update:modelValue': [string];
    }>();
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
