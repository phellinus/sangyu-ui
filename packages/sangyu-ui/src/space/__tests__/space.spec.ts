import { mount } from '@vue/test-utils';
import { createSSRApp, createVNode, Fragment, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';
import { mergeTheme } from '../../theme/merge';
import { darkTheme, lightTheme } from '../../theme/presets';
import { themeToVariables } from '../../theme/css';
import SySpace from '..';

describe('SySpace', () => {
	it('uses one inline flex container and preserves direct children', () => {
		const wrapper = mount(SySpace, { slots: { default: () => [h('b', 'one'), h('i', 'two')] } });
		expect(wrapper.element.tagName).toBe('SPAN');
		expect(wrapper.classes()).toContain('sy-space');
		expect(wrapper.element.children).toHaveLength(2);
		expect(wrapper.element.children[0].tagName).toBe('B');
		expect(wrapper.attributes('style')).toContain('column-gap: var(--sy-space-gap-medium)');
		expect(wrapper.attributes('style')).toContain('align-items: center');
		expect(wrapper.attributes('style')).toContain('flex-wrap: nowrap');
	});

	it('maps scalar and pair sizes to native gaps', async () => {
		const wrapper = mount(SySpace, { props: { size: 12, direction: 'vertical' } });
		expect(wrapper.attributes('style')).toContain('column-gap: 12px');
		expect(wrapper.attributes('style')).toContain('row-gap: 12px');
		expect(wrapper.attributes('style')).toContain('flex-direction: column');
		expect(wrapper.attributes('style')).toContain('align-items: stretch');
		await wrapper.setProps({ size: ['small', 20], align: 'baseline', wrap: true });
		expect(wrapper.attributes('style')).toContain('column-gap: var(--sy-space-gap-small)');
		expect(wrapper.attributes('style')).toContain('row-gap: 20px');
		expect(wrapper.attributes('style')).toContain('align-items: baseline');
		expect(wrapper.attributes('style')).toContain('flex-wrap: wrap');
	});

	it('inserts split only between meaningful children and prefers the split slot', () => {
		const wrapper = mount(SySpace, {
			props: { split: 'ignored' },
			slots: {
				default: () => [
					createVNode(Fragment, null, [h('b', 'one'), createVNode(Fragment), '   ']),
					createVNode(Fragment, null, [h('i', 'two')]),
				],
				split: () => h('em', '|'),
			},
		});
		expect(wrapper.element.children).toHaveLength(3);
		expect(wrapper.findAll('em')).toHaveLength(1);
		expect(wrapper.text()).toBe('one|two');
	});

	it('accepts numeric zero as a split and renders no split for one item', async () => {
		const wrapper = mount(SySpace, { props: { split: 0 }, slots: { default: () => [h('b', 'a'), h('b', 'b')] } });
		expect(wrapper.text()).toBe('a0b');
		await wrapper.setProps({ split: '-' });
		expect(wrapper.text()).toBe('a-b');
		const single = mount(SySpace, { props: { split: '-' }, slots: { default: () => h('b', 'a') } });
		expect(single.text()).toBe('a');
	});

	it('exposes matching light and dark tokens and supports overrides', () => {
		for (const theme of [lightTheme, darkTheme]) {
			const vars = themeToVariables(theme);
			expect(vars['--sy-space-gap-small']).toBe('var(--sy-spacing-sm)');
			expect(vars['--sy-space-gap-medium']).toBe('var(--sy-spacing-md)');
			expect(vars['--sy-space-gap-large']).toBe('var(--sy-spacing-lg)');
		}
		const override = mergeTheme(lightTheme, { components: { space: { gapMedium: '18px' } } });
		expect(themeToVariables(override)['--sy-space-gap-medium']).toBe('18px');
		expect(themeToVariables(lightTheme)['--sy-space-gap-medium']).toBe('var(--sy-spacing-md)');
	});

	it('renders on the server without DOM globals', async () => {
		const html = await renderToString(
			createSSRApp({ render: () => h(SySpace, { size: 8, split: '/' }, () => [h('b', 'a'), h('b', 'b')]) }),
		);
		expect(html).toContain('column-gap:8px');
		expect(html).toContain('<b>a</b>/');
		expect(html).toContain('<b>b</b>');
	});
});
