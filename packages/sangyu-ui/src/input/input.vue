<template>
    <div
        :class="[cls, { hasfocu: isFloat }]"
        :style="inputStyle"
        v-bind="omit($attrs, originInputProps)"
        @mousedown.prevent="!props.disabled && inputRef?.focus()"
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
                :type="props.type == 'password' ? 'password' : 'text'"
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
                v-if="props.placeholder && (props.type === 'label' || props.type === 'label-border')"
                class="sy-input-center-ph sy-input-center-ph--label"
                :class="{ 'is-float': isFloat }"
                aria-hidden="true"
            >
                {{ props.placeholder }}
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
        borderColor: 'primary',
        disabled: false,
        size: 'default',
        type: 'filled',
        clearable: false,
        bgColor: '#F5F7F8',
        textColor: 'black',
    });
    const emit = defineEmits<{
        'update:modelValue': [string];
    }>();
    const focused = ref(false);
    //判断label是否上浮
    const isFloat = computed(() => {
        return focused.value || String(props.modelValue ?? '') !== '';
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
