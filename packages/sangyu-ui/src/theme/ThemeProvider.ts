import { computed, defineComponent, h, inject, normalizeStyle, provide, type PropType } from 'vue';
import { themeToVariables, themeVariableOverrides } from './css';
import { getPresetVariables, themeContextKey, type ThemeContext, type ThemeMode } from './context';
import { mergeTheme } from './merge';
import { darkTheme, lightTheme } from './presets';
import type { ThemeOverride } from './types';

/** A DOM scope for reactive, inherited theme variables. */
export const ThemeProvider = defineComponent({
	name: 'ThemeProvider',
	inheritAttrs: false,
	props: {
		mode: { type: String as PropType<ThemeMode>, default: undefined },
		tokens: { type: Object as PropType<ThemeOverride>, default: undefined },
		as: { type: String, default: 'div' },
	},
	setup(props, { attrs, slots }) {
		const parent = inject(themeContextKey, null);
		const mode = computed<ThemeMode>(() => props.mode ?? parent?.mode.value ?? 'light');
		const inherited = computed(() => (parent?.mode.value === mode.value ? parent : null));
		const tokens = computed(() => {
			const preset = mode.value === 'dark' ? darkTheme : lightTheme;
			const base = inherited.value?.tokens.value ?? preset;
			return props.tokens ? mergeTheme(base, props.tokens) : base;
		});
		const inheritedVariables = computed(() => inherited.value?.variables.value ?? getPresetVariables(mode.value));
		const variables = computed(() => (props.tokens ? themeToVariables(tokens.value) : inheritedVariables.value));
		const overrides = computed(() => themeVariableOverrides(inheritedVariables.value, variables.value));
		const context: ThemeContext = { mode, tokens, variables };
		provide(themeContextKey, context);

		const scopeStyle = () => {
			if (!attrs.style) return overrides.value;
			const style = normalizeStyle([attrs.style]);
			const customVariables = Object.fromEntries(
				Object.entries(style ?? {}).flatMap(([name, value]): [string, string][] =>
					name.startsWith('--') && (typeof value === 'string' || typeof value === 'number')
						? [[name, String(value)]]
						: [],
				),
			);
			if (!Object.keys(customVariables).length) return [overrides.value, style];
			return [
				themeVariableOverrides(inheritedVariables.value, { ...variables.value, ...customVariables }),
				style,
			];
		};

		return () => {
			const style = scopeStyle();
			return h(
				props.as,
				{
					...attrs,
					'data-sy-theme': mode.value,
					'data-sy-theme-inherit': inherited.value ? '' : undefined,
					...(style ? { style } : {}),
				},
				slots.default?.(),
			);
		};
	},
});
