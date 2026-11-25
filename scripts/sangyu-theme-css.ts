import type { Plugin } from 'vite';
import { themeToVariables, variableReferences, variablesToCSS } from '../packages/sangyu-ui/src/theme/css';
import { darkTheme, lightTheme } from '../packages/sangyu-ui/src/theme/presets';

export function renderThemeCSS(): string {
	const light = themeToVariables(lightTheme);
	const dark = themeToVariables(darkTheme);
	const names = new Set([...Object.keys(light), ...Object.keys(dark)]);

	for (const [mode, variables] of Object.entries({ light, dark })) {
		const validated = new Set<string>();
		const visiting = new Set<string>();
		const validate = (name: string) => {
			if (validated.has(name)) return;
			if (visiting.has(name)) throw new Error(`Circular ${mode} theme token reference: ${name}`);
			if (!Object.hasOwn(variables, name)) throw new Error(`Missing ${mode} theme token: ${name}`);
			visiting.add(name);
			for (const reference of variableReferences(variables[name])) validate(reference);
			visiting.delete(name);
			validated.add(name);
		};
		for (const name of names) validate(name);
	}

	// Same-mode providers inherit the already active preset and its local overrides.
	const scope = (mode: string) => `[data-sy-theme='${mode}']:where(:not([data-sy-theme-inherit]))`;
	return `${variablesToCSS(light, `:root, ${scope('light')}`)}\n\n${variablesToCSS(dark, scope('dark'))}\n`;
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
