<template>
    <div
        :class="[cls, { hasfocu: isFloat }]"
        :style="[inputStyle, props.customStyle]"
        v-bind="omit($attrs, originInputProps)"
    >
        <span v-if="$slots.prefix" :class="c(ce('prefix'))">
            <slot name="prefix"></slot>
        </span>
        <span v-if="$slots.fronticon" :class="c(ce('fronticon'))">
            <slot name="fronticon"></slot>
        </span>
        <div class="sy-input-center">
            <input
                ref="inputRef"
                v-bind="pick($attrs, originInputProps)"
                :type="inputType"
                :class="inputCls"
                :value="modelValue"
                :placeholder="props.placeholder ? ' ' : ''"
                :disabled="props.disabled"
                @input="handleInput"
                @focus="onFocus"
                @blur="onBlur"
            />
            <!-- lable模式 -->
            <span
                v-if="props.label || props.type === 'label-border'"
                class="sy-input-center-ph sy-input-center-ph--label"
                :class="{ 'is-float': isFloat }"
                aria-hidden="true"
            >
                {{ props.label }}
            </span>
            <transition v-else name="sy-input-center-placeholder">
                <span
                    v-if="props.placeholder && !focused && String(props.modelValue ?? '') === ''"
                    class="sy-input-center-ph"
                    aria-hidden="true"
                >
                    {{ props.placeholder }}
                </span>
            </transition>
        </div>

        <span v-if="$slots.suffix" :class="c(ce('suffix'))">
            <slot name="suffix"></slot>
        </span>
        <span v-if="$slots.backicon" :class="c(ce('backicon'))">
            <slot name="backicon"></slot>
        </span>
        <span
            v-if="props.clearable && String(props.modelValue ?? '') !== ''"
            :class="c(ce('suffix'))"
            @click="handleClear"
        >
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke-width="4"
            >
                <path
                    d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linejoin="round"
                />
                <path
                    d="M29.6567 18.3432L18.343 29.6569"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M18.3433 18.3432L29.657 29.6569"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </span>
    </div>
</template>

<script setup lang="ts">
    import { CSSProperties, nextTick, onMounted, ref, computed } from 'vue';
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
        fronticon(): any;
        backicon(): any;
    }>();
    const props = withDefaults(defineProps<InputProps>(), {
        focusBorderColor: 'primary',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        disabled: false,
        size: 'default',
        type: 'filled',
        clearable: false,
        bgColor: '#F5F7F8',
        textColor: 'black',
        lineColor: '#F1F3F4',
        password: false,
        showPassword: false,
    });
    const emit = defineEmits<{
        'update:modelValue': [string];
    }>();
    const focused = ref(false);
    //判断label是否上浮
    const isFloat = computed(() => {
        return focused.value || String(props.modelValue ?? '') !== '';
    });
    const inputType = computed(() => {
        // 不是密码框：永远 text
        if (!props.password) return 'text';
        // 是密码框：showPassword=true 显示明文，否则隐藏
        return props.showPassword ? 'text' : 'password';
    });
    const onFocus = () => {
        if (props.disabled) return;
        focused.value = true;
    };

    const onBlur = () => {
        focused.value = false;
    };
    const { c, cx, cm, ce } = useClassnames('input');
    const cls = cx(() => {
        return {
            [c()]: true,
            [c(cm(props.type))]: true,
            [c(cm('label'))]: !!props.label,
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
    const inputStyle: CSSProperties = {
        width: props.width,
        height: props.height,
        color: getColor(props.textColor),
        backgroundColor: getColor(props.bgColor),
        '--sy-input-bg': getColor(props.bgColor),
        '--border-color': getColor(props.borderColor),
        '--focus-border-color': getColor(props.focusColor),
        '--label-color': getColor(props.labelColor),
        '--line-color': getColor(props.lineColor),
        '--focu-line-color': getColor(props.focuLine),
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
    //清空输入框
    const handleClear = () => {
        emit('update:modelValue', '');
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
