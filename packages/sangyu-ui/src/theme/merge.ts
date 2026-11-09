import type { ThemeOverride, ThemeTokens } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeRecord = (base: Record<string, unknown>, override: Record<string, unknown>) => {
	const result: Record<string, unknown> = { ...base };
	for (const [key, value] of Object.entries(override)) {
		if (value === undefined) continue;
		const current = base[key];
		result[key] = isRecord(current) && isRecord(value) && !('ref' in value) ? mergeRecord(current, value) : value;
	}
	return result;
};

/** Apply base, semantic and component overrides without changing either input. */
export const mergeTheme = (theme: ThemeTokens, override: ThemeOverride = {}): ThemeTokens =>
	mergeRecord(
		theme as unknown as Record<string, unknown>,
		override as Record<string, unknown>,
	) as unknown as ThemeTokens;
