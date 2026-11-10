import { computed, defineComponent, h, inject, provide, type PropType } from 'vue';
import { themeToVariables } from './css';
import { themeContextKey, type ThemeContext, type ThemeMode } from './context';
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
		const tokens = computed(() => {
			const preset = mode.value === 'dark' ? darkTheme : lightTheme;
			const inherited = parent && parent.mode.value === mode.value ? parent.tokens.value : preset;
			return mergeTheme(inherited, props.tokens);
		});
		const variables = computed(() => themeToVariables(tokens.value));
		const context: ThemeContext = { mode, tokens, variables };
		provide(themeContextKey, context);

		return () =>
			h(
				props.as,
				{
					...attrs,
					'data-sy-theme': mode.value,
					style: [variables.value, attrs.style],
				},
				slots.default?.(),
			);
	},
});
