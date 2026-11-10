import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, expectTypeOf, it } from 'vitest';
import { ThemeProvider, useTheme } from '../../index';
import type { ThemeMode, ThemeOverride } from '../../index';

const Probe = defineComponent({
	setup() {
		const theme = useTheme();
		return () => h('span', { class: 'probe' }, `${theme.mode.value}:${theme.tokens.value.semantic.color.text}`);
	},
});

describe('ThemeProvider', () => {
	it('mounts variables on its own scope and updates mode and refs', async () => {
		const mode = ref<ThemeMode>('light');
		const primary = ref('#7342ee');
		const Host = defineComponent(
			() => () =>
				h(
					ThemeProvider,
					{ mode: mode.value, tokens: { base: { color: { primary: { 6: primary.value } } } } },
					() => h(Probe),
				),
		);
		const wrapper = mount(Host, { attachTo: document.body });
		const scope = wrapper.find('[data-sy-theme]');
		expect((scope.element as HTMLElement).style.getPropertyValue('--sy-color-primary-6')).toBe('#7342ee');
		expect((scope.element as HTMLElement).style.getPropertyValue('--sy-color-primary')).toBe(
			'var(--sy-color-primary-6)',
		);
		expect((scope.element as HTMLElement).style.getPropertyValue('--sy-select-focus-border-color')).toBe(
			'var(--sy-color-primary)',
		);
		expect(scope.find('.probe').text()).toContain('light:');
		mode.value = 'dark';
		primary.value = '#aabbcc';
		await nextTick();
		expect(scope.attributes('data-sy-theme')).toBe('dark');
		expect((scope.element as HTMLElement).style.getPropertyValue('--sy-color-primary-6')).toBe('#aabbcc');
		expect((scope.element as HTMLElement).style.getPropertyValue('--sy-color-bg')).toBe('#141414');
		expect(scope.find('.probe').text()).toContain('dark:');
		wrapper.unmount();
		expect(scope.element.isConnected).toBe(false);
	});

	it('inherits parent overrides, isolates child overrides, and restores parent scope on unmount', async () => {
		const childVisible = ref(true);
		const parentColor = ref('#111111');
		const Host = defineComponent(
			() => () =>
				h(ThemeProvider, { tokens: { semantic: { color: { primary: parentColor.value } } } }, () => [
					h(Probe),
					childVisible.value
						? h(
								ThemeProvider,
								{ tokens: { components: { select: { focusBorderColor: '#222222' } } } },
								() => h(Probe),
							)
						: null,
				]),
		);
		const wrapper = mount(Host);
		const parent = wrapper.find('[data-sy-theme]');
		const child = wrapper.findAll('[data-sy-theme]')[1];
		expect((parent.element as HTMLElement).style.getPropertyValue('--sy-color-primary')).toBe('#111111');
		expect((child.element as HTMLElement).style.getPropertyValue('--sy-color-primary')).toBe('#111111');
		expect((child.element as HTMLElement).style.getPropertyValue('--sy-select-focus-border-color')).toBe('#222222');
		parentColor.value = '#333333';
		await nextTick();
		expect((child.element as HTMLElement).style.getPropertyValue('--sy-color-primary')).toBe('#333333');
		childVisible.value = false;
		await nextTick();
		expect(wrapper.findAll('[data-sy-theme]')).toHaveLength(1);
		expect((parent.element as HTMLElement).style.getPropertyValue('--sy-color-primary')).toBe('#333333');
		wrapper.unmount();
	});

	it('resets to the selected preset when a nested provider changes mode', () => {
		const wrapper = mount(ThemeProvider, {
			props: { mode: 'dark', tokens: { semantic: { color: { text: '#abcd12' } } } },
			slots: { default: () => h(ThemeProvider, { mode: 'light' }, () => h(Probe)) },
		});
		const [parent, child] = wrapper.findAll('[data-sy-theme]');
		expect((parent.element as HTMLElement).style.getPropertyValue('--sy-color-text')).toBe('#abcd12');
		expect((child.element as HTMLElement).style.getPropertyValue('--sy-color-text')).toBe('#000000e0');
		wrapper.unmount();
	});

	it('updates common semantic variables when a parent override changes', async () => {
		const spacing = ref('6px');
		const Host = defineComponent(
			() => () =>
				h(ThemeProvider, { tokens: { base: { spacing: { xs: spacing.value } } } }, () =>
					h(ThemeProvider, null, () => h(Probe)),
				),
		);
		const wrapper = mount(Host);
		const [parent, child] = wrapper.findAll('[data-sy-theme]');
		for (const scope of [parent, child]) {
			expect((scope.element as HTMLElement).style.getPropertyValue('--sy-base-spacing-xs')).toBe('6px');
			expect((scope.element as HTMLElement).style.getPropertyValue('--sy-spacing-xs')).toBe(
				'var(--sy-base-spacing-xs)',
			);
		}
		spacing.value = '10px';
		await nextTick();
		expect((child.element as HTMLElement).style.getPropertyValue('--sy-base-spacing-xs')).toBe('10px');
		wrapper.unmount();
	});

	it('renders on the server without DOM access', async () => {
		const html = await renderToString(h(ThemeProvider, { mode: 'dark', as: 'section' }, () => h(Probe)));
		expect(html).toContain('<section');
		expect(html).toContain('data-sy-theme="dark"');
		expect(html).toContain('--sy-color-bg:#141414');
		expect(html).toContain('--sy-spacing-xs:var(--sy-base-spacing-xs)');
	});

	it('accepts typed modes and nested token overrides', () => {
		expectTypeOf<ThemeMode>().toEqualTypeOf<'light' | 'dark'>();
		expectTypeOf<{ semantic: { color: { primary: string } } }>().toExtend<ThemeOverride>();
		// @ts-expect-error unsupported mode must not enter the public API
		const invalidMode: ThemeMode = 'system';
		expect(invalidMode).toBe('system');
	});
});
