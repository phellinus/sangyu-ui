import { computed, type CSSProperties } from 'vue';
import { getColor, getColorWithAlpha } from '@sangyu-ui/utils';
import type { TagEmits, TagProps } from '../Tag.type';

/** 管理标签的视觉样式和交互逻辑 */
export function useTag(props: Readonly<TagProps>, emit: TagEmits) {
	/** 根据 type 获取标签主题色 */
	const themeColor = computed(() => {
		return getColor(props.type || 'primary');
	});

	/** 文字颜色优先使用 color，否则回退到主题色 */
	const textColor = computed(() => {
		return props.color ? getColor(props.color) : themeColor.value;
	});

	/**
	 * 背景颜色优先使用 bgColor
	 * 未传入 bgColor 时，根据主题色生成透明度为 0.2 的背景
	 */
	const backgroundColor = computed(() => {
		if (props.bgColor) {
			return getColor(props.bgColor);
		}

		return getColorWithAlpha(themeColor.value, 0.2);
	});

	/** 边框颜色跟随文字颜色，并生成较浅的透明效果 */
	const borderColor = computed(() => {
		return getColorWithAlpha(textColor.value, 0.3);
	});

	/**
	 * 统一处理圆角单位
	 * 数字自动添加 px，字符串保留调用方提供的单位
	 */
	const borderRadius = computed(() => {
		const value = props.borderRadius ?? 6;

		return typeof value === 'number' ? `${value}px` : value;
	});

	/**
	 * 通过 CSS 变量向样式文件传递动态颜色
	 * 相比直接写 color、backgroundColor
	 * CSS 变量更方便后续维护 hover、focus 等状态
	 */
	const tagStyle = computed<CSSProperties>(() => {
		return {
			'--sy-tag-text-color': textColor.value,
			'--sy-tag-background-color': backgroundColor.value,
			'--sy-tag-border-color': borderColor.value,
			'--sy-tag-border-radius': borderRadius.value,
		} as CSSProperties;
	});

	/**
	 * 处理标签鼠标点击
	 * clickable 为 false 时不触发组件 click 事件
	 */
	const handleClick = (event: MouseEvent) => {
		if (!props.clickable) return;

		emit('click', event);
	};

	/**
	 * 为可点击标签补充键盘操作。
	 * Enter 和空格键与原生按钮行为保持一致
	 */
	const handleKeydown = (event: KeyboardEvent) => {
		if (!props.clickable) return;

		/**
		 * 避免关闭按钮的键盘事件冒泡后
		 * 再次触发整个标签的点击事件
		 */
		if (event.target !== event.currentTarget) return;

		if (event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		event.preventDefault();
		emit('click', event);
	};

	/**
	 * 处理关闭按钮点击
	 * 组件只抛出事件，不主动控制标签是否从页面移除
	 */
	const handleClose = (event: MouseEvent) => {
		emit('close', event);
	};

	return {
		tagStyle,
		handleClick,
		handleKeydown,
		handleClose,
	};
}
