import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';
import { SyTabs, SyTabPane } from '../index';

const pane = (name: string, disabled = false) => h(SyTabPane, { name, label: name, disabled }, () => `Panel ${name}`);

describe('SyTabs', () => {
	it('selects the first enabled pane and exposes tab relationships', () => {
		const wrapper = mount(SyTabs, { slots: { default: () => [pane('a', true), pane('b')] } });
		const tabs = wrapper.findAll('[role="tab"]');
		expect(tabs.map((tab) => tab.attributes('aria-selected'))).toEqual(['false', 'true']);
		expect(tabs[1].attributes('aria-controls')).toBe(
			wrapper.find('[role="tabpanel"]:not([hidden])').attributes('id'),
		);
		expect(tabs[0].attributes('disabled')).toBeDefined();
	});

	it('supports automatic and manual keyboard activation', async () => {
		const wrapper = mount(SyTabs, { slots: { default: () => [pane('a'), pane('b'), pane('c', true)] } });
		await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowRight' });
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
		const manual = mount(SyTabs, {
			props: { activation: 'manual' },
			slots: { default: () => [pane('a'), pane('b')] },
		});
		await manual.findAll('[role="tab"]')[0].trigger('keydown', { key: 'End' });
		expect(manual.findAll('[role="tab"]')[0].attributes('aria-selected')).toBe('true');
		await manual.findAll('[role="tab"]')[1].trigger('keydown', { key: 'Enter' });
		expect(manual.findAll('[role="tab"]')[1].attributes('aria-selected')).toBe('true');
	});

	it('keeps controlled selection and lazily mounts visited panels', async () => {
		const value = ref('a');
		const Host = defineComponent({
			setup: () => () =>
				h(
					SyTabs,
					{
						modelValue: value.value,
						lazy: true,
						'onUpdate:modelValue': (name: string | number) => {
							value.value = String(name);
						},
					},
					() => [pane('a'), pane('b')],
				),
		});
		const wrapper = mount(Host);
		expect(wrapper.findAll('[role="tabpanel"]')).toHaveLength(1);
		await wrapper.findAll('[role="tab"]')[1].trigger('click');
		await nextTick();
		expect(wrapper.findAll('[role="tabpanel"]')).toHaveLength(2);
		expect(wrapper.findAll('[role="tabpanel"]:not([hidden])')).toHaveLength(1);
	});
	it('skips disabled tabs with keyboard navigation', async () => {
		const wrapper = mount(SyTabs, { slots: { default: () => [pane('a'), pane('b', true), pane('c')] } });
		await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowRight' });
		expect(wrapper.findAll('[role="tab"]')[2].attributes('aria-selected')).toBe('true');
		await wrapper.findAll('[role="tab"]')[2].trigger('keydown', { key: 'Home' });
		expect(wrapper.findAll('[role="tab"]')[0].attributes('aria-selected')).toBe('true');
	});

	it('selects the nearest enabled pane when current pane is removed', async () => {
		const names = ref(['a', 'b', 'c']);
		const Host = defineComponent({
			setup: () => () => h(SyTabs, { defaultValue: 'b' }, () => names.value.map((name) => pane(name))),
		});
		const wrapper = mount(Host);
		expect(wrapper.findAll('[role="tab"]')[1].attributes('aria-selected')).toBe('true');
		names.value = ['a', 'c'];
		await nextTick();
		await nextTick();
		expect(wrapper.findAll('[role="tab"]')[1].text()).toBe('c');
		expect(wrapper.findAll('[role="tab"]')[1].attributes('aria-selected')).toBe('true');
	});

	it('emits a replacement when a controlled current pane is removed', async () => {
		const names = ref(['a', 'b', 'c']);
		const updates: Array<string | number> = [];
		const Host = defineComponent({
			setup: () => () =>
				h(
					SyTabs,
					{ modelValue: 'b', 'onUpdate:modelValue': (name: string | number) => updates.push(name) },
					() => names.value.map((name) => pane(name)),
				),
		});
		mount(Host);
		names.value = ['a', 'c'];
		await nextTick();
		await nextTick();
		expect(updates).toEqual(['c']);
	});

	it('renders tab relationships on the server', async () => {
		const html = await renderToString(h(SyTabs, null, () => [pane('a'), pane('b')]));
		expect(html).toContain('role="tablist"');
		expect(html).toContain('role="tabpanel"');
		expect(html).toContain('aria-selected="true"');
	});
});
