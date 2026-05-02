import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SyTag from '../tag.vue';

describe('SyTag', () => {
	it('renders slot text, size classes and computed styles', () => {
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

		expect(wrapper.classes()).toContain('sy-tag');
		expect(wrapper.classes()).toContain('sy-tag-small');
		expect(wrapper.classes()).toContain('sy-tag--hit-true');
		expect(wrapper.text()).toContain('已完成');
		expect(wrapper.attributes('style')).toContain('margin-right: 8px;');
		expect(wrapper.attributes('style')).toContain('color: rgb(51, 102, 153);');
		expect(wrapper.attributes('style')).toContain('background-color: rgb(238, 245, 255);');
		expect(wrapper.attributes('style')).toContain('border-radius: 10px;');
	});

	it('emits click only when clickable', async () => {
		const wrapper = mount(SyTag, {
			slots: {
				default: () => '可点击标签',
			},
		});

		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeUndefined();

		await wrapper.setProps({ clickable: true });
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toHaveLength(1);
	});

	it('emits close without bubbling to outer click handler', async () => {
		const wrapper = mount(SyTag, {
			props: {
				closable: true,
				clickable: true,
			},
			slots: {
				default: () => '可关闭标签',
			},
		});

		await wrapper.get('.sy-tag-close-icon').trigger('click');

		expect(wrapper.emitted('close')).toHaveLength(1);
		expect(wrapper.emitted('click')).toBeUndefined();
	});
});
