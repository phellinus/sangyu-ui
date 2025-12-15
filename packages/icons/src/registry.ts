import type { Component } from 'vue';

type IconComponent = Component;

const iconRegistry = new Map<string, IconComponent>();

const camelToKebab = (value: string) =>
	value
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/[_\s]+/g, '-')
		.toLowerCase();

const stripDecorators = (value: string) => value.replace(/^sy[-_]?/i, '').replace(/-?icon$/i, '');

const normalizeKey = (value: string) => {
	const trimmed = stripDecorators(value.trim());
	const kebab = camelToKebab(trimmed || value);
	return kebab
		.replace(/[^a-z0-9-]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
};

const addToRegistry = (name: string, component: IconComponent) => {
	const key = normalizeKey(name);
	if (!key) {
		return;
	}

	iconRegistry.set(key, component);
};

const registerVariants = (component: IconComponent, ...candidates: Array<string | undefined>) => {
	candidates
		.filter((candidate): candidate is string => Boolean(candidate && candidate.trim().length))
		.forEach((candidate) => {
			const normalized = stripDecorators(candidate);
			const variants = new Set<string>([
				candidate,
				normalized,
				camelToKebab(candidate),
				camelToKebab(normalized),
				candidate.toLowerCase(),
				normalized.toLowerCase(),
			]);

			variants.forEach((variant) => addToRegistry(variant, component));
		});
};

export const getIconComponent = (name?: string) => {
	if (!name) {
		return undefined;
	}

	return iconRegistry.get(normalizeKey(name));
};

export const registerIcon = (name: string, component: IconComponent, options?: { aliases?: string[] }) => {
	registerVariants(component, name, component?.name, ...(options?.aliases ?? []));
};

export const registerIcons = (icons: Record<string, IconComponent>) => {
	Object.entries(icons).forEach(([name, component]) => {
		registerIcon(name, component);
	});
};

export const listRegisteredIcons = () => Array.from(iconRegistry.keys());
