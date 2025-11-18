<template>
    <div>
        <button :class="cls" :disabled="props.disabled" :size="props.size" @click="handleCLick">
            <slot />
        </button>
    </div>
</template>

<script setup lang="ts">
    import { useClassnames } from '@sangyu-ui/utils';
    import { PropType } from 'vue';
    defineOptions({
        name: 'SyButton',
    });
    const emits = defineEmits(['click']);
    const props = defineProps({
        type: {
            type: String as PropType<
                'primary' | 'default' | 'dashed' | 'filled' | 'border' | 'flat' | 'line' | 'gradient' | 'relief'
            >,
            default: 'default',
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        href: {
            type: String as PropType<string>,
            default: '',
        },
        color: {
            type: String as PropType<string>,
            default: '',
        },
        lineOrigin: {
            type: String as PropType<'left' | 'right' | 'center'>,
            default: 'center',
        },
        linePosition: {
            type: String as PropType<'top' | 'bottom'>,
            default: 'bottom',
        },
        size: {
            type: String as PropType<'small' | 'default' | 'large'>,
            default: 'default',
        },
        textColor: {
            type: String as PropType<string>,
            default: '',
        },
        radius: {
            type: String as PropType<'small' | 'default' | 'large'>,
            default: 'default',
        },
        gradientColorSecondary: {
            type: String as PropType<string>,
            default: '',
        },
    });
    const { c, cx, cm } = useClassnames('button');
    const cls = cx(() => {
        return {
            [c()]: true,
            [c(cm(props.type))]: true,
            [c('size', cm(props.size))]: true,
        };
    });
    const handleCLick = (e: Event) => {
        emits('click', e);
    };
</script>

<style lang="scss" scoped></style>
