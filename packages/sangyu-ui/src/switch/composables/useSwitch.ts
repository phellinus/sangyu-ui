import { computed, CSSProperties, ref, useId, type Ref } from 'vue';
import { SwitchEmits, SwitchProps } from '../Switch.type';
import { useSwitchModel } from './useSwitchModel';
import { getColor, getColorWithAlpha } from '@sangyu-ui/utils';

/**
 * 管理 Switch 的原生属性、展示状态和交互行为
 * @param props Switch 组件属性
 * @param emit Switch 组件事件派发器
 * @param mergedDisabled 合并 Switch 自身和 Form 后的禁用状态
 * @returns Switch 的原生属性、展示状态和交互方法
 */
export function useSwitch(props: Readonly<SwitchProps>, emit: SwitchEmits, mergedDisabled: Readonly<Ref<boolean>>) {
	/** 原生 input 引用，用于 focus / blur 暴露方法。 */
	const inputRef = ref<HTMLInputElement>();

	/** 生成稳定的组件唯一 id，供原生 input 关联使用。 */
	const generatedId = useId();

	/** 复用值模型逻辑，只在当前层消费 checked 与 toggle。 */
	const { checked, toggle } = useSwitchModel(props, emit);

	/** 组件内部使用的唯一 id。 */
	const id = computed(() => `sy-switch-${generatedId}`);

	/** 组件、Form 和 loading 任一禁用时都不可交互 */
	const disabled = computed(() => Boolean(mergedDisabled.value || props.loading));

	/** 统一尺寸默认值，避免模板层反复兜底。 */
	const size = computed(() => props.size || 'default');

	/** 统一形状默认值，默认采用 round 胶囊样式。 */
	const shape = computed(() => props.shape || 'round');

	/** 选中态文案，未传时回退为空字符串。 */
	const checkedText = computed(() => props.checkedText ?? '');

	/** 未选中态文案，未传时回退为空字符串。 */
	const uncheckedText = computed(() => props.uncheckedText ?? '');

	/** 是否存在按状态变化的自定义文案。 */
	const hasCustomStateText = computed(() => checkedText.value || uncheckedText.value);

	/** 根据当前状态返回应该显示的文案内容。 */
	const currentText = computed(() => {
		if (checked.value) return checkedText.value;
		return uncheckedText.value;
	});
	/**
	 * 根据当前状态返回应渲染的图标名称。
	 *
	 * 优先级：
	 * 1. activeIconName / inactiveIconName
	 * 2. iconName
	 * 3. 空字符串
	 */
	const currentIconName = computed(() => {
		if (checked.value) return props.activeIconName || props.iconName || '';
		return props.inactiveIconName || props.iconName || '';
	});

	/**
	 * 生成组件样式所需的 CSS 变量。
	 *
	 * 说明：
	 * 1. active-color 为激活主色
	 * 2. soft / strong 用于 focus ring、阴影或 hover 过渡
	 * 3. inactive-color 用于未激活轨道底色
	 */
	const styles = computed<CSSProperties>(() => {
		const activeColor = getColor(props.color || 'primary');
		const inactiveTrack = getColor(props.inactiveColor || '#eef1f4');

		return {
			'--sy-switch-active-color': activeColor,
			'--sy-switch-active-color-soft': getColorWithAlpha(props.color || 'primary', 0.18),
			'--sy-switch-active-color-strong': getColorWithAlpha(props.color || 'primary', 0.3),
			'--sy-switch-inactive-color': inactiveTrack,
		} as CSSProperties;
	});

	/** 原生 change 事件的统一入口；禁用态下直接阻断切换。 */
	const handleChange = (): void => {
		if (disabled.value) return;
		toggle();
	};

	/** 聚焦到底层原生 input。 */
	const focus = (): void => {
		if (disabled.value) return;

		inputRef.value?.focus();
	};

	/** 让底层原生 input 失焦。 */
	const blur = (): void => {
		inputRef.value?.blur();
	};

	return {
		inputRef,
		id,
		checked,
		disabled,
		size,
		shape,
		currentText,
		currentIconName,
		hasCustomStateText,
		styles,
		handleChange,
		focus,
		blur,
	};
}
