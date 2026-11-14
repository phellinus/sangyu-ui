import { defineComponent, h, nextTick, ref } from 'vue';
import { readFileSync } from 'node:fs';
import less from 'less';
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

	it('encodes whitespace names in stable ARIA IDs', () => {
		const wrapper = mount(SyTabs, { slots: { default: () => [pane('first tab'), pane('second tab')] } });
		const tab = wrapper.find('[role="tab"]');
		const panel = wrapper.find('[role="tabpanel"]');
		expect(tab.attributes('id')).not.toMatch(/\s/);
		expect(panel.attributes('id')).not.toMatch(/\s/);
		expect(tab.attributes('aria-controls')).toBe(panel.attributes('id'));
		expect(panel.attributes('aria-labelledby')).toBe(tab.attributes('id'));
	});

	it('moves one line indicator to the active tab', async () => {
		const wrapper = mount(SyTabs, { slots: { default: () => [pane('a'), pane('b')] } });
		const item = wrapper.findAll('.sy-tabs__tab-item')[1].element;
		Object.defineProperty(item, 'offsetLeft', { value: 96 });
		Object.defineProperty(item, 'offsetWidth', { value: 72 });
		await wrapper.findAll('[role="tab"]')[1].trigger('click');
		await nextTick();
		const indicator = wrapper.find('.sy-tabs__indicator');
		expect(indicator.attributes('style')).toContain('translateX(132px) translateX(-50%)');
		expect(indicator.attributes('style')).not.toContain('width:');
	});

	it.each([
		['center', 'safe center'],
		['right', 'safe flex-end'],
		['fixed', 'space-between'],
	] as const)('fills available horizontal space with %s alignment and extra content', async (alignment, justify) => {
		const css = await less.render(readFileSync('packages/sangyu-ui/src/tabs/style/index.less', 'utf8'));
		const style = document.createElement('style');
		style.textContent = css.css;
		document.head.append(style);
		const wrapper = mount(SyTabs, {
			props: { alignment },
			slots: { default: () => [pane('a'), pane('b')], extra: () => h('span', 'Extra') },
		});
		const list = wrapper.find('[role="tablist"]').element;
		expect(getComputedStyle(list).flexGrow).toBe('1');
		expect(getComputedStyle(list).justifyContent).toBe(justify);
		expect(wrapper.find('.sy-tabs__extra').text()).toBe('Extra');
		wrapper.unmount();
		style.remove();
	});

	it('keeps card close and add controls separate from tab buttons', () => {
		const wrapper = mount(SyTabs, {
			props: { type: 'card', editable: true, showAddButton: true },
			slots: { default: () => [pane('a')] },
		});
		const item = wrapper.find('.sy-tabs__tab-item');
		expect(item.find('[role="tab"]').exists()).toBe(true);
		expect(item.find('.sy-tabs__close').exists()).toBe(true);
		expect(item.find('[role="tab"] .sy-tabs__close').exists()).toBe(false);

		const close = item.find('.sy-tabs__close');
		const add = wrapper.find('.sy-tabs__add');
		expect(close.attributes('aria-label')).toBeUndefined();
		expect(close.text()).toContain('关闭 a');
		expect(close.find('svg[aria-hidden="true"]').exists()).toBe(true);
		expect(add.text()).toContain('添加标签');
		expect(add.find('svg[aria-hidden="true"]').exists()).toBe(true);
	});

	it('closes a card tab without selecting or clicking it', async () => {
		const wrapper = mount(SyTabs, {
			props: { type: 'card', removable: true },
			slots: { default: () => [pane('a'), pane('b')] },
		});
		const item = wrapper.findAll('.sy-tabs__tab-item')[1];
		expect(item.classes()).not.toContain('sy-tabs__tab-item--active');
		await item.find('.sy-tabs__close').trigger('click');
		expect(wrapper.emitted('remove')?.[0]?.[0]).toBe('b');
		expect(wrapper.emitted('delete')?.[0]?.[0]).toBe('b');
		expect(wrapper.emitted('tabClick')).toBeUndefined();
		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect(item.find('[role="tab"]').attributes('aria-selected')).toBe('false');
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
