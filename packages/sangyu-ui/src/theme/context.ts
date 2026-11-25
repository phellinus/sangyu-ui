import { computed, inject, type ComputedRef, type InjectionKey } from 'vue';
import { darkTheme, lightTheme } from './presets';
import { themeToVariables, themeVariableOverrides } from './css';
import type { ThemeTokens } from './types';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContext {
	mode: ComputedRef<ThemeMode>;
	tokens: ComputedRef<ThemeTokens>;
	variables: ComputedRef<Record<string, string>>;
}

export const themeContextKey: InjectionKey<ThemeContext> = Symbol('sangyu-theme');

const presetVariables = {
	light: computed(() => themeToVariables(lightTheme)),
	dark: computed(() => themeToVariables(darkTheme)),
};

export const getPresetVariables = (mode: ThemeMode) => presetVariables[mode].value;

const defaultContext: ThemeContext = {
	mode: computed(() => 'light'),
	tokens: computed(() => lightTheme),
	variables: presetVariables.light,
};

/** Read the nearest Provider, or the official light theme outside a Provider. */
export const useTheme = (): ThemeContext => inject(themeContextKey, defaultContext);

/** Recreate the effective scope when an overlay is mounted elsewhere in the DOM. */
export const getThemeScopeProps = (theme: ThemeContext | null | undefined) => {
	if (!theme) return;
	const mode = theme.mode.value;
	return {
		'data-sy-theme': mode,
		style: themeVariableOverrides(getPresetVariables(mode), theme.variables.value),
	};
};
