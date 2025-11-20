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
    import { getColor, useClassnames, getColorWithAlpha, darkenColor } from '@sangyu-ui/utils';
    import { PropType, computed, nextTick, reactive, type CSSProperties } from 'vue';
    defineOptions({
        name: 'SyButton',
    });
    const emits = defineEmits(['click', 'mouseover', 'mouseout', 'blur']);
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
            default: '',
        },
        radius: {
            type: String as PropType<'small' | 'default' | 'large'>,
            default: 'default',
        },
        gradientDirection: {
            type: String as PropType<string>,
            default: '30deg',
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
        active: false,
    });
    const { c, cx, cm } = useClassnames('button');
    const cls = cx(() => {
        return {
            [c()]: true,
            [c(cm(props.type))]: true,
            [c('size', cm(props.size))]: true,
            [c(`${props.type}`, 'position', cm(props.linePosition))]: true,
            [c(`${props.type}`, 'origin', cm(props.lineOrigin))]: true,
        };
    });
    const handleCLick = (e: MouseEvent) => {
        emits('click', e);
        const { clientX, clientY, currentTarget } = e;

        nextTick(() => {
            if (props.href) {
                window.location.href = props.href;
            }

            const target = currentTarget as HTMLElement | null;
            if (!target) return;

            const rippleEnabled = ['filled', 'border', 'flat'];

            if (rippleEnabled.includes(props.type)) {
                const rect = target.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const offsetX = clientX - rect.left - size / 2;
                const offsetY = clientY - rect.top - size / 2;

                const ripple = document.createElement('span');
                ripple.className = 'sy-button__ripple';
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${offsetX}px`;
                ripple.style.top = `${offsetY}px`;

                // 波纹颜色根据类型定制
                if (props.type === 'border') {
                    ripple.style.backgroundColor = getColorWithAlpha(getColor(props.color), 1);
                }

                if (props.type === 'flat') {
                    ripple.style.backgroundColor = getColorWithAlpha(getColor(props.color), 1);
                }

                if (props.type === 'flat') {
                    state.active = false;
                }

                target.appendChild(ripple);

                ripple.addEventListener('animationend', () => {
                    ripple.remove();

                    if (props.type === 'border' || props.type === 'flat') {
                        state.active = true;
                    }
                });

                if (props.type === 'filled') {
                    state.active = true;
                }

                return;
            }

            // 其他类型需要 active 状态变化时直接处理
            state.active = true;
        });
    };
    const mouseoverx = (e: MouseEvent) => {
        emits('mouseover', e);
        state.hover = true;
    };
    const mouseoutx = (e: MouseEvent) => {
        emits('mouseout', e);
        state.hover = false;
    };
    const blurbutton = (e: MouseEvent) => {
        emits('blur', e);
        state.active = false;
    };
    const listeners = computed(() => {
        return {
            click: handleCLick,
            mouseover: mouseoverx,
            mouseout: mouseoutx,
            blur: blurbutton,
        };
    });
    const buttonStyle = computed<CSSProperties>(() => {
        const styles: Record<string, string> = {};

        // filled 类型
        if (props.type === 'filled') {
            return {
                border: 'none',
                backgroundColor: getColor(props.color),
                color: props.textColor != '' ? getColor(props.textColor) : 'white',
                boxShadow: state.hover ? `0px 8px 25px -8px ${getColor(props.color)}` : null,
            };
        }

        // border 类型
        if (props.type === 'border') {
            return {
                border: `1px solid ${getColor(props.color)}`,
                backgroundColor: state.active
                    ? getColor(props.color)
                    : state.hover
                      ? getColorWithAlpha(getColor(props.color), 0.2)
                      : 'transparent',
                color: state.active
                    ? 'white'
                    : props.textColor != ''
                      ? getColor(props.textColor)
                      : getColor(props.color),
            };
        }
        //flat 类型
        if (props.type === 'flat') {
            return {
                border: 'none',
                backgroundColor: state.active
                    ? getColor(props.color)
                    : state.hover
                      ? getColorWithAlpha(getColor(props.color), 0.2)
                      : 'transparent',
                color: state.active
                    ? 'white'
                    : props.textColor != ''
                      ? getColor(props.textColor)
                      : getColor(props.color),
            };
        }
        if (props.type === 'line') {
            const mainColor = getColor(props.color);
            const fadeColor = getColorWithAlpha(mainColor, 0.3);

            return {
                border: 'none',
                color: props.textColor != '' ? getColor(props.textColor) : getColor(props.color),
                '--sy-line-color': mainColor,
                '--sy-line-color-fade': state.active ? mainColor : fadeColor,
            };
        }
        if (props.type === 'gradient') {
            const grcolor = props.gradientColorSecondary
                ? getColor(props.gradientColorSecondary)
                : darkenColor(props.color);
            return {
                background: `linear-gradient(${props.gradientDirection}, ${getColor(props.color)} 0%, ${grcolor} 100%)`,
                color: props.textColor != '' ? getColor(props.textColor) : 'white',
                border: 'none',
                boxShadow: state.hover ? `0px 8px 25px -8px ${getColor(props.color)}` : null,
            };
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

<style lang="less" scoped>
    button {
        position: relative;
        overflow: hidden;
    }

    :deep(.sy-button__ripple) {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        opacity: 0.4;
        pointer-events: none;
        background-color: rgba(255, 255, 255);
        animation: sy-button-ripple 600ms ease-out;
    }

    @keyframes sy-button-ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
</style>
