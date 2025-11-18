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
            type: String as PropType<'primary' | 'default' | 'dashed'>,
            default: 'default',
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        size: {
            type: String as PropType<'small' | 'default' | 'large'>,
            default: 'default',
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
