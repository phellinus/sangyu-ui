<template>
    <div>
        <button
            :class="cls"
            :disabled="props.disabled"
            :size="props.size"
            :style="[buttonStyle, props.customStyle]"
            v-on="listeners"
        >
            <slot />
        </button>
    </div>
</template>

<script setup lang="ts">
    import { getColor, useClassnames } from '@sangyu-ui/utils';
    import { PropType, computed, nextTick, reactive, type CSSProperties } from 'vue';
    defineOptions({
        name: 'SyButton',
    });
    const emits = defineEmits(['click', 'mouseover', 'mouseout']);
    const props = defineProps({
        type: {
            type: String as PropType<
                'primary' | 'default' | 'dashed' | 'filled' | 'border' | 'flat' | 'line' | 'gradient' | 'relief'
            >,
            default: 'filled',
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
            default: 'primary',
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
            default: 'white',
        },
        radius: {
            type: String as PropType<'small' | 'default' | 'large'>,
            default: 'default',
        },
        gradientColorSecondary: {
            type: String as PropType<string>,
            default: '',
        },
        customStyle: {
            type: String as PropType<string>,
            default: '',
        },
    });
    const state = reactive({
        hover: false,
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
        nextTick(() => {
            if (props.href) {
                window.location.href = props.href;
            }
            if (props.type === 'filled') {
                //写这个位置
            }
        });
    };
    const mouseoverx = (e: Event) => {
        emits('mouseover', e);
        state.hover = true;
    };
    const mouseoutx = (e: Event) => {
        emits('mouseout', e);
        state.hover = false;
    };
    const listeners = computed(() => {
        return {
            click: handleCLick,
            mouseover: mouseoverx,
            mouseout: mouseoutx,
        };
    });
    const buttonStyle = computed<CSSProperties>(() => {
        const styles: Record<string, string> = {};

        // filled 类型
        if (props.type === 'filled') {
            return {
                border: 'none',
                backgroundColor: getColor(props.color),
                color: getColor(props.textColor),
                boxShadow: state.hover ? `0px 8px 25px -8px ${getColor(props.color)}` : null,
            };
        }

        // border 类型
        if (props.type === 'border') {
            styles.backgroundColor = '#fff';
            styles.border = `1px solid ${props.color ?? '#409eff'}`;
            styles.color = props.textColor ?? props.color ?? '#409eff';
        }

        // dashed 类型
        if (props.type === 'dashed') {
            styles.backgroundColor = '#fff';
            styles.border = `1px dashed ${props.color ?? '#409eff'}`;
            styles.color = props.textColor ?? props.color ?? '#409eff';
        }

        return styles;
    });
</script>

<style lang="scss" scoped></style>
