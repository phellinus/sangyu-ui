import type { Plugin } from 'vite';
import { themeToVariables, variablesToCSS } from '../packages/sangyu-ui/src/theme/css';
import { darkTheme, lightTheme } from '../packages/sangyu-ui/src/theme/presets';

export function renderThemeCSS(): string {
	const light = themeToVariables(lightTheme);
	const dark = themeToVariables(darkTheme);
	const darkEntries = Object.entries(dark);
	const changed = new Set(
		darkEntries
			.filter(
				([name, value]) =>
					name.startsWith('--sy-color-') || name.startsWith('--gray-') || light[name] !== value,
			)
			.map(([name]) => name),
	);

	// CSS custom property references are evaluated in the scope declaring them.
	// Redeclare aliases that depend on dark values, while inheriting shared dimensions.
	let previousSize = 0;
	while (previousSize !== changed.size) {
		previousSize = changed.size;
		for (const [name, value] of darkEntries) {
			const references = value.matchAll(/var\((--[\w-]+)/g);
			if (Array.from(references).some(([, dependency]) => changed.has(dependency))) changed.add(name);
		}
	}

	const darkOverrides = Object.fromEntries(darkEntries.filter(([name]) => changed.has(name)));
	return `${variablesToCSS(light, ':root')}\n\n${variablesToCSS(darkOverrides, "[data-sy-theme='dark']")}\n`;
}

export function sangyuThemeCSS(): Plugin {
	const id = 'virtual:sangyu-theme.css';
	const resolvedId = `\0${id}`;
	return {
		name: 'sangyu-theme-css',
		resolveId(source) {
			if (source === id) return resolvedId;
		},
		load(source) {
			if (source === resolvedId) return renderThemeCSS();
		},
	};
}
