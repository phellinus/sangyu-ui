import { computed, getCurrentInstance, ref, watch, type CSSProperties } from 'vue';
import { getColor, getColorWithAlpha, useClassnames } from '@sangyu-ui/utils';
import { BUTTON_RIPPLE_TYPES } from '../constants';
import { createButtonRipple } from '../helpers';
import type { ButtonEmits, ButtonProps, ButtonVariant } from '../Button.type';

type ButtonRootElement = HTMLButtonElement | HTMLAnchorElement;
type ButtonAttrs = Readonly<Record<string, unknown>>;

export function useButton(props: Readonly<ButtonProps>, emit: ButtonEmits, attrs: ButtonAttrs) {
	const rootRef = ref<ButtonRootElement>();
	const instance = getCurrentInstance();
	//当前按钮是否是选中的状态
	const active = ref(false);
	const { c, cm, cx } = useClassnames('button');

	const variant = computed<ButtonVariant>(() => props.type || 'filled');
	const disabled = computed(() => Boolean(props.disabled || props.loading));
	const tag = computed(() => (props.href ? 'a' : 'button'));

	const classes = cx(() => ({
		[c()]: true,
		[c(cm(variant.value))]: true,
		[c('size', cm(props.size || 'default'))]: true,
		[c('radius', cm(props.radius || 'default'))]: true,
		[c('active')]: active.value,
		[c('disabled')]: disabled.value,
		[c('loading')]: Boolean(props.loading),

		[c('line', 'position', cm(props.linePosition || 'bottom'))]: variant.value === 'line',

		[c('line', 'origin', cm(props.lineOrigin || 'center'))]: variant.value === 'line',
	}));

	const styles = computed<CSSProperties>(() => {
		const colorToken = props.color || 'primary';
		const color = getColor(colorToken);

		const result: Record<string, string> = {
			'--sy-button-gradient-direction': props.gradientDirection || '30deg',
		};

		if (colorToken !== 'primary' || Object.hasOwn(instance?.vnode.props ?? {}, 'color')) {
			result['--sy-button-color'] = color;
			result['--sy-button-color-soft'] = getColorWithAlpha(colorToken, 0.16);
			result['--sy-button-shadow-color'] = getColorWithAlpha(colorToken, 0.38);
			result['--sy-button-focus-shadow'] = `0 0 0 3px ${getColorWithAlpha(colorToken, 0.16)}`;
			result['--sy-button-hover-shadow'] = `0 8px 25px -8px ${getColorWithAlpha(colorToken, 0.38)}`;
			result['--sy-button-relief-color'] = `color-mix(in srgb, ${color} 70%, black)`;
		}
		if (props.gradientColorSecondary) {
			result['--sy-button-gradient-secondary'] = getColor(props.gradientColorSecondary);
		}

		if (props.textColor) {
			result['--sy-button-text-color'] = getColor(props.textColor);
		}

		return result as CSSProperties;
	});

	const rootAttrs = computed(() => {
		if (props.href) {
			return {
				...attrs,
				href: disabled.value ? undefined : props.href,
				target: props.target,
				rel: props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined),
				'aria-disabled': disabled.value ? 'true' : undefined,
				'aria-busy': props.loading ? 'true' : undefined,
				tabindex: disabled.value ? -1 : attrs.tabindex,
			};
		}

		return {
			...attrs,
			type: props.nativeType || 'button',
			disabled: disabled.value,
			'aria-busy': props.loading ? 'true' : undefined,
		};
	});

	const handleClick = (event: MouseEvent) => {
		if (disabled.value) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		active.value = true;
		emit('click', event);

		if (BUTTON_RIPPLE_TYPES.includes(variant.value)) {
			const rippleColor =
				variant.value === 'border' || variant.value === 'flat' ? getColor(props.color || 'primary') : undefined;

			createButtonRipple(event, rippleColor);
		}
	};

	const handleMouseover = (event: MouseEvent) => {
		emit('mouseover', event);
	};

	const handleMouseout = (event: MouseEvent) => {
		emit('mouseout', event);
	};

	const handleBlur = (event: FocusEvent) => {
		active.value = false;
		emit('blur', event);
	};

	const focus = () => rootRef.value?.focus();
	const blur = () => rootRef.value?.blur();

	watch(
		disabled,
		(value) => {
			if (value) {
				active.value = false;
			}
		},
		{ flush: 'sync' },
	);
	return {
		c,
		rootRef,
		tag,
		active,
		classes,
		styles,
		rootAttrs,
		handleClick,
		handleMouseover,
		handleMouseout,
		handleBlur,
		focus,
		blur,
	};
}
