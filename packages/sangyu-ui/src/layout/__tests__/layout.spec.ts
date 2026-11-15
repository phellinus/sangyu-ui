import { readFileSync } from 'node:fs';
import { mount } from '@vue/test-utils';
import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '../../theme/ThemeProvider';
import { themeToVariables } from '../../theme/css';
import { mergeTheme } from '../../theme/merge';
import { darkTheme, lightTheme } from '../../theme/presets';
import SyLayout, { SyLayoutContent, SyLayoutFooter, SyLayoutHeader, SyLayoutSider } from '..';

describe('SyLayout', () => {
	it('renders semantic page regions in a vertical layout', () => {
		const wrapper = mount(SyLayout, {
			slots: {
				default: () => [
					h(SyLayoutHeader, null, () => '页头'),
					h(SyLayoutContent, null, () => '正文'),
					h(SyLayoutFooter, null, () => '页脚'),
				],
			},
		});
		expect(wrapper.element.tagName).toBe('DIV');
		expect([...wrapper.element.children].map((element) => element.tagName)).toEqual(['HEADER', 'MAIN', 'FOOTER']);
		expect(wrapper.find('.sy-layout-sider').exists()).toBe(false);
	});

	it('keeps left and right sider order and limits direction detection to direct children', () => {
		const left = mount(SyLayout, {
			slots: { default: () => [h(SyLayoutSider, null, () => '左'), h(SyLayoutContent, null, () => '内容')] },
		});
		const right = mount(SyLayout, {
			slots: { default: () => [h(SyLayoutContent, null, () => '内容'), h(SyLayoutSider, null, () => '右')] },
		});
		expect([...left.element.children].map((element) => element.tagName)).toEqual(['ASIDE', 'MAIN']);
		expect([...right.element.children].map((element) => element.tagName)).toEqual(['MAIN', 'ASIDE']);
		const nested = mount(SyLayout, {
			slots: {
				default: () =>
					h(SyLayoutContent, null, () =>
						h(SyLayout, null, () => [
							h(SyLayoutSider, null, () => '内侧'),
							h(SyLayoutContent, { as: 'section' }, () => '内文'),
						]),
					),
			},
		});
		expect(nested.element.children).toHaveLength(1);
		expect(nested.element.children[0].tagName).toBe('MAIN');
		expect(nested.get('section.sy-layout-content').text()).toBe('内文');
		expect(nested.get('main .sy-layout > .sy-layout-sider').text()).toBe('内侧');
	});

	it('accepts width, custom class and style without losing component styles', async () => {
		const wrapper = mount(SyLayoutSider, {
			props: { width: 240 },
			attrs: { class: 'custom-sider', style: { borderWidth: '2px' } },
		});
		expect(wrapper.classes()).toEqual(expect.arrayContaining(['sy-layout-sider', 'custom-sider']));
		expect(wrapper.attributes('style')).toContain('--sy-layout-sider-custom-width: 240px');
		expect(wrapper.attributes('style')).toContain('border-width: 2px');
		await wrapper.setProps({ width: '30%' });
		expect(wrapper.attributes('style')).toContain('--sy-layout-sider-custom-width: 30%');
		const content = mount(SyLayoutContent, { props: { as: 'section' }, attrs: { class: 'custom-content' } });
		expect(content.element.tagName).toBe('SECTION');
		expect(content.classes()).toContain('custom-content');
		const layout = mount(SyLayout, { attrs: { class: 'custom-layout', style: { minHeight: '120px' } } });
		expect(layout.classes()).toEqual(expect.arrayContaining(['sy-layout', 'custom-layout']));
		expect(layout.attributes('style')).toContain('min-height: 120px');
	});

	it('exposes theme tokens for both modes and follows reactive Provider changes', async () => {
		for (const theme of [lightTheme, darkTheme]) {
			const variables = themeToVariables(theme);
			expect(variables['--sy-layout-sider-width']).toBe('200px');
			expect(variables['--sy-layout-header-background']).toBe('var(--sy-color-surface)');
			expect(variables['--sy-layout-content-background']).toBe('var(--sy-color-bg)');
		}
		const changed = mergeTheme(lightTheme, { components: { layout: { siderWidth: '260px' } } });
		expect(themeToVariables(changed)['--sy-layout-sider-width']).toBe('260px');
		const mode = ref<'light' | 'dark'>('light');
		const Host = defineComponent(
			() => () => h(ThemeProvider, { mode: mode.value }, () => h(SyLayout, null, () => h(SyLayoutSider))),
		);
		const wrapper = mount(Host);
		expect(wrapper.get('[data-sy-theme]').attributes('data-sy-theme')).toBe('light');
		mode.value = 'dark';
		await nextTick();
		const scope = wrapper.get('[data-sy-theme]');
		expect(scope.attributes('data-sy-theme')).toBe('dark');
		expect((scope.element as HTMLElement).style.getPropertyValue('--sy-color-surface')).toBe('#1f1f1f');
	});

	it('uses direct-sider and responsive CSS rules', () => {
		const css = readFileSync('packages/sangyu-ui/src/layout/style/index.less', 'utf8');
		expect(css).toContain('.sy-layout:has(> .sy-layout-sider)');
		expect(css).toContain('@media (max-width: 768px)');
		expect(css).toContain('.sy-layout > .sy-layout-sider');
		expect(css).toContain('width: 100%');
		const variables = readFileSync('packages/sangyu-ui/src/style/theme/var.less', 'utf8');
		expect(variables).toMatch(/:root\s*\{[^}]*--sy-color-surface: #ffffff/s);
		expect(variables).toMatch(/\[data-sy-theme='dark'\]\s*\{[^}]*--sy-color-surface: #1f1f1f/s);
	});

	it('registers the full family and renders without DOM globals on the server', async () => {
		const app = createSSRApp({ render: () => h(SyLayout, null, () => h(SyLayoutContent, null, () => 'SSR')) });
		app.use(SyLayout);
		for (const name of ['SyLayout', 'SyLayoutHeader', 'SyLayoutSider', 'SyLayoutContent', 'SyLayoutFooter']) {
			expect(app.component(name)).toBeTruthy();
		}
		const html = await renderToString(app);
		expect(html).toContain('<main class="sy-layout-content">SSR</main>');
	});
});
