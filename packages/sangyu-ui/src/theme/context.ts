import { computed, inject, type ComputedRef, type InjectionKey } from 'vue';
import { lightTheme } from './presets';
import { themeToVariables } from './css';
import type { ThemeTokens } from './types';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContext {
	mode: ComputedRef<ThemeMode>;
	tokens: ComputedRef<ThemeTokens>;
	variables: ComputedRef<Record<string, string>>;
}

export const themeContextKey: InjectionKey<ThemeContext> = Symbol('sangyu-theme');

const defaultContext: ThemeContext = {
	mode: computed(() => 'light'),
	tokens: computed(() => lightTheme),
	variables: computed(() => themeToVariables(lightTheme)),
};

/** Read the nearest Provider, or the official light theme outside a Provider. */
export const useTheme = (): ThemeContext => inject(themeContextKey, defaultContext);
