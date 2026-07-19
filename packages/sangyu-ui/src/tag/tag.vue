<template>
	<!--
		使用 span 保持标签的行内元素特性。

		clickable 开启后添加 button 语义和 tabindex，
		让标签可以通过键盘聚焦和触发。
	-->
	<span
		v-bind="$attrs"
		:class="tagClasses"
		:style="[tagStyle, props.customStyle]"
		:role="props.clickable ? 'button' : undefined"
		:tabindex="props.clickable ? 0 : undefined"
		@click="handleClick"
		@keydown="handleKeydown"
	>
		<slot />
		<TagClose v-if="props.closable" :aria-label="props.closeAriaLabel" @close="handleClose">
			<template v-if="$slots['close-icon']" #default>
				<slot name="close-icon" />
			</template>
		</TagClose>
	</span>
</template>

<script setup lang="ts">
	import { useClassnames } from '@sangyu-ui/utils';
	import type { TagEmits, TagProps, TagSlots } from './Tag.type';
	import { TagClose } from './components';
	import { useTag } from './composables';

	/**
	 * 声明组件名称，并关闭默认属性继承。
	 *
	 * $attrs 会在模板中明确传递给根节点。
	 */
	defineOptions({
		name: 'SyTag',
		inheritAttrs: false,
	});

	/**
	 * 声明组件属性及其默认值。
	 */
	const props = withDefaults(defineProps<TagProps>(), {
		type: 'primary',
		size: 'default',
		closable: false,
		hit: false,
		borderRadius: 6,
		clickable: false,
		closeAriaLabel: '关闭标签',
	});

	/** 声明组件事件 */
	const emit = defineEmits<TagEmits>();

	/** 声明组件插槽 */
	defineSlots<TagSlots>();

	/** 获取 Tag 组件的 BEM 类名工具 */
	const { c, cm, cx } = useClassnames('tag');

	/** 获取标签动态样式和交互方法 */
	const { tagStyle, handleClick, handleKeydown, handleClose } = useTag(props, emit);

	/**
	 * 响应式生成标签类名
	 * 原实现使用普通对象，运行时修改 size 或 hit 后，
	 * 类名不会跟随 Props 更新
	 */
	const tagClasses = cx(() => ({
		[c()]: true,

		/**
		 * 保留仓库现有尺寸类名格式：
		 * sy-tag-small、sy-tag-default、sy-tag-large
		 */
		[c(props.size)]: true,

		/**
		 * 状态类名使用 BEM modifier：
		 * sy-tag--hit、sy-tag--clickable
		 */
		[c(cm('hit'))]: props.hit,
		[c(cm('clickable'))]: props.clickable,
		[c(cm('closable'))]: props.closable,
	}));
</script>
