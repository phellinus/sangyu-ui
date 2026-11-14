import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import SyCollapse from '../SyCollapse.vue';
import SyCollapseItem from '../components/CollapseItem.vue';
import { lightTheme, darkTheme } from '../../theme/presets';
import { themeToVariables } from '../../theme/css';

const item = (name: string, options: Record<string, unknown> = {}) =>
	h(SyCollapseItem, { name, ...options }, { default: () => name, header: () => `Title ${name}` });

describe('SyCollapse', () => {
	it('opens multiple items and emits arrays', async () => {
		const wrapper = mount(SyCollapse, { slots: { default: () => [item('a'), item('b')] } });
		const buttons = wrapper.findAll('button');
		expect(wrapper.find('.sy-collapse-item__icon svg').attributes('viewBox')).toBe('0 0 16 16');
		expect(wrapper.find('.sy-collapse-item__icon svg path').attributes('stroke')).toBe('currentColor');
		await buttons[0].trigger('click');
		await buttons[1].trigger('click');
		expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['a', 'b']);
		expect(wrapper.findAll('.sy-collapse-item')[0].classes()).toContain('is-expanded');
	});

	it('supports accordion and disabled items', async () => {
		const wrapper = mount(SyCollapse, {
			props: { accordion: true, defaultValue: 'a' },
			slots: { default: () => [item('a'), item('b', { disabled: true })] },
		});
		expect(wrapper.findAll('.sy-collapse-item')[0].classes()).toContain('is-expanded');
		await wrapper.findAll('button')[1].trigger('click');
		expect(wrapper.emitted('change')).toBeUndefined();
		await wrapper.findAll('button')[0].trigger('click');
		expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBeUndefined();
	});

	it('keeps controlled values external and lazy content after first opening', async () => {
		const wrapper = mount(SyCollapse, {
			props: { modelValue: [] },
			slots: { default: () => item('a', { lazy: true }) },
		});
		expect(wrapper.find('.sy-collapse-item__content').text()).toBe('');
		await wrapper.find('button').trigger('click');
		expect(wrapper.find('.sy-collapse-item').classes()).not.toContain('is-expanded');
		await wrapper.setProps({ modelValue: ['a'] });
		expect(wrapper.find('.sy-collapse-item__content').text()).toBe('a');
		await wrapper.setProps({ modelValue: [] });
		expect(wrapper.find('.sy-collapse-item__content').text()).toBe('a');
	});

	it('prunes removed names', async () => {
		const shown = ref(true);
		const Host = defineComponent({
			setup: () => () =>
				h(SyCollapse, { defaultValue: ['a'] }, { default: () => (shown.value ? item('a') : null) }),
		});
		const wrapper = mount(Host);
		shown.value = false;
		await nextTick();
		await nextTick();
		expect(wrapper.findComponent(SyCollapse).emitted('update:modelValue')?.at(-1)?.[0]).toEqual([]);
	});

	it('provides matching light and dark tokens', () => {
		for (const theme of [lightTheme, darkTheme]) {
			const vars = themeToVariables(theme);
			expect(vars['--sy-collapse-background']).toBe('var(--sy-color-surface)');
			expect(vars['--sy-collapse-border-color']).toBe('var(--sy-color-divider)');
		}
	});

	it('renders headers and content on the server', async () => {
		const html = await renderToString(h(SyCollapse, { defaultValue: ['a'] }, { default: () => item('a') }));
		expect(html).toContain('<button');
		expect(html).toContain('Title a');
		expect(html).not.toMatch(/\saria-[\w-]+=/);
		expect(html).not.toMatch(/\srole="region"/);
	});

	it('keeps extra actions outside the toggle and passes expanded to the icon slot', async () => {
		const wrapper = mount(SyCollapse, {
			slots: {
				default: () =>
					h(
						SyCollapseItem,
						{ name: 'a' },
						{
							header: () => 'A',
							extra: () => h('button', { class: 'extra-action' }, 'Extra'),
							'expand-icon': ({ expanded }: { expanded: boolean }) =>
								h('span', { class: 'custom-icon' }, expanded ? 'open' : 'closed'),
						},
					),
			},
		});
		expect(wrapper.find('.custom-icon').text()).toBe('closed');
		await wrapper.find('.extra-action').trigger('click');
		expect(wrapper.find('.sy-collapse-item').classes()).not.toContain('is-expanded');
		expect(wrapper.emitted('change')).toBeUndefined();
		await wrapper.find('.sy-collapse-item__trigger').trigger('click');
		expect(wrapper.find('.custom-icon').text()).toBe('open');
	});
});
