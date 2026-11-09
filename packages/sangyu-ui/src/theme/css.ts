import type { SemanticColors, ThemeTokens, TokenReference } from './types';

const kebab = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const nameForPath = (path: string): string => {
	const parts = path.split('.');
	if (parts[0] === 'base' && parts[1] === 'color' && parts.length === 4) {
		return parts[2] === 'gray' ? `--gray-${parts[3]}` : `--sy-color-${parts[2]}-${parts[3]}`;
	}
	if (parts[0] === 'semantic' && parts[1] === 'color' && parts.length === 3) {
		return `--sy-color-${kebab(parts[2])}`;
	}
	throw new Error(`Unknown token reference: ${path}`);
};

const cssValue = (value: string | TokenReference<string>): string =>
	typeof value === 'string' ? value : `var(${nameForPath(value.ref)})`;

/** Flatten all three token layers to the existing CSS variable names. */
export const themeToVariables = (theme: ThemeTokens): Record<string, string> => {
	const variables: Record<string, string> = {};
	for (const [palette, steps] of Object.entries(theme.base.color)) {
		for (const [step, value] of Object.entries(steps)) {
			variables[nameForPath(`base.color.${palette}.${step}`)] = value;
		}
	}
	for (const [key, value] of Object.entries(theme.semantic.color) as [
		keyof SemanticColors,
		ThemeTokens['semantic']['color'][keyof SemanticColors],
	][]) {
		variables[nameForPath(`semantic.color.${key}`)] = cssValue(value);
	}
	for (const [key, value] of Object.entries(theme.components.select)) {
		variables[`--sy-select-${kebab(key)}`] = cssValue(value);
	}
	return variables;
};

/** Generate declarations for a root or future Provider-owned scope. */
export const themeToCSS = (theme: ThemeTokens, selector = ':root'): string => {
	const declarations = Object.entries(themeToVariables(theme))
		.map(([name, value]) => `\t${name}: ${value};`)
		.join('\n');
	return `${selector} {\n${declarations}\n}`;
};
