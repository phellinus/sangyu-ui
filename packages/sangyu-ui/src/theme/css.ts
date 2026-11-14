import type { CommonScales, SemanticColors, ThemeTokens, TokenReference } from './types';

const commonGroups = [
	'spacing',
	'controlHeight',
	'fontSize',
	'radius',
	'shadow',
] as const satisfies (keyof CommonScales)[];

const kebab = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const nameForPath = (path: string): string => {
	const parts = path.split('.');
	if (parts[0] === 'base' && parts[1] === 'color' && parts.length === 4) {
		return parts[2] === 'gray' ? `--gray-${parts[3]}` : `--sy-color-${parts[2]}-${parts[3]}`;
	}
	if (parts[0] === 'semantic' && parts[1] === 'color' && parts.length === 3) {
		return `--sy-color-${kebab(parts[2])}`;
	}
	if (parts.length === 3 && commonGroups.some((group) => group === parts[1])) {
		if (parts[0] === 'base') return `--sy-base-${kebab(parts[1])}-${kebab(parts[2])}`;
		if (parts[0] === 'semantic') return `--sy-${kebab(parts[1])}-${kebab(parts[2])}`;
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
	for (const group of commonGroups) {
		for (const [key, value] of Object.entries(theme.base[group])) {
			variables[nameForPath(`base.${group}.${key}`)] = value;
		}
		for (const [key, value] of Object.entries(theme.semantic[group])) {
			variables[nameForPath(`semantic.${group}.${key}`)] = cssValue(value);
		}
	}
	for (const component of [
		'select',
		'button',
		'input',
		'checkbox',
		'checkboxGroup',
		'radio',
		'radioGroup',
		'radioButton',
		'switch',
		'form',
		'menu',
		'pagination',
		'breadcrumb',
		'step',
		'card',
		'tag',
		'avatar',
		'divider',
		'space',
		'result',
		'progress',
		'tooltip',
		'drawer',
		'notification',
		'table',
		'tabs',
	] as const) {
		for (const [key, value] of Object.entries(theme.components[component])) {
			const prefix =
				component === 'checkboxGroup'
					? 'checkbox-group'
					: component === 'radioGroup'
						? 'radio-group'
						: component === 'radioButton'
							? 'radio-button'
							: component;
			variables[`--sy-${prefix}-${kebab(key)}`] = cssValue(value);
		}
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
