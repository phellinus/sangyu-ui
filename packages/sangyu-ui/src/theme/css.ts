import type { ThemeTokens, TokenReference } from './types';

type CSSVariables = Record<string, string>;

/** 将驼峰路径片段转换为 CSS 变量名使用的连字符格式。 */
const kebab = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/**
 * 按 Token 所属层级生成组件样式约定的 CSS 变量名
 */
const nameForPath = (path: string): string => {
	const [layer, group, key, step, ...rest] = path.split('.');
	if (layer === 'base' && group === 'color' && step && !rest.length) {
		// 基础色板保留现有命名，灰阶单独沿用 --gray-*。
		return key === 'gray' ? `--gray-${step}` : `--sy-color-${kebab(key)}-${step}`;
	}
	if (!step && group && key) {
		if (layer === 'base') {
			return `--sy-base-${kebab(group)}-${kebab(key)}`;
		}
		if (layer === 'semantic' || layer === 'components') {
			return `--sy-${kebab(group)}-${kebab(key)}`;
		}
	}
	throw new Error(`Unknown token path: ${path}`);
};

type TokenTree = { [key: string]: TokenTree | TokenReference<string> | string | undefined };

/**
 * 引用对象是 Token 树的叶子，遍历时直接处理
 */
const isReference = (token: TokenTree | TokenReference<string>): token is TokenReference<string> => {
	return typeof token.ref === 'string';
};

/**
 * 保留 CSS 字符串原值，将 Token 引用序列化为由浏览器解析的 var()
 */
export const toCSSValue = (value: string | TokenReference<string>): string => {
	return typeof value === 'string' ? value : `var(${nameForPath(value.ref)})`;
};

/**
 * 将基础、语义和组件三层 Token 展开为 CSS 变量表
 */
export const themeToVariables = (theme: ThemeTokens): CSSVariables => {
	const variables: CSSVariables = {};

	const visit = (tree: TokenTree, prefix: string) => {
		for (const [key, token] of Object.entries(tree)) {
			// 未设置的可选 Token 由 CSS 的继承和回退规则处理。
			if (token === undefined) {
				continue;
			}
			const path = prefix ? `${prefix}.${key}` : key;
			if (typeof token !== 'string' && !isReference(token)) {
				visit(token, path);
				continue;
			}
			const name = nameForPath(path);
			if (name in variables) {
				variables[name] = toCSSValue(token);
			}
		}
	};

	visit({ base: theme.base, semantic: theme.semantic, components: theme.components }, '');
	return variables;
};

/**
 * 提取 CSS 值中的 var() 引用，包括混色和渐变函数内的引用
 */
export const variableReferences = (value: string): string[] => {
	return Array.from(value.matchAll(/var\(\s*(--[\w-]+)/g), ([, name]) => name);
};

/**
 * 计算当前作用域需要声明的覆盖值，以及直接或间接引用它们的变量
 * CSS 自定义属性会先在声明节点解析 var()，再把解析结果传给后代
 */
export const themeVariableOverrides = (inherited: CSSVariables, effective: CSSVariables): CSSVariables | undefined => {
	if (inherited === effective) {
		return;
	}
	const entries = Object.entries(effective);
	const changed = new Set(entries.filter(([name, value]) => value !== inherited[name]).map(([name]) => name));
	if (!changed.size) {
		return;
	}

	// 为每个被引用的变量记录依赖它的变量，便于从覆盖值向外查找
	const dependents = new Map<string, string[]>();
	for (const [name, value] of entries) {
		for (const reference of variableReferences(value)) {
			const aliases = dependents.get(reference);
			if (aliases) {
				aliases.push(name);
			} else {
				dependents.set(reference, [name]);
			}
		}
	}
	// 遍历 Set 时也会访问新增的变量，因此可以找到间接依赖
	for (const name of changed) {
		for (const dependent of dependents.get(name) ?? []) {
			changed.add(dependent);
		}
	}
	return Object.fromEntries(entries.filter(([name]) => changed.has(name)));
};

/**
 * 将变量表写成指定选择器下的一条 CSS 规则
 */
export const variablesToCSS = (variables: CSSVariables, selector: string): string => {
	const declarations = Object.entries(variables)
		.map(([name, value]) => `\t${name}: ${value};`)
		.join('\n');
	return `${selector} {\n${declarations}\n}`;
};

/**
 * 将整套主题序列化到指定作用域，默认应用到 :root
 */
export const themeToCSS = (theme: ThemeTokens, selector = ':root'): string => {
	return variablesToCSS(themeToVariables(theme), selector);
};
