/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import less from 'less';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import { themeToCSS, themeToVariables } from '../css';
import { mergeTheme } from '../merge';
import { darkTheme, lightTheme } from '../presets';

describe('theme tokens', () => {
	it('keeps the established light color values and names', () => {
		const vars = themeToVariables(lightTheme);
		expect(vars['--sy-color-primary-6']).toBe('#1677ff');
		expect(vars['--sy-color-error']).toBe('var(--sy-color-error-5)');
		expect(vars['--sy-color-text']).toBe('#000000e0');
		expect(vars['--gray-1']).toBe('#a6a6a6');
		expect(vars['--sy-select-bg']).toBe('#fff');
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
		expect(actual.light).toEqual(themeToVariables(lightTheme));
		expect(actual.dark).toEqual(themeToVariables(darkTheme));
	});
});
