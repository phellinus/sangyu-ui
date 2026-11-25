import postcss from 'postcss';
import { describe, expect, expectTypeOf, it } from 'vitest';
import { renderThemeCSS } from '../../../../../scripts/sangyu-theme-css';
import * as publicUI from '../../index';
import { themeToCSS, themeToVariables } from '../css';
import { mergeTheme } from '../merge';
import { darkTheme, lightTheme } from '../presets';
import type { BaseTokenPath, SemanticTokenPath, ThemeOverride } from '../types';

const paths = (value: unknown, prefix = ''): string[] =>
	value && typeof value === 'object' && !('ref' in value)
		? Object.entries(value).flatMap(([key, child]) => paths(child, prefix ? `${prefix}.${key}` : key))
		: [prefix];

describe('theme tokens', () => {
	it('exposes the theme presets and helpers from the public entry', () => {
		expect(publicUI.lightTheme).toBe(lightTheme);
		expect(publicUI.darkTheme).toBe(darkTheme);
		expect(publicUI.mergeTheme).toBe(mergeTheme);
		expect(publicUI.themeToCSS).toBe(themeToCSS);
		expect(publicUI.themeToVariables).toBe(themeToVariables);
	});

	it('keeps the established light color values and names', () => {
		const vars = themeToVariables(lightTheme);
		expect(vars['--sy-color-primary-6']).toBe('#1677ff');
		expect(vars['--sy-color-error']).toBe('var(--sy-color-error-5)');
		expect(vars['--sy-color-text']).toBe('#000000e0');
		expect(vars['--gray-1']).toBe('#a6a6a6');
		expect(vars['--sy-select-bg']).toBe('#fff');
	});

	it('keeps light and dark token structures identical and resolves all references', () => {
		expect(paths(lightTheme).sort()).toEqual(paths(darkTheme).sort());
		for (const theme of [lightTheme, darkTheme]) {
			for (const path of paths(theme.semantic)) {
				const parts = path.split('.');
				const value = parts.reduce<unknown>(
					(current, part) => (current as Record<string, unknown>)[part],
					theme.semantic,
				);
				if (typeof value === 'object' && value !== null && 'ref' in value) {
					const target = String(value.ref)
						.split('.')
						.reduce<unknown>((current, part) => (current as Record<string, unknown>)[part], theme);
					expect(typeof target).toBe('string');
				}
			}
		}
	});

	it('emits common semantic variables with base references and distinct surfaces', () => {
		const light = themeToVariables(lightTheme);
		const dark = themeToVariables(darkTheme);
		expect(light['--sy-color-surface']).toBe('#ffffff');
		expect(dark['--sy-color-surface']).toBe('#1f1f1f');
		for (const [name, value] of Object.entries({
			'--sy-spacing-xs': 'var(--sy-base-spacing-xs)',
			'--sy-control-height-md': 'var(--sy-base-control-height-md)',
			'--sy-font-size-lg': 'var(--sy-base-font-size-lg)',
			'--sy-radius-round': 'var(--sy-base-radius-round)',
			'--sy-shadow-popover': 'var(--sy-base-shadow-popover)',
		})) {
			expect(light[name]).toBe(value);
			expect(dark[name]).toBe(value);
		}
		expect(light['--sy-base-spacing-xs']).toBe('4px');
		expect(light['--sy-base-control-height-md']).toBe('36px');
		expect(light['--sy-base-shadow-focus']).toBe('none');
		expect(dark['--sy-base-shadow-focus']).toBe('none');
		expect(themeToCSS(lightTheme, '.scope')).toContain('--sy-spacing-xs: var(--sy-base-spacing-xs);');
	});

	it('shares the control sizes across input and select with per-component overrides', () => {
		for (const theme of [lightTheme, darkTheme]) {
			const vars = themeToVariables(theme);
			expect(vars).toMatchObject({
				'--sy-base-control-height-sm': '28px',
				'--sy-base-control-height-md': '36px',
				'--sy-base-control-height-lg': '44px',
				'--sy-control-radius': 'var(--sy-base-radius-lg)',
				'--sy-base-radius-lg': '8px',
				'--sy-control-field-width': '240px',
				'--sy-input-radius': 'var(--sy-control-radius)',
				'--sy-input-font-size-large': 'var(--sy-font-size-lg)',
				'--sy-select-font-size-small': 'var(--sy-font-size-sm)',
				'--sy-select-font-size-large': 'var(--sy-font-size-lg)',
				'--sy-input-border-color': 'var(--sy-color-border)',
				'--sy-select-border-color': 'var(--sy-color-border)',
				'--sy-form-control-width': '100%',
				'--sy-carousel-control-size': '32px',
			});
			for (const [size, scale] of [
				['small', 'sm'],
				['medium', 'md'],
				['large', 'lg'],
			]) {
				expect(vars[`--sy-input-height-${size}`]).toBe(`var(--sy-control-height-${scale})`);
				expect(vars[`--sy-select-trigger-height-${size}`]).toBe(`var(--sy-control-height-${scale})`);
			}
		}
		const vars = themeToVariables(
			mergeTheme(lightTheme, {
				semantic: { controlHeight: { md: '42px' }, control: { fieldWidth: '280px', radius: '10px' } },
				components: { select: { triggerHeightMedium: '48px', fontSizeLarge: '20px' } },
			}),
		);
		expect(vars).toMatchObject({
			'--sy-control-height-md': '42px',
			'--sy-control-radius': '10px',
			'--sy-control-field-width': '280px',
			'--sy-input-height-medium': 'var(--sy-control-height-md)',
			'--sy-select-trigger-height-medium': '48px',
			'--sy-select-font-size-large': '20px',
		});
	});

	it('emits choice component tokens with stable names and semantic references', () => {
		const light = themeToVariables(lightTheme);
		const dark = themeToVariables(darkTheme);
		expect(light['--sy-checkbox-size-small']).toBe('14px');
		expect(light['--sy-checkbox-color']).toBe('var(--sy-color-primary)');
		expect(light['--sy-radio-background']).toBe('var(--sy-color-surface)');
		expect(light['--sy-radio-group-gap-x']).toBe('16px');
		expect(light['--sy-radio-button-checked-background']).toBe('var(--sy-color-primary-select)');
		expect(light['--sy-switch-width-large']).toBe('56px');
		expect(light['--sy-switch-focus-shadow']).toBe('var(--sy-shadow-focus)');
		expect(dark['--sy-checkbox-background']).toBe('var(--sy-color-surface)');
		expect(dark['--sy-radio-disabled-background']).toBe('var(--sy-color-bg)');
		expect(dark['--sy-switch-thumb-background']).toBe(
			'linear-gradient(135deg, var(--sy-color-surface) 0%, var(--sy-color-bg) 100%)',
		);
	});

	it('emits navigation component tokens with stable names in both presets', () => {
		const light = themeToVariables(lightTheme);
		const dark = themeToVariables(darkTheme);
		expect(light['--sy-menu-popup-shadow']).toContain('0 12px 32px -8px');
		expect(light['--sy-menu-active-indicator-color']).toBe('var(--sy-color-primary)');
		expect(light['--sy-pagination-height']).toBe('32px');
		expect(light['--sy-pagination-active-color']).toBe('var(--sy-color-primary)');
		expect(light['--sy-breadcrumb-current-color']).toBe('var(--sy-color-text)');
		expect(dark['--sy-breadcrumb-link-hover-color']).toBe('var(--sy-color-text)');
		expect(light['--sy-step-finish-color']).toBe('var(--sy-color-success)');
		expect(dark['--sy-step-error-color']).toBe('var(--sy-color-error)');
		expect(dark['--sy-step-indicator-size']).toBe('36px');
	});

	it('emits display component tokens with stable names and semantic references', () => {
		const light = themeToVariables(lightTheme);
		const dark = themeToVariables(darkTheme);
		expect(light['--sy-card-background']).toBe('var(--sy-color-surface)');
		expect(light['--sy-card-content-color']).toBe('var(--sy-color-text-secondary)');
		expect(light['--sy-tag-primary-color']).toBe('var(--sy-color-primary)');
		expect(dark['--sy-avatar-background']).toBe('var(--sy-color-bg)');
		expect(light['--sy-divider-default-color']).toBe('var(--sy-color-divider)');
		expect(light['--sy-result-error-color']).toBe('var(--sy-color-error)');
		expect(dark['--sy-result-not-found-color']).toBe('var(--sy-color-text-secondary)');
		expect(light['--sy-progress-default-color']).toBe('var(--sy-color-primary)');
		expect(light['--sy-progress-line-height']).toBe('8px');
	});

	it('emits tabs tokens for both presets and component overrides', () => {
		for (const theme of [lightTheme, darkTheme]) {
			const vars = themeToVariables(theme);
			expect(vars['--sy-tabs-active-color']).toBe('var(--sy-color-primary)');
			expect(vars['--sy-tabs-panel-padding']).toBe('var(--sy-spacing-md)');
		}
		expect(
			themeToVariables(mergeTheme(lightTheme, { components: { tabs: { activeColor: '#123456' } } }))[
				'--sy-tabs-active-color'
			],
		).toBe('#123456');
	});

	it('emits overlay and table tokens with stable names in light and dark presets', () => {
		const light = themeToVariables(lightTheme);
		const dark = themeToVariables(darkTheme);
		for (const vars of [light, dark]) {
			expect(vars['--sy-tooltip-background']).toBe('#2c3f51');
			expect(vars['--sy-tooltip-border-background']).toBe('var(--sy-color-surface)');
			expect(vars['--sy-drawer-panel-background']).toBe('var(--sy-color-surface)');
			expect(vars['--sy-drawer-header-border-color']).toBe('var(--sy-color-divider)');
			expect(vars['--sy-notification-success-color']).toBe('var(--sy-color-success)');
			expect(vars['--sy-notification-title-color']).toBe('var(--sy-color-text)');
			expect(vars['--sy-table-header-background']).toBe('var(--sy-color-bg)');
			expect(vars['--sy-table-cell-border-color']).toBe('var(--sy-color-divider)');
			expect(vars['--sy-table-cell-padding-y']).toBe('var(--sy-spacing-md)');
		}
		expect(light['--sy-table-background']).toBe('var(--sy-color-surface)');
		expect(dark['--sy-table-background']).toBe('var(--sy-color-surface)');
	});

	it('inherits untouched common values through partial base and semantic overrides', () => {
		const merged = mergeTheme(lightTheme, {
			base: { spacing: { xs: '6px' } },
			semantic: { radius: { sm: '3px' }, color: { surface: '#fafafa' } },
		});
		const vars = themeToVariables(merged);
		expect(vars['--sy-base-spacing-xs']).toBe('6px');
		expect(vars['--sy-spacing-xs']).toBe('var(--sy-base-spacing-xs)');
		expect(vars['--sy-spacing-sm']).toBe('var(--sy-base-spacing-sm)');
		expect(vars['--sy-radius-sm']).toBe('3px');
		expect(vars['--sy-radius-md']).toBe('var(--sy-base-radius-md)');
		expect(vars['--sy-color-surface']).toBe('#fafafa');
	});

	it('types common overrides and rejects unknown paths and keys', () => {
		expectTypeOf<{ semantic: { spacing: { xs: string }; color: { surface: string } } }>().toExtend<ThemeOverride>();
		expectTypeOf<{
			components: { switch: { width: string }; radio: { dotSize: string } };
		}>().toExtend<ThemeOverride>();
		expectTypeOf<{
			components: {
				menu: { activeBg: string };
				pagination: { height: string };
				breadcrumb: { currentColor: string };
				step: { indicatorSize: string };
			};
		}>().toExtend<ThemeOverride>();
		expectTypeOf<{
			components: {
				tooltip: { background: string; arrowSize: string };
				drawer: { panelBackground: string };
				notification: { successColor: string };
				table: { headerBackground: string; cellPaddingYSmall: string };
			};
		}>().toExtend<ThemeOverride>();
		expectTypeOf<{
			components: {
				card: { background: string };
				tag: { primaryColor: string };
				avatar: { size: string };
				divider: { defaultColor: string };
				result: { errorColor: string };
				progress: { lineHeight: string };
			};
		}>().toExtend<ThemeOverride>();
		expectTypeOf<'base.spacing.xs'>().toExtend<BaseTokenPath>();
		expectTypeOf<'semantic.shadow.overlay'>().toExtend<SemanticTokenPath>();
		// @ts-expect-error layout width is not a common semantic token
		const invalidOverride: ThemeOverride = { semantic: { width: { md: '24px' } } };
		// @ts-expect-error no base token exists at this path
		const invalidReference: BaseTokenPath = 'base.spacing.huge';
		// @ts-expect-error component tokens reject undeclared fields
		const invalidComponentOverride: ThemeOverride = { components: { switch: { trackWidth: '48px' } } };
		// @ts-expect-error component token names stay typed
		const invalidMenuOverride: ThemeOverride = { components: { menu: { selectedBg: '#eee' } } };
		// @ts-expect-error component token names stay typed
		const invalidCardOverride: ThemeOverride = { components: { card: { elevation: '4px' } } };
		// @ts-expect-error overlay and table fields are typed
		const invalidOverlayOverride: ThemeOverride = { components: { drawer: { panelWidth: '500px' } } };
		expect(invalidOverride).toBeDefined();
		expect(invalidReference).toBeDefined();
		expect(invalidComponentOverride).toBeDefined();
		expect(invalidMenuOverride).toBeDefined();
		expect(invalidCardOverride).toBeDefined();
		expect(invalidOverlayOverride).toBeDefined();
	});

	it('carries base overrides through semantic and component references', () => {
		const merged = mergeTheme(lightTheme, { base: { color: { primary: { 6: '#7c3aed' } } } });
		const vars = themeToVariables(merged);
		expect(vars['--sy-color-primary-6']).toBe('#7c3aed');
		expect(vars['--sy-color-primary']).toBe('var(--sy-color-primary-6)');
		expect(vars['--sy-select-focus-border-color']).toBe('var(--sy-color-primary)');
		expect(themeToCSS(merged, '.brand')).toContain('.brand {');
	});

	it('gives explicit semantic and component overrides priority without mutating inputs', () => {
		const override = {
			base: { color: { primary: { 6: '#7c3aed' } } },
			semantic: { color: { primary: '#f00' } },
			components: { select: { focusBorderColor: '#0f0' } },
		};
		const before = structuredClone(lightTheme);
		const overrideBefore = structuredClone(override);
		const vars = themeToVariables(mergeTheme(lightTheme, override));
		expect(vars['--sy-color-primary-6']).toBe('#7c3aed');
		expect(vars['--sy-color-primary']).toBe('#f00');
		expect(vars['--sy-select-focus-border-color']).toBe('#0f0');
		expect(lightTheme).toEqual(before);
		expect(override).toEqual(overrideBefore);
	});

	it('passes a semantic override to components unless the component overrides it', () => {
		const vars = themeToVariables(
			mergeTheme(lightTheme, {
				semantic: { color: { primary: '#f00' } },
			}),
		);
		expect(vars['--sy-color-primary']).toBe('#f00');
		expect(vars['--sy-select-focus-border-color']).toBe('var(--sy-color-primary)');
	});

	it('generates complete light and dark static tokens from the presets', () => {
		const actual = { light: {} as Record<string, string>, dark: {} as Record<string, string> };
		postcss.parse(renderThemeCSS()).walkRules((rule) => {
			const target =
				rule.selector === ':root'
					? actual.light
					: rule.selector === "[data-sy-theme='dark']"
						? actual.dark
						: null;
			if (!target) return;
			rule.walkDecls((decl) => {
				target[decl.prop] = decl.value;
			});
		});
		expect(actual.light).toEqual(themeToVariables(lightTheme));
		expect({ ...actual.light, ...actual.dark }).toEqual(themeToVariables(darkTheme));
		expect(actual.dark['--sy-select-focus-border-color']).toBe('var(--sy-color-primary)');
		expect(actual.dark).not.toHaveProperty('--sy-input-focus-shadow');
		expect(actual.dark).not.toHaveProperty('--sy-control-height-md');
		expect(actual.dark).not.toHaveProperty('--sy-control-field-width');
	});
});
