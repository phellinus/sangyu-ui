/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import less from 'less';
import postcss from 'postcss';
import { describe, expect, expectTypeOf, it } from 'vitest';
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
		expect(light['--sy-base-control-height-md']).toBe('32px');
		expect(dark['--sy-base-shadow-focus']).toBe('0 0 0 2px #1677ff66');
		expect(themeToCSS(lightTheme, '.scope')).toContain('--sy-spacing-xs: var(--sy-base-spacing-xs);');
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
		expectTypeOf<'base.spacing.xs'>().toExtend<BaseTokenPath>();
		expectTypeOf<'semantic.shadow.overlay'>().toExtend<SemanticTokenPath>();
		// @ts-expect-error layout width is not a common semantic token
		const invalidOverride: ThemeOverride = { semantic: { width: { md: '24px' } } };
		// @ts-expect-error no base token exists at this path
		const invalidReference: BaseTokenPath = 'base.spacing.huge';
		// @ts-expect-error component tokens reject undeclared fields
		const invalidComponentOverride: ThemeOverride = { components: { switch: { trackWidth: '48px' } } };
		expect(invalidOverride).toBeDefined();
		expect(invalidReference).toBeDefined();
		expect(invalidComponentOverride).toBeDefined();
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

	it('matches every static light and dark Less declaration', async () => {
		const filename = resolve(process.cwd(), 'packages/sangyu-ui/src/style/index.less');
		const compiled = await less.render(readFileSync(filename, 'utf8'), { filename });
		const actual = { light: {} as Record<string, string>, dark: {} as Record<string, string> };
		postcss.parse(compiled.css).walkRules((rule) => {
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
		for (const [mode, theme] of [
			['light', lightTheme],
			['dark', darkTheme],
		] as const) {
			const variables = themeToVariables(theme);
			for (const [name, value] of Object.entries(actual[mode])) {
				expect(variables[name]).toBe(value);
			}
		}
	});
});
