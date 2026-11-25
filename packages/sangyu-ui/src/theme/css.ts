import type { ThemeTokens, TokenReference } from './types';

type CSSVariables = Record<string, string>;

const kebab = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const nameForPath = (path: string): string => {
	const [layer, group, key, step, ...rest] = path.split('.');
	if (layer === 'base' && group === 'color' && step && !rest.length) {
		return key === 'gray' ? `--gray-${step}` : `--sy-color-${kebab(key)}-${step}`;
	}
	if (!step && group && key) {
		if (layer === 'base') return `--sy-base-${kebab(group)}-${kebab(key)}`;
		if (layer === 'semantic' || layer === 'components') return `--sy-${kebab(group)}-${kebab(key)}`;
	}
	throw new Error(`Unknown token path: ${path}`);
};

type TokenTree = { [key: string]: TokenTree | TokenReference<string> | string | undefined };
const isReference = (token: TokenTree | TokenReference<string>): token is TokenReference<string> =>
	typeof token.ref === 'string';

/** Flatten all three token layers to the existing CSS variable names. */
export const themeToVariables = (theme: ThemeTokens): CSSVariables => {
	const variables: CSSVariables = {};

	const visit = (tree: TokenTree, prefix: string) => {
		for (const [key, token] of Object.entries(tree)) {
			if (token === undefined) continue;
			const path = prefix ? `${prefix}.${key}` : key;
			if (typeof token !== 'string' && !isReference(token)) {
				visit(token, path);
				continue;
			}
			const name = nameForPath(path);
			if (name in variables) throw new Error(`Duplicate CSS variable ${name} at ${path}`);
			variables[name] = typeof token === 'string' ? token : `var(${nameForPath(token.ref)})`;
		}
	};

	visit({ base: theme.base, semantic: theme.semantic, components: theme.components }, '');
	return variables;
};

export const variableReferences = (value: string): string[] =>
	Array.from(value.matchAll(/var\(\s*(--[\w-]+)/g), ([, name]) => name);

/** Re-declare affected aliases where CSS can compute them against the new values. */
export const themeVariableOverrides = (inherited: CSSVariables, effective: CSSVariables): CSSVariables | undefined => {
	if (inherited === effective) return;
	const entries = Object.entries(effective);
	const changed = new Set(entries.filter(([name, value]) => value !== inherited[name]).map(([name]) => name));
	if (!changed.size) return;

	const dependents = new Map<string, string[]>();
	for (const [name, value] of entries) {
		for (const reference of variableReferences(value)) {
			const aliases = dependents.get(reference);
			if (aliases) aliases.push(name);
			else dependents.set(reference, [name]);
		}
	}
	// Set iteration also visits the newly added dependents.
	for (const name of changed) {
		for (const dependent of dependents.get(name) ?? []) changed.add(dependent);
	}
	return Object.fromEntries(entries.filter(([name]) => changed.has(name)));
};

export const variablesToCSS = (variables: CSSVariables, selector: string): string => {
	const declarations = Object.entries(variables)
		.map(([name, value]) => `\t${name}: ${value};`)
		.join('\n');
	return `${selector} {\n${declarations}\n}`;
};

/** Generate declarations for a theme scope. */
export const themeToCSS = (theme: ThemeTokens, selector = ':root'): string =>
	variablesToCSS(themeToVariables(theme), selector);
