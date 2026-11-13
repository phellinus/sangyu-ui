import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import SyCollapse from '../SyCollapse.vue';
import SyCollapseItem from '../SyCollapseItem.vue';
import { lightTheme, darkTheme } from '../../theme/presets';
import { themeToVariables } from '../../theme/css';

const item = (name: string, options: Record<string, unknown> = {}) =>
	h(SyCollapseItem, { name, ...options }, { default: () => name, header: () => `Title ${name}` });

describe('SyCollapse', () => {
	it('opens multiple items and emits arrays', async () => {
		const wrapper = mount(SyCollapse, { slots: { default: () => [item('a'), item('b')] } });
		const buttons = wrapper.findAll('button');
		await buttons[0].trigger('click');
		await buttons[1].trigger('click');
		expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['a', 'b']);
		expect(buttons[0].attributes('aria-expanded')).toBe('true');
		expect(buttons[0].attributes('aria-controls')).toBe(wrapper.findAll('[role="region"]')[0].attributes('id'));
		expect(wrapper.findAll('[role="region"]')[0].attributes('aria-labelledby')).toBe(buttons[0].attributes('id'));
	});

	it('supports accordion and disabled items', async () => {
		const wrapper = mount(SyCollapse, {
			props: { accordion: true, defaultValue: 'a' },
			slots: { default: () => [item('a'), item('b', { disabled: true })] },
		});
		expect(wrapper.findAll('button')[0].attributes('aria-expanded')).toBe('true');
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
		expect(wrapper.find('[role="region"]').text()).toBe('');
		await wrapper.find('button').trigger('click');
		expect(wrapper.find('button').attributes('aria-expanded')).toBe('false');
		await wrapper.setProps({ modelValue: ['a'] });
		expect(wrapper.find('[role="region"]').text()).toBe('a');
		await wrapper.setProps({ modelValue: [] });
		expect(wrapper.find('[role="region"]').text()).toBe('a');
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
});
