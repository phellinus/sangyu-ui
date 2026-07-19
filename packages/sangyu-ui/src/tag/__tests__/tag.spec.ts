import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import SyTag from '../tag.vue';

describe('SyTag', () => {
	it('正确渲染内容、尺寸、描边和动态样式', () => {
		const wrapper = mount(SyTag, {
			props: {
				size: 'small',
				hit: true,
				color: '#336699',
				bgColor: '#eef5ff',
				borderRadius: 10,
				customStyle: 'margin-right: 8px;',
			},
			slots: {
				default: () => '已完成',
			},
		});

		/**
		 * 组件模板最外层存在注释，
		 * 因此通过选择器获取真正的 Tag 根节点。
		 */
		const tag = wrapper.get('.sy-tag');

		// 验证组件基础类名、尺寸类名和描边状态。
		expect(tag.classes()).toContain('sy-tag');
		expect(tag.classes()).toContain('sy-tag-small');
		expect(tag.classes()).toContain('sy-tag--hit');

		// 验证默认插槽内容。
		expect(tag.text()).toContain('已完成');

		// 验证调用方传入的自定义样式。
		expect(tag.attributes('style')).toContain('margin-right: 8px;');

		const style = (tag.element as HTMLElement).style;

		// 验证重构后使用的动态样式变量。
		expect(style.getPropertyValue('--sy-tag-text-color')).toBe('#336699');
		expect(style.getPropertyValue('--sy-tag-background-color')).toBe('#eef5ff');
		expect(style.getPropertyValue('--sy-tag-border-radius')).toBe('10px');
	});

	it('只有 clickable 为 true 时才触发点击事件', async () => {
		const wrapper = mount(SyTag, {
			slots: {
				default: () => '可点击标签',
			},
		});
		const tag = wrapper.get('.sy-tag');

		// 默认不可点击，不应触发组件 click。
		await tag.trigger('click');
		expect(wrapper.emitted('click')).toBeUndefined();

		// 开启可点击状态。
		await wrapper.setProps({
			clickable: true,
		});
		await tag.trigger('click');

		// 验证点击事件和可访问性属性。
		expect(wrapper.emitted('click')).toHaveLength(1);
		expect(tag.classes()).toContain('sy-tag--clickable');
		expect(tag.attributes('role')).toBe('button');
		expect(tag.attributes('tabindex')).toBe('0');
	});

	it('默认关闭图标正常显示且不会触发标签点击', async () => {
		const wrapper = mount(SyTag, {
			props: {
				closable: true,
				clickable: true,
			},
			slots: {
				default: () => '可关闭标签',
			},
		});
		const closeButton = wrapper.get('.sy-tag__close');

		// 未提供 close-icon 时应该显示内部默认 SVG。
		expect(closeButton.find('svg').exists()).toBe(true);
		expect(closeButton.attributes('aria-label')).toBe('关闭标签');

		// 点击关闭按钮。
		await closeButton.trigger('click');

		// 只触发 close，不应冒泡触发 Tag click。
		expect(wrapper.emitted('close')).toHaveLength(1);
		expect(wrapper.emitted('click')).toBeUndefined();
	});

	it('自定义 close-icon 会替换默认 SVG', () => {
		const wrapper = mount(SyTag, {
			props: {
				closable: true,
			},
			slots: {
				default: () => '自定义图标标签',
				// 使用自定义关闭图标。
				'close-icon': () => h('span', { class: 'custom-close-icon' }, '×'),
			},
		});
		const closeButton = wrapper.get('.sy-tag__close');

		// 自定义图标存在时不再渲染默认 SVG。
		expect(closeButton.find('.custom-close-icon').exists()).toBe(true);
		expect(closeButton.find('svg').exists()).toBe(false);
	});

	it('可点击标签支持 Enter 和空格键', async () => {
		const wrapper = mount(SyTag, {
			props: {
				clickable: true,
			},
			slots: {
				default: () => '键盘标签',
			},
		});
		const tag = wrapper.get('.sy-tag');

		// Enter 和空格键都应该触发组件 click。
		await tag.trigger('keydown', {
			key: 'Enter',
		});
		await tag.trigger('keydown', {
			key: ' ',
		});

		expect(wrapper.emitted('click')).toHaveLength(2);
	});
});
